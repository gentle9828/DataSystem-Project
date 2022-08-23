const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const basketDao = require("./basketDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveBasket = async function (basketIdx) {
    if(!basketIdx) {
        const connection = await pool.getConnection(async(conn) => conn);
        const basketResult = await basketDao.selectBasket(connection);
        connection.release();

        return basketResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const basketResult = await basketDao.selectBasketIdx(connection, basketIdx);

        connection.release();

        return basketResult;
    }

};

