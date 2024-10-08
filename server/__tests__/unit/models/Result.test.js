const db = require("../../../db/connect");
const Result = require("../../../models/Result");
const { addSecondsToTime } = require("../../../utils/timeHelper");

let resultObject;
const datetime = new Date();
const datenow = datetime.toISOString().replace(/T/, " ").replace(/\..+/, "");

describe("Result Model", () => {

    beforeEach(() => {
        resultObject = {
            id: 2,
            user_id: 2,
            score: 10,
            question_id: 3,
            created_at: datetime,
            updated_at: datetime
        };
        jest.clearAllMocks();
    });


    describe("getAll", () => {
        it("should return list of all results", async () => {
            // Arrange
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
        });

        it("throws if crucial input keys are missing", async () => {
            delete copyResultObject.score;
            // Test with missing key score
            await expect(Result.create(copyResultObject)).rejects.toThrow("One of the required fields missing");
            delete copyResultObject.question_id;

            // Alternatively, test with missing key score and question_id
            await expect(Result.create(copyResultObject)).rejects.toThrow("One of the required fields missing");
            delete copyResultObject.user_id;

            // Alternatively, test with no arguments
            await expect(Result.create({})).rejects.toThrow("One of the required fields missing");
        });

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

        it("should throw an Error if result already exists", async () => {
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
                { 
                    ...resultObject, 
                    score: copyResultObject.score, 
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });
            const mockResult = mockResults[0];

            const correctTime = mockResult.created_at.toISOString().replace("T", " ").replace(/\..+/, "");
            // Act

            const result = new Result(resultObject);
            expect(result.score).toBe(10);

            const updatedResult = await result.update(copyResultObject);

            // Assert
            expect(result).toBeInstanceOf(Result);
            expect(result.score).toBe(57);

            expect(db.query).toHaveBeenCalledTimes(1);
            expect(updatedResult).toEqual({
                ...mockResult,
                created_at: correctTime,
                updated_at: correctTime
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


    describe("destroy", () => {
        it("destroys a result on successful db query", async () => {
            // Arrange
            const mockResults = [ resultObject ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResults });

            // Act
            const result = new Result(resultObject);
            const deletedResult = await result.destroy();
            const mockResult = mockResults[0];

            const correctTime = mockResult.created_at.toISOString().replace("T", " ").replace(/\..+/, "");

            // Assert
            expect(result).toBeInstanceOf(Result);
            expect(result.score).toBe(10);
            expect(db.query).toHaveBeenCalledTimes(1);
            expect(deletedResult).toEqual({
                ...resultObject,
                created_at: correctTime,
                updated_at: correctTime
            });
        });

        it("should throw an Error if db query returns unsuccessful", async () => {
            // Act & Arrange
            jest.spyOn(db, "query").mockRejectedValue(new Error("Something wrong with the DB"));
            const result = new Result(resultObject);
            await expect(result.destroy()).rejects.toThrow("Something wrong with the DB")
        });
    });


    describe("Association link Between Result and Question", () => {
        let testQuery;
        beforeEach(() => {

            resultObject.QuestionBank = [
                {
                    id: 3,
                    subject: "History",
                    group_num: 3,
                    level: "Intermediate",
                }
            ]

            testQuery = { ...resultObject, qbID: resultObject.QuestionBank[0].id, ...resultObject.QuestionBank[0], id: resultObject.id }
            delete testQuery.QuestionBank;

            delete resultObject.created_at;
            delete resultObject.update_at;

            resultObject.created_at = datenow;
            resultObject.updated_at = datenow;

        });

        it("returns result based on the group_num", async () => {
            const mockResult = [
                testQuery
            ];

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResult });

            const result = await Result.showResultAssociateQuestionBank(2, "History", "Intermediate", 3);

            expect(result).toBeInstanceOf(Result);
            expect(result.question_id).toBe(3);
            expect(result).toEqual(resultObject)
            expect(result.QuestionBank[0]).toBeInstanceOf(Object)

        });
        
        it("throws if group_num or id are not provided", async () => {
            // Do not use await here; instead, return the promise directly
            await expect(Result.showResultAssociateQuestionBank(2)).rejects.toThrow("Fields missing");

            // Alternatively, test with no arguments
            await expect(Result.showResultAssociateQuestionBank()).rejects.toThrow("Fields missing");
        });

        it("throws if db query returns no value", async () => {
            // Act & Arrange
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
            await expect(Result.showResultAssociateQuestionBank(1, "Poetry", "Elite", 8)).rejects.toThrow("Result not found");
        });

        it("throws if inner association is a miss match", async () => {
            const mockResult = [
                testQuery
            ];

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResult });

            
            await expect(Result.showResultAssociateQuestionBank(1, "Poetry", "Elite", 8)).rejects.toThrow("Association miss match");
        });

    });


    describe("total score of a user", () => {
        let totalScore;
        let allResults;
        beforeEach(() => {
            allResults = [
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
            totalScore = {
                user_id: 3,
                subject: "History",
                level: "Beginner",
                group_num: 2,
                score: 60
            };

            // resultObject.created_at = datenow;
            // resultObject.updated_at = datenow;

        });

        it("returns the total score a user has for particular subject based on level and group", async () => {
            const mockResult = [
                totalScore
            ];
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: allResults });

            const totalResult = await Result.getAll();
            
            const update_time = totalResult[0].updated_at

            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: mockResult });

            const result = await Result.showTotalUserScore(3, "History", "Beginner", 2, update_time);

            expect(result).toBeInstanceOf(Object);
            expect(result.user_id).toBe(3);
            expect(result.score).toBe(60);
            expect(result.subject).toBe("History");
            expect(result.level).toBe("Beginner");
            expect(result.group_num).toBe(2);
            expect(result).toEqual(totalScore);
        });
        
        it("throws if the parameters are not provided are not provided", async () => {
            // Test with 4 arguments
            await expect(Result.showTotalUserScore(2, "History", "Beginner", 2)).rejects.toThrow("Fields missing");
            // Alternatively, test with 3 arguments
            await expect(Result.showTotalUserScore(2, "History", "Beginner")).rejects.toThrow("Fields missing");
            // Alternatively, test with 2 arguments
            await expect(Result.showTotalUserScore(2, "History")).rejects.toThrow("Fields missing");
            // Alternatively, test with 1 argument
            await expect(Result.showTotalUserScore(2)).rejects.toThrow("Fields missing");
            // Alternatively, test with no arguments
            await expect(Result.showTotalUserScore()).rejects.toThrow("Fields missing");
        });

        it("throws if db query returns no value", async () => {
            // Act & Arrange
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [] });
            await expect(Result.showTotalUserScore(1, "Poetry", "Elite", 8, "2024-08-08 09:24:55")).rejects.toThrow("No final result");
        });

    });

    describe("test helper function", () => {
        it("addSecondsToTime 2024-08-08 09:24:55 returns 2024-08-08 09:25:25", () => {
            const inputDatetime = "2024-08-08 09:24:55";
            const secondsToAdd = 30;
            const expectedDatetime = "2024-08-08 09:25:25";
    
            const result = addSecondsToTime(inputDatetime, secondsToAdd);
    
            expect(result).toBe(expectedDatetime);
        })
    })

});