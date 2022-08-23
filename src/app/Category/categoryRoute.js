module.exports = function(app){
    const category = require('./categoryController');
    // const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    // app.get('/app/test', category.getTest);

    // 1. 카테고리 생성 (회원가입) API
    app.post('/app/category', category.postCategory);

    // 2. 카테고리 조회 API (+ 검색)
    app.get('/app/category', category.getCategory);

    // 3. 카테고리 삭제 API
    app.delete('/app/category/:cateIdx', category.deleteCategory);


};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API