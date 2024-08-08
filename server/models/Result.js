const db = require('../db/connect');
const QuestionBank = require("./Question");
const { addSecondsToTime } = require("../utils/timeHelper");

class Result {

    constructor(result) {
        this.id = result.id;
        this.user_id = result.user_id;
        this.score = result.score;
        this.question_id = result.question_id;
        // Ensure result.created_at is a Date object or convert it
        this.created_at = (result.created_at instanceof Date ? result.created_at : new Date(result.created_at))
            .toISOString().replace(/T/, " ").replace(/\..+/, "");
        
        // Ensure result.updated_at is a Date object or convert it
        this.updated_at = (result.updated_at instanceof Date ? result.updated_at : new Date(result.updated_at))
            .toISOString().replace(/T/, " ").replace(/\..+/, "");
        if (result.QuestionBank) {
            this.QuestionBank = result.QuestionBank.filter(question => new QuestionBank(question) !== undefined);
        }
    }

    static async showTotalUserScore(user_id, subject, level, group_num, update_at)  {
        if (!user_id || !group_num || !level || !subject || !update_at) {
            throw new Error("Fields missing")
        }
        // 2024-08-08 09:24:55
        const thirtySecInterval = addSecondsToTime(update_at, 30)

        const response = await db.query(`SELECT r.user_id,
                                               qb.subject, 
                                               qb.level, 
                                               qb.group_num, 
                                               SUM(r.score) AS score
                                        FROM result r
                                        JOIN question_bank qb ON r.question_id = qb.id
                                        WHERE qb.subject = $1
                                          AND qb.level = $2
                                          AND qb.group_num = $3
                                          AND r.user_id = $4
                                          AND r.updated_at >= $5::timestamp
                                          AND r.updated_at <= $6::timestamp
                                        GROUP BY r.user_id, qb.subject, qb.level, qb.group_num;`, [subject, level, group_num, user_id, update_at, thirtySecInterval])
        

        if (response.rows.length === 0) {
            throw new Error("No final result");
        }
        return response.rows[0];
    }


    static async showResultAssociateQuestionBank(id, subject, level, group_num) {

        if (!id || !group_num || !level || !subject) {
            throw new Error("Fields missing")
        }

        const response = await db.query(`SELECT 
                        r.id,
                        r.user_id,
                        r.score,
                        r.question_id,
                        r.created_at,
                        r.updated_at,
                        qb.id AS "qbID",
                        qb.subject,
                        qb.level,
                        qb.group_num
                    FROM result AS r
                    LEFT JOIN question_bank AS qb
                    ON r.question_id = qb.id
                    WHERE r.id = $1 AND
                    qb.group_num = $2`, [id, group_num]);
        
        const r = response.rows;


        if (r.length === 0) {
            throw new Error("Result not found");
        }

        const result = {
            id: r[0].id,
            user_id: r[0].user_id,
            score: r[0].score,
            question_id: r[0].question_id,
            created_at: r[0].created_at,
            updated_at: r[0].updated_at,
            QuestionBank: []
        };

        let toThrow = false;

        r.find(row => {
            if (row.group_num === group_num && row.subject === subject && row.level === level) {
                result.QuestionBank.push({
                    id: row.qbID,
                    subject: row.subject,
                    level: row.level,
                    group_num: row.group_num,
                });
            } else {
                toThrow = true;
            }
        });

        if (toThrow) {
            throw new Error("Association miss match")
        }



        return new Result(result);
    }

    static async getAll() {
        const results = await db.query("SELECT * FROM result;");
        if (results.rows.length === 0) {
            throw new Error("No results available");
        }
        return results.rows.map(u => new Result(u))
    }

    static async show(id) {
        const response = await db.query("SELECT * FROM result WHERE id = $1;", [id])
        if (response.rows.length != 1) {
            throw new Error("No result found.");
        }
        return new Result(response.rows[0]);
    }
    
    static async create(data) {
        const { user_id, score, question_id } = data;
        if (!user_id || !score || !question_id ) {
            throw new Error("One of the required fields missing");
        }


        const response = await db.query(`INSERT INTO result (user_id, score, question_id) 
                VALUES ($1, $2, $3) RETURNING *;`, [user_id, score, question_id]);
            
        if (response.rows.length > 0) {
            return new Result(response.rows[0]);
        }    
        throw new Error("Failed to create result");
    }


    async update(data) {
        for (const key of Object.keys(this)) {
            if (key in data && key !== "user_id" && key !== "subject" && key !== "level" && key !== "group_num" && key !== "created_at" && key !== "updated_at") {
                this[key] = data[key];
            }
        }

        this.score = data.score;
        this.updated_at = new Date();

        const response = await db.query(`UPDATE users
                                            SET score = $1,
                                                updated_at = $2
                                            WHERE id = $3
                                            RETURNING *`, 
                                            [this.score, this.updated_at, this.id]);


        if (response.rows[0]) {
            return new Result(response.rows[0]);
        } else {
            throw new Error("Failed to update the result");
        }
        
    }


    async destroy() {
        const response = await db.query("DELETE FROM result WHERE id = $1 RETURNING *;", [this.id]);
        return new Result(response.rows[0]);
    }
}

module.exports = Result;
