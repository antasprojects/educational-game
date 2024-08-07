const db = require('../db/connect');

class User {

    constructor({id, email, password}) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.admin = false
    }

    static async getUserById(id) {
        const response = await db.query("SELECT * FROM users WHERE id = $1", [id])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getUserByEmail(email) {
        const response = await db.query("SELECT * FROM users WHERE email = $1;", [email])
        console.log(response.rows[0]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }

        return new User(response.rows[0]);
    }

    
    static async create(data) {
        const { email, password} = data;
        let response = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING * ;",
            [email, password]);

        console.log(response.rows[0]);
        const newId = response.rows[0].id;
        const newUser = await User.getUserById(newId);
        return newUser;
    }
}

module.exports = User
