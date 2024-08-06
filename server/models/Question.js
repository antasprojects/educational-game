const db = require("../db/connect")
class Question{
    constructor({ question, option_1, option_2, option_3, option_4, answer, subject, level, group_num, created_at, updated_at}) {
        this.question = question;
        this.option_1 = option_1;
        this.option_2 = option_2;
        this.option_3 = option_3
        this.option_4 = option_4
        this.answer = answer
        this.subject = subject
        this.level = level
        this.group_num = group_num
        this.created_at = created_at
        this.updated_at = updated_at
    }
static async getAll(){
    try{
        const response = await db.query("SELECT * FROM question_bank")
        if(response.rows.length === 0){
            throw new Error("DB does not contain any data")
        }
        return response.rows.map(c => new Question(c))
    }
    catch(error){
        throw error
    }
}
static async getOneBySubjectLevelGroup(subject, level, group_num){
    try{
        const subjectNew = subject.charAt(0).toUpperCase()+subject.slice(1);
        const levelNew = level.charAt(0).toUpperCase()+level.slice(1);
        const response = await db.query("SELECT question, option_1, option_2, option_3, option_4, answer FROM question_bank WHERE subject = $1 AND level = $2 AND group_num = $3;",[subjectNew, levelNew, group_num])
        
        if(response.rows.length === 0){
            throw new Error("No Questions in that group")
        }
        return response.rows.map(c => new Question(c))
    }
    catch(error){
        throw error
    }
}
}
module.exports = Question
