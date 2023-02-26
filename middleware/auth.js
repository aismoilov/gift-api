const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const auth = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = userService.getUser(decoded._email);

        if (!user) {
            throw new Error;
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({error: 'Пользователь не авторизован'});
    }
}

module.exports = auth;