const db = require('../db/connect');

class Result {

    constructor(result) {
        this.id = result.id;
        this.user_id = result.user_id;
        this.result = result.result;
        this.subject = result.subject;
        this.level = result.level;
        this.group_num = result.group_num;
        this.created_at = result.created_at;
        this.updated_at = result.updated_at;
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
