const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const menuProvider = require("./menuProvider");
const menuDao = require("./menuDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const userDao = require("../User/userDao");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createMenu = async function (storeIdx, userIdx, menuName, menuCategory, menuURL, menuPrice, menuIntro) {
    try {
        const insertMenuInfoParams = [storeIdx, userIdx, menuName, menuCategory, menuURL, menuPrice, menuIntro];

        const connection = await pool.getConnection(async (conn) => conn);
        // const connection = await pool.getConnection(function (err, connection){
        //     callback(err, connection);
        // });

        const MenuIdResult = await MenuDao.insertMenuInfo(connection, insertMenuInfoParams);
        console.log(`추가된 메뉴 : ${MenuIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteMenuIdx = async function(menuIdx) {
    try {
        const deleteMenuInfoParams = [menuIdx];
        const connection = await pool.getConnection(async (conn) => conn);
        const menuIdxResult = await menuDao.deleteMenu(connection, deleteMenuInfoParams);
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`App - deleteUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

