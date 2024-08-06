const User = require('../models/User');

// random comment

async function register(req, res) {
    try {

        const data = req.body;
        const result = await User.create(data);
        res.status(201).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}


async function login(req, res) {
    const data = req.body
    try {
        console.log(data);
        const user = await User.getUserByUsername(data.username)
        console.log(user);
        if (!user) {throw new Error('No user with this username') }

        if (data.password === user.password) {
            const payload = {
                username: user.username,
                success: true
            }
            res.status(200).json(payload)
        }
        else {
            throw new Error('Combination of password and username does not exist')
        }


    }    catch (err) {
      res.status(401).json({ error: err.message });
    }
}



module.exports = {
    register, login
}     