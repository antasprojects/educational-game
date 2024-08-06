const db = require("../../db/connect");
const Result = require("../../models/Result");


describe("Result Model", () => {
    describe("getAll", () => {
        it("should return list of all results", async () => {
            // Arrange
            const datenow = new Date();
            const mockResults = [
                {
                    id: 1,
                    user_id: 1,
                    score: 6,
                    question_id: 3,
                    created_at: datenow,
                    updated_at: datenow,
                },
                {
                    id: 2,
                    user_id: 3,
                    score: 8,
                    question_id: 1,
                    created_at: datenow,
                    updated_at: datenow,
                },
                {
                    id: 3,
                    user_id: 5,
                    score: 10,
                    question_id: 2,
                    created_at: datenow,
                    updated_at: datenow,
                },
            ];

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });


            // Act
            const results = await Result.getAll();

            // Assert
            expect(Result).toBeDefined();
            expect(Result.getAll).toBeDefined();
            expect(db.query).toHaveBeenCalledTimes(1);
            expect(results[2].id).toBe(3);
            expect(results.every(user => user instanceof Result)).toBe(true);
        });

        it("throws an error if no results are found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            await expect(Result.getAll()).rejects.toThrow("No results available")
        })
    });
});