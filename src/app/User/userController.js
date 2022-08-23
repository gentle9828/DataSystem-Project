const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

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
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: userEmail, userPassword, userName
     */
    const {userEmail, userPassword, userName, userPhoneNumber} = req.body;

    // 빈 값 체크
    if (!userEmail)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (userEmail.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(userEmail))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        userEmail,
        userPassword,
        userName,
        userPhoneNumber,
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    const userEmail = req.query.userEmail;

    if (!userEmail) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        // return res.send(response(baseResponse.SUCCESS, userListResult));
        return res.send(userListResult);
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(userEmail);
        // return res.send(response(baseResponse.SUCCESS, userListByEmail));
        return res.send(userListByEmail);
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userIdx = req.query.userIdx;

    if (!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
    } else {
        const userByUserId = await userProvider.retrieveUser(userIdx);
        // return res.send(response(baseResponse.SUCCESS, userByUserId));
        return res.send(userByUserId);
    }

};


// // TODO: After 로그인 인증 방법 (JWT)
// /**
//  * API No. 4
//  * API Name : 로그인 API
//  * [POST] /app/login
//  * body : email, passsword
//  */
// exports.login = async function (req, res) {
//
//     const {email, password} = req.body;
//
//     // TODO: email, password 형식적 Validation
//
//     const signInResponse = await userService.postSignIn(email, password);
//
//     return res.send(signInResponse);
// };
//
//
// /**
//  * API No. 5
//  * API Name : 회원 정보 수정 API + JWT + Validation
//  * [PATCH] /app/users/:userId
//  * path variable : userId
//  * body : nickname
//  */
// exports.patchUsers = async function (req, res) {
//
//     // jwt - userId, path variable :userId
//
//     const userIdFromJWT = req.verifiedToken.userId
//
//     const userId = req.params.userId;
//     const nickname = req.body.nickname;
//
//     if (userIdFromJWT != userId) {
//         res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
//     } else {
//         if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
//
//         const editUserInfo = await userService.editUser(userId, nickname)
//         return res.send(editUserInfo);
//     }
// };

/**
 * API No. 6
 * API Name : 유저 삭제 API
 * [GET] /app/users/:userIdx
 */
exports.deleteUsers = async function(req, res) {
    const userIdx = req.query.userIdx;

    const deleteByUserIdx = await userService.deleteUserIdx(userIdx);
    return res.send(deleteByUserIdx);
};



// /** JWT 토큰 검증 API
//  * [GET] /app/auto-login
//  */
// exports.check = async function (req, res) {
//     const userIdResult = req.verifiedToken.userId;
//     console.log(userIdResult);
//     return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
// };
