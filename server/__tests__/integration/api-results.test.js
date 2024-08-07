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
            console.log("Test server running on port 3003");
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

            const resultData = response.body.data;

            // Assert: Verify the response
            expect(response.statusCode).toBe(200);
            expect(response.body.data).toEqual(resultData);
        });

        // it("responds to GET / with error", () => {

        // });


    });


    describe("POST /results", () => {
        it("responds POST / with a new result", () => {
            // const response = await req
        });
    });
});