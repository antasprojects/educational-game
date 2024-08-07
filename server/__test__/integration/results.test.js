const { resetTestDB } = require("./config");
const app = require("../../app");
const request = require("supertest");

describe("Goat API Endpoints", () => {

    let api;
    beforeEach(async () => {
        await resetTestDB();
    });

    // Run our test APP
    beforeAll(() => {
        api = app.listen(3000, () => {
            console.log("Test server running on port 3000");
        })
    });


    afterAll((done) => {
        api.close(done);
    });

    describe("GET /requests", () => {
        it("responds to GET / with all results", async () => {
            // Arrange & Act
            const response = await request(api).get("/results");

            // Assert
            expect(response.statusCode).toBe(200);
        });
    });


})