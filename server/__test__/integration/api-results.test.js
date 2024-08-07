const request = require("supertest");
const app = require("../../app");
const { resetTestDB } = require("./config");

const { allResults } = require("./resultHelper");

describe("Results API Endpoints", () => {

    let api;
    beforeEach(async () => {
        await resetTestDB();
    });

    // Run our test APP
    beforeAll(() => {
        api = app.listen(3003, () => {
            console.log("Test server running on port 3000");
        })
    });


    afterAll((done) => {
        api.close(done);
    });

    describe("GET /results", () => {
        it("responds to GET / with all results", async () => {
            // Arrange:

            // Act:
            const response = await request(api).get("/results");

            // Inside controllers/results for index The Result.getAll it breaks. But if I do a manual testing that is not through the model it works.

            console.log('Response status:', response.statusCode); // should be 200! but it is 404
            console.log('Response body:', response.body); // doesnt reach this point

            // Assert: Verify the response
            expect(response.statusCode).toBe(200);
            // expect(response.body.data).toEqual(allResults);
        });


    })
});