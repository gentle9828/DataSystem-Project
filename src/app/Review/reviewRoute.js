module.exports = function(app){
    const review = require('./reviewController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    // app.get('/app/test', user.getTest);

    // 1. review 생성 API
    app.post('/app/reviews', review.postReviews);

    // 2. review 조회 API (+ 검색)
    app.get('/app/reviews', review.getReviews);

    // 3. review 삭제 API
    app.delete('/app/reviews/:reviewIdx', review.deleteReviews);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API