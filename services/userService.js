const bcrypt = require('bcryptjs');
const db = require('./dbService');
const jwt = require('jsonwebtoken');

const login = async (email, password) => {
    if (!email || !password) {
        return { success: false, message: "Заполните все поля" };
    }

    const user = getUser(email);
    if (!user) {
        return { success: false, message: "Неверный email или пароль" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return { success: false, message: "Неверный email или пароль" };
    }

    const { first_name, last_name, created_at } = user;
    const token = generateAuthToken(email);
    if (!token) {
        return { success: false, message: "Ошибка авторизации" };
    }

    return { success: true, data: {
        user: {
            firstName: first_name,
            lastName: last_name,
            createdAt: created_at,
            email,
        },
        token
    }};
}


const getUser = (email) => {
    debugger;
    const user = db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length) {
        return user[0];
    }

    return null;
}

const generateAuthToken = (email) => {
    try {
        const token = jwt.sign(
            {_email: email},
            process.env.JWT_SECRET,
        );
        console.log(token);
        db.run('UPDATE users SET token = ? WHERE email = ?', [token, email]);
        return token;
    } catch(err) {
        console.error(err.message);
        return null;
    }    

    
}

module.exports = {
    login,
    getUser,
};