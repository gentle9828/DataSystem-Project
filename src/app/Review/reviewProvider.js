const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reviewDao = require("./reviewDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUser = async function (reviewIdx) {
    if(!reviewIdx) {
        const connection = await pool.getConnection(async(conn) => conn);
        const reviewResult = await reviewDao.selectReview(connection);
        connection.release();

        return reviewResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const reviewResult = await reviewDao.selectReviewIdx(connection, reviewIdx);

        connection.release();

        return reviewResult;
    }

};

