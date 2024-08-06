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
        this.question = [

        ]
    }

    static async showResutAssociateQuestionBank(id) {
        const response = await db.query(`SELECT 
                        bp.blog_id AS bp_blog,
                        bp.blog_title,
                        bp.blog_content,
                        bp.user_id AS bp_user,
                        bp.created_at AS bp_created_at,
                        bp.updated_at AS bp_updated_at,
                        c.comment_id,
                        c.comment,
                        c.blog_id AS c_blog_id,
                        c.user_id AS c_user_id,
                        c.created_at AS c_created_at,
                        c.updated_at AS c_updated_at 
                    FROM blog_posts AS bp
                    LEFT JOIN comments AS c
                    ON bp.blog_id = c.blog_id
                    WHERE bp.blog_id = $1`, [id]);
        
        const r = response.rows;

        if (r.length === 0) {
            throw new Error("Blog post not found");
        }



        const blogPost = { 
            blog_id: r[0].bp_blog, 
            blog_title: r[0].blog_title, 
            blog_content: r[0].blog_content, 
            user_id: r[0].bp_user, 
            created_at: r[0].bp_created_at.toISOString(), 
            updated_at: r[0].bp_updated_at.toISOString(),
            comments: []
        };

        r.forEach(row => {
            if (row.comment_id) {
                blogPost.comments.push({
                    comment_id: row.comment_id,
                    comment: row.comment,
                    blog_id: row.c_blog_id,
                    user_id: row.c_user_id,
                    created_at: row.c_created_at.toISOString(),
                    updated_at: row.c_updated_at.toISOString()
                });
            }
        });

        return new Blog(blogPost);

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
