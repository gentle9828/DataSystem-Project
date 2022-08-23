const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const reviewProvider = require("./reviewProvider");
const reviewDao = require("./reviewDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const userDao = require("../User/userDao");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (starGrade, reviewContents, reviewURL) {
    try {

        const insertReviewInfoParams = [starGrade, reviewContents, reviewURL];

        const connection = await pool.getConnection(async (conn) => conn);
        // const connection = await pool.getConnection(function (err, connection){
        //     callback(err, connection);
        // });

        const ReviewIdResult = await reviewDao.insertReviewInfo(connection, insertReviewInfoParams);
        console.log(`추가된 회원 : ${ReviewIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteReviewIdx = async function(reviewIdx) {
    try {
        const deleteReviewInfoParams = [reviewIdx];
        const connection = await pool.getConnection(async (conn) => conn);
        const reviewIdxResult = await reviewDao.deleteReview(connection, deleteReviewInfoParams);
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`App - deleteReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

