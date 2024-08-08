const User = require('../../../models/User.js');
const { register, login } = require('../../../controllers/users');
const jwt = require('jsonwebtoken');

jest.mock('../../../models/User');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should create a new user and return a token', async () => {
            const mockUser = { id: 1, email: 'test@test.com', password: 'password' };
            req.body = mockUser;

            User.create.mockResolvedValue(mockUser);
            User.getUserByEmail.mockResolvedValue(mockUser);
            jwt.sign.mockImplementation((payload, secret, options, callback) => {
                callback(null, 'fake-jwt-token');
            });

            await register(req, res);

            expect(User.create).toHaveBeenCalledWith(req.body);
            expect(User.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
            expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id }, process.env.SECRET_TOKEN, { expiresIn: 3600 }, expect.any(Function));
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                token: 'fake-jwt-token',
            });
        });

        it('should return an error if user creation fails', async () => {
            req.body = { email: 'test@test.com', password: 'password' };
            User.create.mockRejectedValue(new Error('User creation failed'));

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User creation failed' });
        });

        it('should return an error if token generation fails', async () => {
            const mockUser = { id: 1, email: 'test@test.com', password: 'password' };
            req.body = mockUser;

            User.create.mockResolvedValue(mockUser);
            User.getUserByEmail.mockResolvedValue(mockUser);
            jwt.sign.mockImplementation((payload, secret, options, callback) => {
                callback(new Error('Token generation failed'), null);
            });

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error in token generation' });
        });
    });

    describe('login', () => {
        it('should authenticate user and return a token', async () => {
            const mockUser = { id: 1, email: 'test@test.com', password: 'password' };
            req.body = { email: 'test@test.com', password: 'password' };

            User.getUserByEmail.mockResolvedValue(mockUser);
            jwt.sign.mockImplementation((payload, secret, options, callback) => {
                callback(null, 'fake-jwt-token');
            });

            await login(req, res);

            expect(User.getUserByEmail).toHaveBeenCalledWith(req.body.email);
            expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id }, process.env.SECRET_TOKEN, { expiresIn: 3600 }, expect.any(Function));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                token: 'fake-jwt-token',
            });
        });

        it('should return an error if email does not exist', async () => {
            req.body = { email: 'nonexistent@test.com', password: 'password' };

            User.getUserByEmail.mockResolvedValue(null);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'No user with this email' });
        });

        it('should return an error if password is incorrect', async () => {
            const mockUser = { id: 1, email: 'test@test.com', password: 'password' };
            req.body = { email: 'test@test.com', password: 'wrongpassword' };

            User.getUserByEmail.mockResolvedValue(mockUser);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Combination of password and username does not exist' });
        });

        it('should return an error if token generation fails', async () => {
            const mockUser = { id: 1, email: 'test@test.com', password: 'password' };
            req.body = { email: 'test@test.com', password: 'password' };

            User.getUserByEmail.mockResolvedValue(mockUser);
            jwt.sign.mockImplementation((payload, secret, options, callback) => {
                callback(new Error('Token generation failed'), null);
            });

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error in token generation' });
        });
    });
});