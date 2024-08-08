const jwt = require('jsonwebtoken')

function authenticator(req, res, next){
    const token = req.headers['authorization'];
    console.log("auth", token)
    console.log("ss", process.env.SECRET_TOKEN)

    if (token) {
        // using the `jsonwebtoken` library to verify the received token
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
            if(err){
                // if it cannot be verified, access is forbidden
                res.status(403).json({ err: 'Invalid token' })
            } else {
                // if all went well, continue to the route handler (the next argument to the `router.get` above)
                next();
            }
        })
    } else {  // if no token is not present, access is forbidden
        res.status(403).json({ err: 'Missing token' })
    }
}

module.exports = authenticator;