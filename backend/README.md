<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# School Attendance Management API

This project is a backend application to manage the use of educational spaces, allowing analysis of occupancy rates. Built with **NestJS**, **Prisma**, **PostgreSQL**, and JWT authentication.

---

## 📚 Features

- CRUD for **Students**.
- CRUD for **Rooms**.
- Attendance management: register **entry** and **exit** of students.
- JWT-based authentication and role-based authorization.
- Protected routes so only authenticated users can access the API.

---

## 🏗 Project Structure

    src/
    ├─ auth/
    │ ├─ auth.module.ts
    │ ├─ auth.service.ts
    │ ├─ auth.controller.ts
    │ ├─ jwt.strategy.ts
    │ ├─ jwt-auth.guard.ts
    │ └─ constants.ts
    ├─ user/
    │ ├─ user.module.ts
    │ ├─ user.service.ts
    │ ├─ user.controller.ts
    │ └─ dto/create-user.dto.ts
    ├─ student/
    │ ├─ student.module.ts
    │ ├─ student.service.ts
    │ ├─ student.controller.ts
    │ └─ dto/create-student.dto.ts
    ├─ room/
    │ ├─ room.module.ts
    │ ├─ room.service.ts
    │ ├─ room.controller.ts
    │ └─ dto/create-room.dto.ts
    ├─ attendance/
    │ ├─ attendance.module.ts
    │ ├─ attendance.service.ts
    │ ├─ attendance.controller.ts
    │ └─ dto/create-attendance.dto.ts
    └─ prisma/
    └─ prisma.service.ts


---

## 📦 Database Schema (Prisma)

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  role     String
}

model Student {
  id          Int          @id @default(autoincrement())
  name        String
  email       String       @unique
  password    String
  attendances Attendance[]
}

model Room {
  id          Int          @id @default(autoincrement())
  name        String       @unique
  type        String
  capacity    Int?
  attendances Attendance[]
}

model Attendance {
  id        Int       @id @default(autoincrement())
  studentId Int
  roomId    Int
  entryTime DateTime
  exitTime  DateTime?
  student   Student   @relation(fields: [studentId], references: [id])
  room      Room      @relation(fields: [roomId], references: [id])
}
