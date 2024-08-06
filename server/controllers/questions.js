const Question = require("../models/Question");


async function index (req, res) {
    try {
        const questions = await Question.getAll();        
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
};
async function show (req, res) {
    try {
        const group_num = req.params.id;
        const subject = (req.query.subject);
        const level = req.query.level;
        const questions = await Question.getOneBySubjectLevelGroup(subject, level, group_num);
        console.log('question' +questions);
        
        res.status(200).json(questions);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};
 module.exports = {index, show}