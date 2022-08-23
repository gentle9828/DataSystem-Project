const jwtMiddleware = require("../../../config/jwtMiddleware");
const menuProvider = require("../../app/Menu/menuProvider");
const menuService = require("../../app/Menu/menuService");
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
 * API Name : 메뉴 생성 API
 * [POST] /app/menu
 */
exports.postMenus = async function (req, res) {


    const {storeIdx, userIdx, menuName, menuCategory, menuURL, menuPrice, menuIntro} = req.body;


    const signUpResponse = await menuService.createMenu(
        storeIdx,
        userIdx,
        menuName,
        menuCategory,
        menuURL,
        menuPrice,
        menuIntro
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : menu 조회 API (+ Idx로 검색 조회)
 * [GET] /app/menu
 */
exports.getMenus = async function (req, res) {

    const menuIdx = req.query.menuIdx;

    if (!menuIdx) {
        // menu 전체 조회
        const menuListResult = await menuProvider.retrieveMenu();
        return res.send(menuListResult);
    } else {
        // menu 검색 조회
        const menuListByIdx = await menuProvider.retrieveMenu(menuIdx);
        return res.send(menuListByIdx);
    }
};

/**
 * API No. 3
 * API Name : menu 삭제 API
 * [GET] /app/menu/:menuIdx
 */
exports.deleteMenus = async function(req, res) {
    const menuIdx = req.query.menuIdx;

    const deleteByMenuIdx = await menuService.deleteMenuIdx(menuIdx);
    return res.send(deleteByMenuIdx);
};


