const User = require('../models/User');
jwt = require("jsonwebtoken")
<<<<<<< HEAD
=======

>>>>>>> origin/development
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
        const user = await User.getUserByEmail(data.email)
        console.log("siema");
        if (!user) {throw new Error('No user with this email') }

        if (data.password === user.password) {

            const payload = {
<<<<<<< HEAD
                username: user.username
            }

=======
                email: user.email,
                success: true
            }
>>>>>>> origin/development
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: token,
                });
            }
<<<<<<< HEAD

=======
>>>>>>> origin/development
            jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 3600 }, sendToken);

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