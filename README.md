# 📚 Sistema de Controle de Presença em Salas de Ensino

Aplicação web para controle do uso de salas de aula, laboratórios e salas de estudos, permitindo registrar entradas e saídas de alunos e consultar taxas de ocupação.

O sistema possui back-end em NestJS, front-end em Next.js (React) e PostgreSQL via Docker.

---
# 🛠 Tecnologias

- Backend: Node.js + NestJS + Prisma
- Frontend: Next.js + React + MUI
- Banco de dados: PostgreSQL
- Contêineres: Docker + Docker Compose
- Notificações no Frontend: react-hot-toast
- Autenticação: JWT
- Controle de acesso: Roles (ADMIN, STAFF)

---
# 💻 Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Docker (para rodar containers do backend e PostgreSQL)
- Docker Compose
- Navegador moderno (Chrome, Firefox ou Edge)

        Se você não tiver algum desses, instale antes de continuar. O frontend será executado localmente, enquanto o backend e o banco rodam em containers.

---
# 🐳 Rodando com Docker

1. Subir toda a stack

No diretório raiz do projeto:
```bash
docker compose up --build
```

Isso irá:

- Criar o container do PostgreSQL
- Criar o container do backend
- Rodar as migrations

2. Rodar seed manualmente

Dentro do container do backend:
```bash
docker exec -it backend_app sh
```

Depois, execute:
```bash
npx prisma db seed
```

Isso irá criar o usuário inicial do sistema.

---
# 🔑 Usuário padrão (Seed)

```bash
email: admin@example.com
password: admin123
role: ADMIN
```
Use este usuário para gerar o token JWT e acessar os endpoints protegidos do backend.

---

# ⚙️ Executando o Backend

Se o Docker já estiver rodando, o backend estará disponível em:

```
http://localhost:3001
```

Endpoints importantes:

- /auth/login – Gera token JWT
- /students – CRUD de alunos (roles ADMIN/STAF)
- /rooms – CRUD de salas (roles ADMIN/STAF)
- /attendance – Registrar entradas e saídas (roles ADMIN/STAF)

Regras importantes do sistema:

- Um aluno não pode registrar entrada duplicada na mesma sala sem sair primeiro.
- Um aluno não pode registrar entrada em outra sala sem ter saído da anterior.
- Apenas usuários com papel ADMIN ou STAFF podem registrar presença.
- Apenas ADMIN pode deletar salas e alunos.

---
# 🌱 Executando o Frontend

O frontend não roda em Docker, execute localmente:

1. Instale dependências:

```bash
cd frontend
npm install
```

2. Configure a URL da API do backend no arquivo .env.local:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Rode o frontend:

```bash
npm run dev
```

O aplicativo estará disponível em:

```bash
http://localhost:3001
```

---
# 🔐 Como usar o sistema

1. Faça login com o usuário admin.
2. Cadastre alunos e salas.
3. Na tela de Attendance:
    - Selecione o aluno (busca via API)
    - Selecione a sala (busca via API)
    - Clique em Registrar Entrada ou Registrar Saída
4. A tabela de presenças será atualizada automaticamente.
5. Notificações aparecerão confirmando o registro de entrada/saída ou alertando sobre regras de negócio.

---
# 🚀 Observações

- O sistema foi desenvolvido inteiramente com uso da wsl (Linux).
- Ao acessar o portal confira as abas no menu lateral para interagir.
- Notificações usam react-hot-toast configuradas para 3s.
- Frontend usa MUI Autocomplete com busca via API.
- Backend valida duplicidade de entrada e bloqueia entrada em outras salas se o aluno não tiver saído.
- Todas as operações críticas estão protegidas por JWT e RolesGuard.


---
# **Case Técnico – Processo Seletivo**

## **Problema**

Desenvolver uma aplicação web para **controlar o uso de espaços de ensino**, permitindo análise da taxa de ocupação.  
Um ambiente de ensino pode ser uma **sala de aula**, **laboratório** ou **sala de estudos**.  
A aplicação deve possibilitar o **cadastro de alunos**, que deverão **registrar presença ao entrar e sair do ambiente**.  
A especificidade do projeto (detalhes adicionais, regras de negócio) fica a critério do candidato.

***

## **Pré-requisitos**

*   **Não existe sistema atual na instituição** que forneça estrutura inicial.
*   **Back-end**: Java (Spring) **ou** Node.js.
*   **Front-end**: React **ou** Angular.
*   **Armazenamento**: Implementar **um mecanismo de persistência de dados** (tipo de banco ou tecnologia a critério do candidato).
*   **Funcionalidades obrigatórias**:
    *   CRUD para cadastro de alunos.
    *   Registro de entrada e saída dos ambientes de ensino.
*   **API**:
    *   Deve existir uma API para comunicação entre front-end e back-end.
    *   **A API deve implementar autenticação via token e garantir autorização adequada para que apenas usuários autenticados possam acessar e executar operações permitidas.**

***

## **Critérios de Avaliação**

*   Organização e clareza do código.
*   Uso de boas práticas (estrutura, padrões, segurança).
*   Documentação mínima para execução do projeto.
*   Qualidade da solução proposta (funcionalidade, usabilidade).
*   Criatividade na definição das regras de negócio.

***

## **Como Participar**

1.  **Faça um fork deste repositório.**
2.  Desenvolva sua solução no repositório criado pelo fork.
3.  Certifique-se de que o repositório esteja **público**.
4.  O **último commit** deve ser realizado até **24/11/2025 às 08:00**.
5.  Envie a URL do seu repositório para o e-mail ana.neneve@pucpr.br até o mesmo prazo do commit.
