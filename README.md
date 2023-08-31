# order-project

티오더 직무 과제 프로젝트

# project Architecture

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

# ERD diagram
