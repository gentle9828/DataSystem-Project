const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const menuDao = require("./menuDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveMenu = async function (menuIdx) {
    if(!menuIdx) {
        const connection = await pool.getConnection(async(conn) => conn);
        const menuResult = await menuDao.selectMenu(connection);
        connection.release();

        return menuResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const menuResult = await menuDao.selectMenuIdx(connection, menuIdx);

        connection.release();

        return menuResult;
    }

};

