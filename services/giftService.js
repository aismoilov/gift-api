const db = require('./dbService');
const SHA256 = require("crypto-js/sha256");
const Base64 = require('crypto-js/enc-base64');
const crypto = require("crypto");

const getGiftsList = () => {
    const data = db.query('SELECT * from gifts', []);
    return { data };
}

const createGift = ({name, congratulation, author }) => {
    try {
        const hash = generateHash(name);
        const data = db.run('INSERT INTO gifts VALUES(?,?,?,?)', [name, congratulation, hash, author]);
        return { data: { id: data.lastInsertRowid }, success: true };
    } catch (err) {
        console.error(err.message);
        return { data: err.message, success: false };
    }    
}

const updateGift = ({ name, congratulation, hash, author }) => {
    try {
        const data = db.run('UPDATE gifts SET name = ?, congratulation = ?, author = ? WHERE hash = ?', [name, congratulation, author, hash]);
         return { data, success: true };
    } catch (err) {
        console.error(err.message);
        return { data: err.message, success: false };
    }
}

const deleteGift = (hash) => {
    try{
        const data = db.run('DELETE FROM gifts WHERE hash = ?', [hash]);
        return { success: true };
    } catch (err) {
        console.error(err.message);
        return { err: err.message, success: false };
    }    
}

const getGiftByHash = (hash) => {
    const data = db.query('SELECT * FROM gifts WHERE hash = ?', [hash]);
    if (data.length) {
        return data[0];
    }
    return null;
}

const checkGiftHash = (hash) => {
    const data = db.query('SELECT * FROM gifts WHERE hash = ?', [hash]);
    if (data.length) {
        return true;
    }
    return false;
}

const generateHash = (name) => {
    const hash = crypto.createHash("shake256", { outputLength: 2 })
      .update(name + Date.now().toString())
      .digest("hex");

    if (checkGiftHash(hash)) {
        return this.generateHash(name);
    }

    return hash;
}

module.exports = {
    getGiftsList,
    createGift,
    updateGift,
    deleteGift,
    getGiftByHash,
}