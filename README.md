# Plataforma de Gerenciamento de Avaliações

Trabalho Final da disciplina de Programação Web (2026.1) — Universidade Estadual da Paraíba.

Sistema para auxiliar professores na criação e organização de provas e listas de exercícios, com gestão de turmas, matrículas de alunos e bancos de questões.

## Tecnologias

- **Next.js** (React + Node.js)
- **Prisma ORM** + PostgreSQL/MySQL
- **JWT** (autenticação) e **bcryptjs** (hash de senhas)

## Estrutura do projeto

```
prisma/               esquema do banco (schema.prisma)
src/
  app/                rotas e páginas (Next.js App Router)
    (auth)/login       tela de login
    (dashboard)/       dashboard, bancos de questões, turmas, avaliações
    api/               rotas de API (backend)
  server/
    controllers/       tratam a requisição/resposta HTTP
    services/          regras de negócio
    repositories/      acesso ao banco via Prisma
    middlewares/        autenticação JWT
    lib/               prisma client, jwt, bcrypt
  components/          componentes de UI por módulo
  hooks/               hooks customizados (useState/useEffect)
  types/               tipos compartilhados
  utils/               utilitários (ex: embaralhamento de questões)
docs/
  relatorio-tecnico/   relatório técnico e decisões de projeto
  mer/                 diagramas de modelagem (MER)
```

## Módulos

1. **Acesso e Visão Geral** — login e dashboard com estatísticas.
2. **Banco de Questões** — criação e organização do acervo de perguntas.
3. **Gestão de Turmas e Alunos** — turmas, matrículas e gerenciamento de alunos.
4. **Elaboração de Avaliações** — montagem de provas/listas a partir dos bancos de questões, com ordem fixa ou aleatória.

## Como rodar

```bash
npm install
cp .env.example .env   # configurar DATABASE_URL e JWT_SECRET
npx prisma migrate dev
npm run dev
```
