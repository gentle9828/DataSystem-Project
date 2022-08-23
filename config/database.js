const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: '203.255.57.227',
    user: 'gnusg',
    port: '3306',
    password: 'GNUSG!!!gnu_usg1234',
    database: 'GNUSG'
});

module.exports = {
    pool: pool
};
