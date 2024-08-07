const questionsController = require('../../../controllers/questions')
const Question = require('../../../models/Question')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({ 
    send: mockSend, 
    json: mockJson, 
    end: mockEnd 
  }));

const mockRes = { status: mockStatus };

describe('Questions Controller', ()=>{
    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('index()', () => {
        it('should return a 200 status and a list of questions', async () => {
            const mockQuestions = [
                {
                  "id": 1,
                  "question": "Who wrote \"Pride and Prejudice\"?",
                  "option_1": "Jane Austen",
                  "option_2": "Emily Brontë",
                  "option_3": "Charles Dickens",
                  "option_4": "Mark Twain",
                  "answer": "Jane Austen",
                  "subject": "Literature",
                  "level": "Easy",
                  "group_num": 1,
                  "created_at": "2024-08-06T10:25:03.875Z",
                  "updated_at": "2024-08-06T10:25:03.875Z"
                },
                {
                  "id": 2,
                  "question": "In what year did the Berlin Wall fall?",
                  "option_1": "1985",
                  "option_2": "1987",
                  "option_3": "1989",
                  "option_4": "1991",
                  "answer": "1989",
                  "subject": "History",
                  "level": "Medium",
                  "group_num": 2,
                  "created_at": "2024-08-06T10:25:03.875Z",
                  "updated_at": "2024-08-06T10:25:03.875Z"
                }];

            jest.spyOn(Question, 'getAll').mockResolvedValue(mockQuestions);

            await questionsController.index(null, mockRes);

            expect(Question.getAll).toHaveBeenCalled();
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(mockQuestions);
        });

        it('should return a 500 status and an error message when an error occurs', async () => {
            const errorMessage = 'Database error';
            jest.spyOn(Question, 'getAll').mockRejectedValue(new Error(errorMessage));

            await questionsController.index(null, mockRes);
            expect(Question.getAll).toHaveBeenCalled();
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({ "error": errorMessage });
        });
    });
    describe('show()', () => {
        let mockQuestions, mockReq; 

        beforeEach(() => {
            mockQuestions = [
                { id: 1, question: 'What is Jest?', option_1: 'Option 1', option_2: 'Option 2', option_3: 'Option 3', option_4: 'Option 4', answer: 'Option 1' }
            ];
            mockReq = {
                params: { id: '1' },
                query: { subject: 'Math', level: 'Easy' }
            }
          });
        it('should return a 200 status and a list of questions', async () => {

            jest.spyOn(Question, 'getOneBySubjectLevelGroup').mockResolvedValue(mockQuestions)
    
            await questionsController.show(mockReq, mockRes);
    
            expect(Question.getOneBySubjectLevelGroup).toHaveBeenCalledWith('Math', 'Easy', '1');
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(mockQuestions);
        });
    
        it('should return a 404 status and an error message when no questions are found', async () => {
            const errorMessage = 'No Questions in that group';
            jest.spyOn(Question, 'getOneBySubjectLevelGroup').mockRejectedValue(new Error(errorMessage));
 
            await questionsController.show(mockReq, mockRes);
            
            expect(Question.getOneBySubjectLevelGroup).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ "error": errorMessage });
        });
    
        it('should return a 404 status and an error message when an unexpected error occurs', async () => {
            const errorMessage = 'Database error';
            jest.spyOn(Question, 'getOneBySubjectLevelGroup').mockRejectedValue(new Error(errorMessage));
   
            await questionsController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ "error": errorMessage });
        });
    });


});