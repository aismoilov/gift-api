const db = require('../services/dbService');
const bcrypt = require('bcryptjs');

const dbMigration = () => {
    db.createTable(`CREATE TABLE if not exists users( first_name TEXT, last_name TEXT, email TEXT NOT NULL UNIQUE, password TEXT, token NULLABLE TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    db.createTable(`CREATE TABLE if not exists gifts( name TEXT, congratulation TEXT, hash TEXT UNIQUE, author TEXT)`);
}

const dbSeed = async () => {
    const password = await bcrypt.hash('test1234', 8);
    const admin = db.run(`INSERT OR IGNORE INTO users(first_name, last_name, email, password) VALUES(?,?,?,?)`, ['Amir', 'Ismoilov', 'amir.ismoiloff@gmail.com', password]);
}

module.exports = {
    dbMigration,
    dbSeed,
};