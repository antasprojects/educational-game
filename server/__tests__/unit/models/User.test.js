const User = require('../../../models/User')
const db = require('../../../db/connect')



describe('User model', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe("getUserById", () => {
        it ("should return user", async () => {
            jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
                rows: [{id : 1, email: 'antek@email.com', password: "xd123", admin: false}]
            })

            const user = await User.getUserById(1)
            expect(typeof user).toBe('object')
            expect(user.email).toBe("antek@email.com")
            expect(user.password).toBe("xd123")

        })

        it('should throw an Error on db query error', async () => {

            jest.spyOn(db, 'query')
              .mockResolvedValueOnce({ rows: [] })

            try {
                await User.getUserById()
            } catch (err) {
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to locate user.")
            }

        })

    })

    describe("getUserByEmail", () => {

        it ("should return user", async () => {
            jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
                rows: [{id : 1, email: 'antek@email.com', password: "xd123", admin: false}]
            })

            const user = await User.getUserByEmail("antek@email.com")
            console.log(user);
            expect(typeof user).toBe('object')
            expect(user.id).toBe(1)
            expect(user.password).toBe("xd123")

        })

        it('should throw an Error on db query error', async () => {

            jest.spyOn(db, 'query')
              .mockResolvedValueOnce({ rows: [] })

            try {
                await User.getUserById()
            } catch (err) {
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to locate user.")
            }

        })
    })

    describe("create", () => {
        it('resolves with successful creation', async () => {
        
            const user = await User.create({email: 'antek@email.com', password: "xd1234"})
            console.log(user);

            expect(country instanceof Country).toBe(true)

        })
    })

})
