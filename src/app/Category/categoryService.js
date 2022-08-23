const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const categoryProvider = require("./categoryProvider");
const categoryDao = require("./categoryDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const userDao = require("../User/userDao");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createCategory = async function (cateName) {
    try {
        const insertCateNameParams = [cateName];

        const connection = await pool.getConnection(async (conn) => conn);

        const cateIdResult = await categoryDao.insertCateInfo(connection, insertCateNameParams);
        // console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteCateIdx = async function(cateIdx) {
    try {
        const deleteCateInfoParams = [cateIdx];
        const connection = await pool.getConnection(async (conn) => conn);
        const cateIdxResult = await categoryDao.deleteCate(connection, deleteCateInfoParams);
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`App - deleteCate Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

