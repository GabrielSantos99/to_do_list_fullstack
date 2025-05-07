# 📝 To-Do List Fullstack App

Este é um projeto de lista de tarefas (To-Do List) desenvolvido como exercício prático para consolidar conhecimentos em desenvolvimento fullstack com React no front-end, Node.js no back-end, PostgreSQL como banco de dados e estilizada com Tailwind CSS.

## 🚀 Tecnologias Utilizadas

### Front-end (React)
- React 18
- Tailwind CSS
- Axios

### Back-end (Node.js + Express)
- Node.js
- Express
- Prisma ORM
- PostgreSQL

## 📁 Estrutura de Pastas

/
├── client/ # Front-end React
│ └── src
│   └── components/ # Componentes reutilizáveis (TaskForm, TaskList, etc)
│   └── services/ # Configuração do Axios
│   └── App.jsx # Componente principal
├── server/
│ └── prisma/ # Esquema do Prisma (schema.prisma, migrations)
│ └── src/ # Lógica do back-end
│ └── middlewares/ # Middleware customizado (ex: tratamento de erros)
│ └── controllers/ # Controladores das rotas
│ └── routes/ # Definições das rotas da API
│ └── server.js # Ponto de entrada do servidor Express
└── README.md # Este arquivo


## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js
- Docker (opcional, mas recomendado para o banco de dados)
- PostgreSQL (caso não use Docker)

### 1. Clone o repositório
```bash
git clone https://github.com/GabrielSantos99/to_do_list_fullstack.git
cd to_do_list_fullstack
```

### 2. Configuração do servidor (Node + Prisma)
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### 3. Configuração do client (React)
```bash
cd ../client
npm install
npm run dev
```

### 4. Acesse a aplicação
Abra http://localhost:5173 no navegador.

✅ Funcionalidades já implementadas
Criar tarefa

Listar tarefas

Atualizar tarefa

Deletar tarefa

Interface estilizada com Tailwind

🛠️ Em desenvolvimento
Filtrar por status

Autenticação de usuários

Organização por colunas (Kanban-style)

📌 Observações
Esse projeto está em desenvolvimento contínuo com o objetivo de aprender e aplicar boas práticas em aplicações fullstack modernas.