## DataSystem Project
### 배달의 민족앱의 몇가지 기능을 API 구현

### Folder Structure
- `src`: 메인 로직 
- `config` 및 `util` 폴더: 메인 로직은 아니지만 `src` 에서 필요한 부차적인 파일들을 모아놓은 폴더
- 도메인 폴더 구조
> Route - Controller - Provider/Service - DAO

- Route: Request에서 보낸 라우팅 처리
- Controller: Request를 처리하고 Response 해주는 곳. (Provider/Service에 넘겨주고 다시 받아온 결과값을 형식화), 형식적 Validation
- Provider/Service: 비즈니스 로직 처리, 의미적 Validation
- DAO: Data Access Object의 줄임말. Query가 작성되어 있는 곳. 

### User
- userController.js
- userDao.js
- userProvider.js
- userRoute.js
- userService.js

### Store
- storeController.js
- storeDao.js
- storeProvider.js
- storeRoute.js
- storeService.js

### Review
- reviewController.js
- reviewDao.js
- reviewProvider.js
- reviewRoute.js
- reviewService.js

### Menu
- menuController.js
- menuDao.js
- menuProvider.js
- menuRoute.js
- menuService.js

### Category
- categoryController.js
- categoryDao.js
- categoryProvider.js
- categoryRoute.js
- categoryService.js

### Basket
- BasketController.js
- BasketDao.js
- BasketProvider.js
- BasketRoute.js
- BasketService.js
