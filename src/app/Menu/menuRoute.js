module.exports = function(app){
    const menu = require('./menuController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    // app.get('/app/test', user.getTest);

    // 1. menu 생성 API
    app.post('/app/menu', menu.postMenus);

    // 2. menu 조회 API (+ 검색)
    app.get('/app/menu', menu.getMenus);

    // 3. menu 삭제 API
    app.delete('/app/menu/:menuIdx', menu.deleteMenus);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API