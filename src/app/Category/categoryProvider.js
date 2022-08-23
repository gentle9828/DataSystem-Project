const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const categoryDao = require("./categoryDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveCateList = async function (cateName) {
    if (!cateName) {
        const connection = await pool.getConnection(async (conn) => conn);
        const categoryListResult = await categoryDao.selectCate(connection);
        connection.release();

        return categoryListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const categoryListResult = await categoryDao.selectCateName(connection, cateName);
        connection.release();

        return categoryListResult;
    }
};
