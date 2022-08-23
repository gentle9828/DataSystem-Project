const jwtMiddleware = require("../../../config/jwtMiddleware");
const basketProvider = require("../../app/Basket/basketProvider");
const basketService = require("../../app/Basket/basketService");
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
 * API Name : 장바구니 생성 API
 * [POST] /app/basket
 */
exports.postBasket = async function (req, res) {


    const {userIdx, storeIdx, menuIdx, menuNum} = req.body;


    const signUpResponse = await basketService.createBasket(
        userIdx,
        storeIdx,
        menuIdx,
        menuNum
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 장바구니 조회 API (+ Idx로 검색 조회)
 * [GET] /app/basket
 */
exports.getBasket = async function (req, res) {

    const basketIdx = req.query.basketIdx;

    if (!basketIdx) {
        // basket 전체 조회
        const basketListResult = await basketProvider.retrieveBasket();
        return res.send(basketListResult);
    } else {
        // basket 검색 조회
        const basketListByIdx = await basketProvider.retrieveBasket(basketIdx);
        return res.send(basketListByIdx);
    }
};

/**
 * API No. 3
 * API Name : 장바구니 삭제 API
 * [DELETE] /app/basket/:basketIdx
 */
exports.deleteBasket = async function(req, res) {
    const basketIdx = req.query.basketIdx;

    const deleteByBasketIdx = await basketService.deleteBasketIdx(basketIdx);
    return res.send(deleteByBasketIdx);
};


