module.exports = function(app){
    const basket = require('./basketController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    // app.get('/app/test', user.getTest);

    // 1. basket 생성 API
    app.post('/app/basket', basket.postBasket);

    // 2. basket 조회 API (+ 검색)
    app.get('/app/basket', basket.getBasket);

    // 3. basket 삭제 API
    app.delete('/app/basket/:basketIdx', basket.deleteBasket);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API