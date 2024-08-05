const Questions = require("../models/Questions")

async function index (req, res) {
    try {
        const questions = await Questions.getAll();
        res.json(questions);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};
async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const questions = await Questions.getOneByGroup(id);
        res.json(questions);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};
 module.exports = {index, show}