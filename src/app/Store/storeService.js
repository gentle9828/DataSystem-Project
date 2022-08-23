const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const storeProvider = require("./storeProvider");
const storeDao = require("./storeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const userDao = require("../User/userDao");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createStore = async function (userIdx, cateIdx, storeName, storePhoneNumber, storeLocation, managingHour) {
    try {

        const insertStoreInfoParams = [userIdx, cateIdx, storeName, storePhoneNumber, storeLocation, managingHour];

        const connection = await pool.getConnection(async (conn) => conn);
        // const connection = await pool.getConnection(function (err, connection){
        //     callback(err, connection);
        // });

        const StoreIdResult = await storeDao.insertStoreInfo(connection, insertStoreInfoParams);
        console.log(`추가된 가게 : ${StoreIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteStoreIdx = async function(storeIdx) {
    try {
        const deleteStoreInfoParams = [storeIdx];
        const connection = await pool.getConnection(async (conn) => conn);
        const storeIdxResult = await storeDao.deleteStore(connection, deleteStoreInfoParams);
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`App - deleteStore Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

