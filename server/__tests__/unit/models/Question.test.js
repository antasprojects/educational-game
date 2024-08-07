const Question = require('../../../models/Question')
const db = require('../../../db/connect')

xdescribe('Question', () => {
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

describe('Question', ()=>{
    describe('getAll',()=>{
        it('should return an array of Question objects when data is present', async () => {
            const mockData = [
                { id: 1, question: 'What is Jest?' },
                { id: 2, question: 'What is a unit test?' }
            ];
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockData });
            
            const result = await Question.getAll();
    
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM question_bank");
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(Question);
            expect(result[0].id).toBe(1);
            expect(result[0].question).toBe('What is Jest?');
        });

        it('should throw an error when there is no data', async () => {
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
    
            await expect(Question.getAll()).rejects.toThrow("DB does not contain any data");
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM question_bank");
        });
    })

    describe('getOneBySubjectLevelGroup', () => {
        it('should return an array of Question objects when data is present', async () => {
            const mockData = [
                { question: 'What is Jest?', option_1: 'Option 1', option_2: 'Option 2', option_3: 'Option 3', option_4: 'A testing tool', answer: 'A testing tool' },
                { question: 'What is a unit test?', option_1: 'Option 1', option_2: 'Testing a function', option_3: 'Option 3', option_4: 'Option 4', answer: 'Testing a function' }
            ];
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockData });
    
            const result = await Question.getOneBySubjectLevelGroup('History', 'easy', 1);
    
            expect(db.query).toHaveBeenCalledWith(
                "SELECT question, option_1, option_2, option_3, option_4, answer FROM question_bank WHERE subject = $1 AND level = $2 AND group_num = $3;",
                ['History', 'Easy', 1]
            );
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(Question);
            expect(result[0].question).toBe('What is Jest?');
        });

        it('should throw an error when there is no data', async () => {

            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
            await expect(Question.getOneBySubjectLevelGroup('science', 'medium', 2)).rejects.toThrow("No Questions in that group");
            expect(db.query).toHaveBeenCalledWith(
                "SELECT question, option_1, option_2, option_3, option_4, answer FROM question_bank WHERE subject = $1 AND level = $2 AND group_num = $3;",
                ['Science', 'Medium', 2]
            );
        });

        it('should throw an error when db.query fails', async () => {
            const error = new Error('Database error');
            jest.spyOn(db, 'query').mockRejectedValue(error);
    
            await expect(Question.getOneBySubjectLevelGroup('history', 'hard', 3)).rejects.toThrow(error);
            expect(db.query).toHaveBeenCalledWith(
                "SELECT question, option_1, option_2, option_3, option_4, answer FROM question_bank WHERE subject = $1 AND level = $2 AND group_num = $3;",
                ['History', 'Hard', 3]
            );
        });
    });

    describe('create()', () => {
        it('should return the ID of the newly created question', async () => {
            const mockData = {
                question: 'What is Jest?',
                option_1: 'Option 1',
                option_2: 'Option 2',
                option_3: 'Option 3',
                option_4: 'Option 4',
                answer: 'Option 1',
                subject: 'Math',
                level: 'Easy',
                group_num: 1
            };
            
            const mockResponse = { rows: [{ id: 123 }] };
            jest.spyOn(db, 'query').mockResolvedValueOnce(mockResponse);
            
            const result = await Question.create(mockData);
    
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO question_bank (question, option_1, option_2, option_3, option_4, answer, subject, level, group_num) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
                ['What is Jest?', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 1', 'Math', 'Easy', 1]
            );
            expect(result).toBe(123);
        });
        it('should throw an error when db.query fails', async () => {
            const mockData = {
                question: 'What is Jest?',
                option_1: 'Option 1',
                option_2: 'Option 2',
                option_3: 'Option 3',
                option_4: 'Option 4',
                answer: 'Option 1',
                subject: 'Math',
                level: 'Easy',
                group_num: 1
            };
            
            const error = new Error('Database error');
            jest.spyOn(db, 'query').mockRejectedValue(error);
  
            await expect(Question.create(mockData)).rejects.toThrow(error);
        });
    });

});
});