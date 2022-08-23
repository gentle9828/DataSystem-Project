const jwtMiddleware = require("../../../config/jwtMiddleware");
const reviewProvider = require("../../app/Review/reviewProvider");
const reviewService = require("../../app/Review/reviewService");
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
 * API Name : 리뷰 생성 API
 * [POST] /app/reviews
 */
exports.postReviews = async function (req, res) {


    const {starGrade, reviewContents, reviewURL} = req.body;


    const signUpResponse = await reviewService.createUser(
        starGrade,
        reviewContents,
        reviewURL
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : review 조회 API (+ Idx로 검색 조회)
 * [GET] /app/reviews
 */
exports.getReviews = async function (req, res) {

    /**
     * Query String: email
     */

    const reviewIdx = req.query.reviewIdx;

    if (!reviewIdx) {
        // review 전체 조회
        const reviewListResult = await reviewProvider.retrieveUser();
        return res.send(reviewListResult);
    } else {
        // reivew 검색 조회
        const reviewListByIdx = await reviewProvider.retrieveUser(reviewIdx);
        return res.send(reviewListByIdx);
    }
};

/**
 * API No. 3
 * API Name : review 삭제 API
 * [GET] /app/reviews/:reviewIdx
 */
exports.deleteReviews = async function(req, res) {
    const reviewIdx = req.query.reviewIdx;

    const deleteByReviewIdx = await reviewService.deleteReviewIdx(reviewIdx);
    return res.send(deleteByReviewIdx);

};


