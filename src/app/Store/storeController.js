const jwtMiddleware = require("../../../config/jwtMiddleware");
const storeProvider = require("../../app/Store/storeProvider");
const storeService = require("../../app/Store/storeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const userService = require("../User/userService");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
// exports.getTest = async function (req, res) {
//      return res.send(response(baseResponse.SUCCESS));
// };

/**
 * API No. 1
 * API Name : store 생성 API
 * [POST] /app/store
 */
exports.postStores = async function (req, res) {


    const {userIdx, cateIdx, storeName, storePhoneNumber, storeLocation, managingHour} = req.body;


    const signUpResponse = await storeService.createStore(
        userIdx,
        cateIdx,
        storeName,
        storePhoneNumber,
        storeLocation,
        managingHour
    );

    return res.send(signUpResponse);
};

/**
 * API No. 3
 * API Name : store 조회 API (+ Idx로 검색 조회)
 * [GET] /app/store
 */
exports.getStores = async function (req, res) {

    const storeIdx = req.query.storeIdx;

    if (!storeIdx) {
        // store 전체 조회
        const storeListResult = await storeProvider.retrieveStore();
        return res.send(storeListResult);
    } else {
        // store 검색 조회
        const storeListByIdx = await storeProvider.retrieveStore(storeIdx);
        return res.send(storeListByIdx);
    }
};

/**
 * API No. 3
 * API Name : store 삭제 API
 * [GET] /app/store/:storeIdx
 */
exports.deleteStores = async function(req, res) {
    const storeIdx = req.query.storeIdx;

    const deleteByStoreIdx = await storeService.deleteStoreIdx(storeIdx);
    return res.send(deleteByStoreIdx);

};

