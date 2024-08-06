const db = require('../db/connect');
const QuestionBank = require("./Questions")

class Result {

    constructor(result) {
        this.id = result.id;
        this.user_id = result.user_id;
        this.score = result.score;
        this.created_at = result.created_at;
        this.updated_at = result.updated_at;
        if (result.QuestionBank) {
            this.QuestionBank = result.QuestionBank.map(reply => new QuestionBank(reply))
        }
    }

    static async showResultAssociateQuestionBank(id) {
        const response = await db.query(`SELECT 
                        r.id,
                        r.user_id,
                        r.score,
                        r.created_at,
                        r.updated_at,
                        r.question_id AS "result_question_id",
                        qb.id AS "qb_ID",
                        qb.subject,
                        qb.level,
                        qb.group_num
                    FROM result AS r
                    LEFT JOIN question_bank AS qb
                    ON r.blog_id = qb.blog_id
                    WHERE r.id = $1`, [id]);
        
        const r = response.rows;


        if (r.length === 0) {
            throw new Error("Result not found");
        }



        const result = {
            id: r[0].id,
            user_id: r[0].user_id,
            score: r[0].score,
            created_at: r[0].created_at.toISOString(),
            updated_at: r[0].updated_at.toISOString(),
            QuestionBank: []
        };

        r.forEach(row => {
            if (row.qb_id) {
                result.QuestionBank.push({
                    question_id: row.qb_ID,
                    subject: row.subject,
                    level: row.level,
                    group_num: row.group_num,
                });
            }
        });

        return new Result(result);

    }

    static async getAll() {
        const results = await db.query("SELECT * FROM result");
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
        const { user_id, result, subject, level, group_num } = data;
        if (!user_id || !result || !subject || !level || !group_num ) {
            throw new Error("One of the required fields missing.");
        }


        const response = await db.query(`INSERT INTO users (user_id, result, subject, level, group_num) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [user_id, result, subject, level, group_num]);
            
        if (response.rows) {
            return new User(response.rows[0]);
        }    
        throw new Error("Failed to create result");
    }


    async update(data) {
        for (const key of Object.keys(this)) {
            if (key in data && key !== "user_id" && key !== "subject" && key !== "level" && key !== "group_num" && key !== "created_at" && key !== "updated_at") {
                this[key] = data[key];
            }
        }

        this.updated_at = new Date();

        const response = await db.query(`UPDATE users
                                            SET result = $1,
                                                updated_at = $2
                                            WHERE id = $3
                                            RETURNING *`, 
                                            [this.result, this.updated_at, this.id]);


        if (response.rows[0]) {
            return new User(response.rows[0]);
        } else {
            throw new Error("Failed to update result");
        }
        
    }


    async destroy() {
        const response = await db.query("DELETE FROM result WHERE id = $1 RETURNING *;", [this.id]);
        return new User(response.rows[0]);
    }
}

module.exports = Result;
