module.exports = function(app){
    const store = require('./storeController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    // app.get('/app/test', user.getTest);

    // 1. store 생성 API
    app.post('/app/store', store.postStores);

    // 2. store 조회 API (+ 검색)
    app.get('/app/store', store.getStores);

    // 3. store 삭제 API
    app.delete('/app/store/:storeIdx', store.deleteStores);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API