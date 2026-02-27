# Projeto referente à cadeira de Gerenciamento de Projetos (UEPB)

# Poker Cash - Guia de execução (Backend + Frontend + Supabase)

Este guia mostra o passo a passo para rodar o sistema localmente, incluindo a configuração do banco de dados no Supabase.

## 1) Pré-requisitos

- Node.js 20+
- npm 10+
- Conta no Supabase

> Dica (Windows): confira versões com:
>
> ```bash
> node -v
> npm -v
> ```

---

## 2) Clonar e abrir o projeto

```bash
git clone <URL_DO_REPOSITORIO>
cd poker-cash
```

---

## 3) Criar o banco no Supabase

1. Acesse o painel do Supabase e crie um novo projeto.
2. Aguarde o provisionamento.
3. No painel do projeto, copie a **connection string** PostgreSQL.
   - Caminho comum: `Project Settings > Database > Connection string`.
4. Use a conexão **direct connection** (porta 5432), não a de pooler.
5. Garanta que a URL contenha `?sslmode=require` no final.

Exemplo de formato:

```text
postgresql://postgres:SUA_SENHA@db.<project-ref>.supabase.co:5432/postgres?sslmode=require
```

---

## 4) Configurar variáveis de ambiente

### 4.1 Backend

Crie/edite o arquivo `backend/.env` com este modelo:

```env
DATABASE_URL=postgresql://postgres:SUA_SENHA@db.<project-ref>.supabase.co:5432/postgres?sslmode=require
JWT_SECRET=troque-por-um-segredo-forte
PORT=3333
CORS_ORIGIN=http://localhost:5173
ADMIN_EMAIL=admin@pokercash.local
ADMIN_PASSWORD=troque-por-uma-senha-forte
```

### 4.2 Frontend

Crie/edite o arquivo `frontend/.env`:

```env
VITE_API_URL=http://localhost:3333
VITE_APP_NAME=Poker Cash
```

---

## 5) Instalar dependências

No diretório raiz do projeto, execute:

```bash
cd backend
npm install
cd ../frontend
npm install
```

---

## 6) Aplicar migrações no banco (Supabase)

No diretório `backend`:

```bash
npx prisma generate
npx prisma migrate deploy
```

Se quiser validar estrutura e dados pelo Prisma Studio:

```bash
npx prisma studio
```

---

## 7) Rodar o backend

No diretório `backend`:

```bash
npm run dev
```

Servidor esperado:

- API: `http://localhost:3333`
- Health simples: `GET /` retorna `{ "message": "hello world" }`

---

## 8) Rodar o frontend

Em outro terminal, no diretório `frontend`:

```bash
npm run dev
```

URL padrão do Vite:

- `http://localhost:5173`

---

## 9) Fluxo básico para testar

1. Abrir `http://localhost:5173`
2. Registrar usuário
3. Fazer login
4. Confirmar que o frontend recebe token da rota `POST /auth/login`

---

## 10) Comandos úteis

### Backend

```bash
npm run dev
npm run build
npm run start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

---

## 11) Troubleshooting rápido

- **Erro de conexão com banco**: revise `DATABASE_URL`, senha e `sslmode=require`.
- **CORS bloqueando frontend**: confira `CORS_ORIGIN=http://localhost:5173` no `backend/.env`.
- **Porta ocupada**: altere `PORT` no backend e ajuste `VITE_API_URL` no frontend.
- **Migração falhou**: rode novamente no `backend`:
  - `npx prisma generate`
  - `npx prisma migrate deploy`

---

Pronto. Com isso, backend, frontend e banco Supabase devem subir localmente.
