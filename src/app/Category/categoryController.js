// const jwtMiddleware = require("../../../config/jwtMiddleware");
const categoryProvider = require("../../app/Category/categoryProvider");
const categoryService = require("../../app/Category/categoryService");
const userService = require("../User/userService");
// const baseResponse = require("../../../config/baseResponseStatus");
// const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
// const {emit} = require("nodemon");

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
 * API Name : 카테고리 생성 (회원가입) API
 * [POST] /app/category
 */
exports.postCategory = async function (req, res) {
    const {cateName} = req.body;

    const signUpResponse = await categoryService.createCategory(
        cateName
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 카테고리 조회 API
 * [GET] /app/category
 */
exports.getCategory = async function (req, res) {

    const cateName = req.query.cateName;

    if (!cateName) {
        // 카테고리 전체 조회
        const categoryListResult = await categoryProvider.retrieveCateList();
        // return res.send(response(baseResponse.SUCCESS, categoryListResult));
        return res.send(categoryListResult);
    } else {
        // 카테고리 검색 조회
        const categoryListName = await categoryProvider.retrieveCateList(cateName);
        // return res.send(response(baseResponse.SUCCESS, categoryListName));
        return res.send(categoryListName);
    }
};

/**
 * API No. 3
 * API Name : 카테고리 삭제 API
 * [GET] /app/category/:cateIdx
 */
exports.deleteCategory = async function(req, res) {
    const cateIdx = req.query.cateIdx;

    const deleteByCateIdx = await categoryService.deleteCateIdx(cateIdx);
    return res.send(deleteByCateIdx);
};




