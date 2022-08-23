const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const storeDao = require("./storeDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveStore = async function (storeIdx) {
    if(!storeIdx) {
        const connection = await pool.getConnection(async(conn) => conn);
        const storeResult = await storeDao.selectStore(connection);
        connection.release();

        return storeResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const storeResult = await storeDao.selectStoreIdx(connection, storeIdx);

        connection.release();

        return storeResult;
    }

};

