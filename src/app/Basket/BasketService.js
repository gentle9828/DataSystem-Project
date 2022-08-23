const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const basketProvider = require("./basketProvider");
const basketDao = require("./basketDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const userDao = require("../User/userDao");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createBasket = async function (userIdx, storeIdx, menuIdx, menuNum) {
    try {
        const insertBasketInfoParams = [userIdx, storeIdx, menuIdx, menuNum];

        const connection = await pool.getConnection(async (conn) => conn);
        // const connection = await pool.getConnection(function (err, connection){
        //     callback(err, connection);
        // });

        const BasketIdResult = await basketDao.insertBasketInfo(connection, insertBasketInfoParams);
        console.log(`추가된 장바구니 : ${BasketIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createBasket Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteBasketIdx = async function(basketIdx) {
    try {
        const deleteBasketInfoParams = [basketIdx];
        const connection = await pool.getConnection(async (conn) => conn);
        const basketIdxResult = await basketDao.deleteBasket(connection, deleteBasketInfoParams);
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`App - deleteUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};
