const db = require("../../db/connect");
const Result = require("../../models/Result");

let resultObject;
const datenow = new Date();
describe("Result Model", () => {

    beforeEach(() => {
        resultObject = {
            id: 2,
            user_id: 2,
            score: 10,
            question_id: 3,
            created_at: datenow,
            updated_at: datenow,
        };
        jest.clearAllMocks();
    });


    describe("getAll", () => {
        it("should return list of all results", async () => {
            // Arrange
            const datenow = new Date();
            const mockResults = [
                {
                    id: 1,
                    user_id: 1,
                    score: 6,
                    question_id: 2,
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
                    question_id: 3,
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
            expect(results.every(result => result instanceof Result)).toBe(true);
        });

        it("throws an error if no results are found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            await expect(Result.getAll()).rejects.toThrow("No results available")
        })
    });


    describe("create", () => {
        let copyResultObject;
        beforeEach(() => {
            copyResultObject = { ...resultObject };
            delete copyResultObject.id;
        })

        it("resolves with a result on successful creation", async () => {
            // Arrange

            const mockResults = [
                { ...resultObject, id: 5 }
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });

            // Act
            const result = await Result.create(copyResultObject);

            // Assert
            expect(result).toBeInstanceOf(Result);
            expect(result.user_id).toBe(2);
            expect(result.question_id).toBe(3);
            expect(result.score).toBe(10);


            expect(db.query).toHaveBeenCalledTimes(1);
            expect(db.query).toHaveBeenCalledWith(`INSERT INTO result (user_id, score, question_id) 
                VALUES ($1, $2, $3) RETURNING *;`, [copyResultObject.user_id, copyResultObject.score, copyResultObject.question_id]);
        });

        it("should throw an Error if country already exists", async () => {
            // Arrange
            const mockResults = [ resultObject ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            // Act & Arrange
            await expect(Result.create(copyResultObject)).rejects.toThrow("Failed to create result");
            expect(db.query).toHaveBeenCalledWith(`INSERT INTO result (user_id, score, question_id) 
                VALUES ($1, $2, $3) RETURNING *;`, [copyResultObject.user_id, copyResultObject.score, copyResultObject.question_id]);
        });
    });


    describe("show", () => {
        it("resolves with a result on successful db query", async () => {
            // Arrange
            const mockResults = [
                resultObject
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });

            // Act
            const result = await Result.show(2);

            // Assert
            expect(result).toBeInstanceOf(Result);
            expect(result.user_id).toBe(2);
            expect(result.score).toBe(10);
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM result WHERE id = $1;", [2]);
        });

        it("should throw an Error if no result is found", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });

            await expect(Result.show).rejects.toThrow("No result found");
            expect(db.query).toHaveBeenCalledWith("SELECT * FROM result WHERE id = $1;", [undefined]);
        });
    });



    describe("update", () => {
        let copyResultObject;
        beforeEach(() => {
            copyResultObject = { ...resultObject };
            delete copyResultObject.score;

            copyResultObject.score= 57;
        });

        it("updates a score result on successful db query", async () => {
            // Arrange

            const mockResults = [
                { ...resultObject, score: copyResultObject.score }
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });

            // Act
            const result = new Result(resultObject);
            expect(result.score).toBe(10);

            const updatedResult = await result.update(copyResultObject);

            // Assert
            expect(result).toBeInstanceOf(Result);
            expect(result.score).toBe(57);

            expect(db.query).toHaveBeenCalledTimes(1);
            expect(updatedResult).toEqual({
                ...resultObject,
                score: copyResultObject.score
            });
        });

        it("should throw an Error if db query returns unsuccessful", async () => {
            // Arrange
            const mockResult = {
                    ...copyResultObject,
                    score: copyResultObject.score
            }

            // Act
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
            const result = new Result(resultObject);

            // Arrange
            await expect(result.update(copyResultObject)).rejects.toThrow("Failed to update the result");
            expect(db.query).toHaveBeenCalledWith(`UPDATE users
                                            SET score = $1,
                                                updated_at = $2
                                            WHERE id = $3
                                            RETURNING *`, [
                                                    result.score, result.updated_at, result.id
                                                ]);
        });
    });

});