# order-project

티오더 직무 과제 프로젝트

# project Architecture

<details open>
<summary>구조 트리</summary>
<div markdown="1">

📦src  
┣ 📂auth  
┃ ┣ 📂dto  
┃ ┃ ┗ 📜auth.dto.ts  
┃ ┣ 📜accessToken.guard.ts  
┃ ┣ 📜accessToken.strategy.ts  
┃ ┣ 📜auth.controller.ts  
┃ ┣ 📜auth.module.ts  
┃ ┣ 📜auth.service.ts  
┃ ┣ 📜refreshToken.guard.ts  
┃ ┗ 📜refreshToken.strategy.ts  
┣ 📂config  
┃ ┣ 📜customMetadata.ts  
┃ ┣ 📜redis.config.ts  
┃ ┣ 📜swagger.config.ts  
┃ ┗ 📜typeorm.config.ts  
┣ 📂database  
┃ ┣ 📂entities  
┃ ┃ ┣ 📜Menu.ts  
┃ ┃ ┣ 📜MenuCategory.ts  
┃ ┃ ┣ 📜Order.ts  
┃ ┃ ┣ 📜OrderDetail.ts  
┃ ┃ ┣ 📜Payment.ts  
┃ ┃ ┣ 📜Store.ts  
┃ ┃ ┗ 📜User.ts  
┃ ┗ 📂repository  
┃ ┃ ┣ 📜menuCategory.repository.ts  
┃ ┃ ┣ 📜order.repository.ts  
┃ ┃ ┣ 📜orderDetail.repository.ts  
┃ ┃ ┣ 📜payment.repository.ts  
┃ ┃ ┣ 📜repository.module.ts  
┃ ┃ ┗ 📜user.repository.ts  
┣ 📂dto  
┃ ┣ 📜customResponseDto.ts  
┃ ┗ 📜payloadDto.ts  
┣ 📂menu  
┃ ┣ 📂dto  
┃ ┃ ┗ 📜menu.dto.ts  
┃ ┣ 📜menu.controller.ts  
┃ ┣ 📜menu.module.ts  
┃ ┗ 📜menu.service.ts  
┣ 📂order  
┃ ┣ 📂dto  
┃ ┃ ┗ 📜order.dto.ts  
┃ ┣ 📜order.controller.ts  
┃ ┣ 📜order.module.ts  
┃ ┗ 📜order.service.ts  
┣ 📂payment  
┃ ┣ 📂dto  
┃ ┃ ┗ 📜payment.dto.ts  
┃ ┣ 📜payment.controller.ts  
┃ ┣ 📜payment.module.ts  
┃ ┗ 📜payment.service.ts  
┣ 📂routes  
┃ ┗ 📜router.ts  
┣ 📜app.controller.ts  
┣ 📜app.module.ts  
┣ 📜app.service.ts  
┗ 📜main.ts

</div>
</details>

# ERD diagram

<p align="center">
  <img src="https://private-user-images.githubusercontent.com/71811826/264654311-444443de-d9d5-40bb-8082-2fe5214e8a56.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE2OTM0ODc3NDMsIm5iZiI6MTY5MzQ4NzQ0MywicGF0aCI6Ii83MTgxMTgyNi8yNjQ2NTQzMTEtNDQ0NDQzZGUtZDlkNS00MGJiLTgwODItMmZlNTIxNGU4YTU2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzA4MzElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMwODMxVDEzMTA0M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThhOWZmZjk0OGViNjg5ZDY2YmFiNjg4YjRhODgyNmUzZDJkNzQyNzE4NjQ1ZGNiMmYyM2MwYjE2MjZmYzEyZDEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.6_hKO9GY9h6ricRO2hiv8qQO-HIAFRyPKfxD9G-tVVE">
</p>

# Project init

```
1. brew services start mysql
2. db_query 폴더에 있는 query로 mysql에 table 및 더미 데이터 생성
3. redis server start
    2-1. /opt/homebrew/opt/redis/bin/redis-server /opt/homebrew/etc/redis.conf
4. export NODE_ENV=prod
5. npm install
6. npm run start:prod
```

## Swagger

http://localhost:3000/api#/

# 기능

## ⭐️ 로그인/로그아웃

@Post  
http://localhost:3000/v1/auth/login

```
{
  "userId": "torder1",
  "password": "qwe123!@#"
}
```

<b>로그인 필요</b>(authorization에 accessToken, body에 refreshToken 필요)  
http://localhost:3000/v1/auth/logout

```
{
  "refreshToken": "로그인으로 발생한 refreshToken"
}
```

- jwt와 인메모리 데이터 구조 저장소인 Redis를 사용하였습니다.
- 로그인 시 jwt에 유저 정보와 회사 정보를 payload에 담아 accessToken을 생성해 유저 검증이 필요한 api단에서 database 조회를 최소화하고 strategy에서 복호화하여 사용하도록 구현하였습니다.
- 로그아웃 성공 시 accessToken을 검증하고 refreshToken을 제거한 뒤, Redis에 accessToken을 key로 logout을 담아 저장하여 로그아웃으로 인해 유효하지 않게 된 accessToken을 저장하고, accessToken.strategy에서 유효한 토큰인지 확인하도록 구현하였습니다.

## ⭐️ 메뉴

@Get  
<b>로그인 필요</b>(authorization에 accessToken 필요)
http://localhost:3000/v1/menu

- 메뉴 카테고리와 메뉴를 join 하고 strategy에서 복호화하여 얻은 유저 정보와 회사 정보로 조건을 걸어 회사별로 등록된 메뉴 카테고리와 메뉴를 조회할 수 있게 구현하였습니다.

## ⭐️ 주문하기

@Post  
<b>로그인 필요</b>(authorization에 accessToken 필요)
http://localhost:3000/v1/order

```
{
  "orderList": [
    {
      "menuSeq": 1,
      "quantity": 2
    },
    {
      "menuSeq": 2,
      "quantity": 1
    },
    {
      "menuSeq": 3,
      "quantity": 1
    }
  ]
}
```

- 유저 번호로 order 테이블에 아직 결제하지 않은 order가 있는지 확인 후 있으면 해당 order의 seq를 담은 주문 내역을 order_detail에 적재합니다.
- 결제하지 않은 order가 없을 경우, 트랜잭션으로 order에 row를 생성한 후 해당 seq를 담은 주문 내역을 order_detail에 적재합니다.

## ⭐️ 주문 내역 확인

@Get  
<b>로그인 필요</b>(authorization에 accessToken 필요)
http://localhost:3000/v1/order

- 아직 결제하지 않은 주문 내역이 있을 시 order와 order_detail, menu 테이블을 join하여 필요한 값들을 정제하여 반환합니다.

## ⭐️ 결제

@Post  
<b>로그인 필요</b>(authorization에 accessToken 필요)
http://localhost:3000/v1/payment

```
{
  "amount": 300000
}
```

- 총 결제 금액을 구하고 body에 담긴 amount 값과 비교하여 모자라면 403 반환, 동일하거나 amount가 더 높을 시에는 계산한 값과 200을 반환합니다.
- 결제 시 트랜잭션으로 payment row를 생성하고 order 테이블의 해당 row의 payment_status를 Y로 변경하여 soft delete 처리하였습니다.

## ⭐️ 메뉴 선택 및 삭제, 장바구니 (미구현)

- local storage나 session storage에 선택하는 상품들을 담고, 스토리지 자체를 장바구니로 사용할 수 있을 것이라 생각합니다.
- 사용자가 삭제하는 일부의 값을 제거하고, 장바구니 전체를 주문 시 스토리지를 전체 삭제하여 구현할 수 있을 것이라 생각합니다.
