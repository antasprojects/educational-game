const resultsController = require("../../../controllers/results");
const Result = require("../../../models/Result");

const mockSend = jest.fn();
const mockEnd = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(() => ({
    send: mockSend,
    json: mockJson,
    end: mockEnd
}));
const mockRes = { status: mockStatus };
let resultObject
const datenow = new Date();
describe("Results controller", () => {
    beforeEach(() => {
        resultObject = {
            id: 1,
            user_id: 3,
            score: 3,
            question_id: 3,
            created_at: datenow,
            updated_at: datenow,
        }
        
        
        jest.clearAllMocks()
    });

    describe("index", () => {

        it("should return results with status code 200", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "getAll").mockResolvedValueOnce([resultObject, { ...resultObject, id: 2, score: 5 }]);

            // Act
            await resultsController.index(null, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.getAll).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ data: [resultObject, { ...resultObject, id: 2, score: 5 }] });
        });

        it("should return an error upon failure", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "getAll").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await resultsController.index(null, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.getAll).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });
    });

    describe("show", () => {
        let mockReq;
        beforeEach(() => {
            mockReq = {
                params: { id: 1 }
            };

            jest.clearAllMocks();
        });

        it("should return a result with status code 200", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "show").mockResolvedValueOnce(resultObject);

            // Act
            await resultsController.show(mockReq, mockRes);
            // Assert
            // get correct status code and the correct data
            expect(Result.show).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ data: resultObject });
        });

        it("should return an error upon failure", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "show").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await resultsController.show(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.show).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });


    describe("create", () => {
        let mockReq;
        beforeEach(() => {
            mockReq = {
                body: {
                    name: "new Goat",
                    age: 24
                }
            };
        });

        it("should create a result with status code 201", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "create").mockResolvedValueOnce({ ...resultObject, id: 2, score: 20 });

            // Act
            await resultsController.create(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.create).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({ data: { ...resultObject, id: 2, score: 20 } });
        });

        it("should return an error upon failure", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "create").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await resultsController.create(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.create).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });



    describe("update", () => {
        let mockReq;
        beforeEach(() => {
            mockReq = {
                params: { id: 1 }, 
                body: {
                    score: 45
                }
            };
        });

        it("should update a result with status code 200", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "show").mockResolvedValueOnce(new Result(resultObject));        
            jest.spyOn(Result.prototype, "update").mockResolvedValueOnce({ ...resultObject, score: 45 });


            // Act
            // goatToUpdate = new Goat({ name: "test result", age: 23, id: 1 });
            // const result = await goatToUpdate.update(mockReq, mockRes);
            await resultsController.update(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.show).toHaveBeenCalledTimes(1);
            expect(Result.prototype.update).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({ data: { ...resultObject, score: 45 } });
        });

        it("should return an error upon failure by id", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "show").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await resultsController.update(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.show).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

        it("should return an error upon failure on update method", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "show").mockResolvedValueOnce(new Result(resultObject));        
            jest.spyOn(Result.prototype, "update").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await resultsController.update(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.show).toHaveBeenCalledTimes(1);
            expect(Result.prototype.update).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });


    xdescribe("destroy", () => {
        let mockReq;
        beforeEach(() => {
            mockReq = {
                params: { id: 5 }, 
            };
        });

        it("should destroy a result with status code 204", async () => {
            // Arrange
            jest.spyOn(Result, "findById").mockResolvedValueOnce(new Result({ id: 5 }));        
            jest.spyOn(Result.prototype, "destroy").mockResolvedValueOnce({});


            // Act
            await resultsController.destroy(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.findById).toHaveBeenCalledTimes(1);
            expect(Result.prototype.destroy).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(204);
            expect(mockEnd).toHaveBeenCalledTimes(1);
        });

        it("should return an error upon failure by id", async () => {
            // Arrange
            jest.spyOn(Result, "findById").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await resultsController.destroy(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.findById).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockSend).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

        it("should return an error upon failure on destroy method", async () => {
            // Arrange
            // const goatsData = await Goat.getAll()
            jest.spyOn(Result, "findById").mockResolvedValueOnce(new Result({ id: 1 }));        
            jest.spyOn(Result.prototype, "destroy").mockRejectedValue(new Error("Something happened to your DB"));

            // Act
            await resultsController.destroy(mockReq, mockRes);

            // Assert
            // get correct status code and the correct data
            expect(Result.findById).toHaveBeenCalledTimes(1);
            expect(Result.prototype.destroy).toHaveBeenCalledTimes(1);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockSend).toHaveBeenCalledWith({ error: "Something happened to your DB" });
        });

    });

});