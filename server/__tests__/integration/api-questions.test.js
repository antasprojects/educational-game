const request = require("supertest");
const app = require("../../app");
const { resetTestDB } = require("./config");

xdescribe("Questions API Endpoints", ()=>{
    beforeEach(async () => {
        await resetTestDB()
      });
    beforeAll(() => {
        api = app.listen(3003, () => {
            console.log("Test server running on port 3003");
        })
    });
    afterAll((done) => {
        console.log('Gracefully closing server')
        api.close(done);
    });

    describe('GET /quizdata/:id', () => {
        it('should return questions with a particular id', async () => {
          const question = 'Q1 Answer A'
        //   const token = '04C217ED8FC3128D9F2CEEF9141FC297C007B5C0BF89B3E5B674346E0F4B4070';
          const response = await request(api).get(`/questions/quizdata/1?subject=Art&level=Easy`);
        //   .set('Authorization', `Bearer ${token}`);

          expect(response.body).toBeInstanceOf(Array)
          expect(response.statusCode).toBe(200)
        })
        it('should return an error of 404 if subject not available',async ()=>{
            const response = await request(api).get(`/questions/quizdata/1?subject=Maths&level=Easy`);
            
            expect(response.statusCode).toBe(404)
            expect(response.body.error).toBe("No Questions in that group")
        } )
      });
      describe('GET /questions', () => {
        it('should return all questions in db', async () => {

          const response = await request(api).get(`/questions`);
          expect(response.body).toBeInstanceOf(Array)
          expect(response.statusCode).toBe(200)
        })
      });
      describe("POST /questions",  ()=>{
        it('should create a new question in the DB', async ()=>{
            const data = {
                "question": "What is the color of the earth?",
                "option_1": "Blue",
                "option_2": "Green",
                "option_3": "Yellow",
                "option_4": "Not sure",
                "answer": "Blue",
                "subject": "Literature",
                "level": "Easy",
                "group_num": "1"
              }
            const response = await request(api).post('/questions').send(data)
            expect(response.statusCode).toBe(201)
            expect(typeof response.body).toBe('number');
        })       
        it('should return error when mandatory items are not passed', async ()=>{
            const data = {
                "question": "What is the color of the earth?",
                "option_1": "Blue",
                "option_2": "Green",
                "option_3": "Yellow",
                "option_4": "Not sure",
                "answer": "Blue",
              }
            const response = await request(api).post('/questions').send(data)
            console.log('response', JSON.stringify(response,null,2));
              
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe("Mandatory fields have not been passed")
        }) 
    })
})