const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    res.json(await userService.login(email, password));
});

router.get('/me', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    res.json({ data: {
        user: userService.getUser(decoded._email),
        token,
    }});
})

module.exports = router;