const db = require('../db/connect');

class User {

    constructor({user_id, username, password}) {
        this.id = user_id;
        this.username = username;
        this.password = password;
    }

    static async getUserById(id) {
        const response = await db.query("SELECT * FROM users WHERE id = $1", [id])
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getUserByUsername(username) {
        const response = await db.query("SELECT * FROM users WHERE username = $1;", [username])
        console.log(response);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    
    static async create(data) {
        const { username, password} = data;
        let response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING * ;",
            [username, password]);

        console.log(response.rows[0]);
        const newId = response.rows[0].id;
        const newUser = await User.getUserById(newId);
        return newUser;
    }
}

module.exports = User
