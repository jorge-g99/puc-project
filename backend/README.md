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

# 🎓 School Attendance Management API

Backend para gerenciamento de uso de salas e controle de entrada/saída de estudantes.  
Construído com **NestJS**, **Prisma**, **PostgreSQL**, **Docker** e **JWT Authentication**.

---

# 🚀 Tecnologias Utilizadas
- **NestJS** (estrutura modular e escalável)
- **Prisma ORM**
- **PostgreSQL**
- **JWT** para autenticação
- **RBAC** (Role-Based Access Control)
- **Docker + Docker Compose**

---

# 📚 Funcionalidades

- CRUD de **Students**
- CRUD de **Rooms**
- CRUD de **Users** (apenas funções administrativas)
- Registro de **entrada** e **saída** de alunos
- Autenticação via **JWT**
- Autorização via **Roles** (ADMIN, STAFF)
- Rotas protegidas

---

# 🐳 Como rodar com Docker

## 1. Subir toda a stack
```bash
docker compose up --build
```

Isso irá:

- Criar o container postgres
- Criar o container backend
- Rodar migrations

---

# 🌱 Rodar Seed Manualmente

Dentro da pasta do projeto, execute:
```bash
docker exec -it backend_app sh
```

Depois execute:
```bash
npx prisma db seed
```

Após o seed, o usuário inicial será criado.

---

# 🔑 Usuário padrão (Seed)

```bash
email: admin@example.com
password: admin123
role: ADMIN
```

Use este usuário para gerar o token JWT.

---

# ▶️ Testando a API

1) Login – obter token

POST `/auth/login`

Request:
```bash
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response:
```bash
{
  "access_token": "..."
}
```

2) Usar o token nas rotas protegidas

Header:
```bash
Authorization: Bearer SEU_TOKEN_AQUI
```

3) Exemplo: listar estudantes

GET `/students`
```bash
curl -H "Authorization: Bearer TOKEN_AQUI" http://localhost:3000/students
```

---

🗄 Banco de Dados (Schema Prisma)

```
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
```

---
