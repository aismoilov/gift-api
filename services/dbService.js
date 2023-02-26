
const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('db/database.db'), {fileMustExist: true});

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

function createTable (sql) {
    db.exec(sql);
}

module.exports = {
  query,
  run,
  createTable,
}