# Avalia+ · Plataforma de Gerenciamento de Avaliações

Trabalho Final da disciplina de Programação Web (2026.1) — Universidade Estadual da Paraíba.

Sistema para auxiliar professores na criação e organização de provas e listas de exercícios, com gestão de turmas, matrículas de alunos e bancos de questões.

## Tecnologias

- **Next.js** (React + Node.js, App Router)
- **Prisma ORM** + PostgreSQL
- **JWT** (autenticação) e **bcryptjs** (hash de senhas)
- **Tailwind CSS** + **lucide-react** (ícones) — design system próprio em `src/components/ui`

## Estrutura do projeto

```
prisma/
  schema.prisma        modelagem do banco e relacionamentos (inclusive N:M Avaliação↔Questão)
  seed.ts              dados de exemplo (professor, bancos, questões, turmas, alunos, avaliações)
src/
  app/                 rotas e páginas (Next.js App Router)
    icon.svg           favicon / marca (monograma "Avalia+")
    (auth)/login       tela de login
    (dashboard)/       dashboard, bancos de questões, turmas, avaliações
    api/               rotas de API (backend)
  server/
    controllers/       tratam a requisição/resposta HTTP
    services/          regras de negócio
    repositories/      acesso ao banco via Prisma
    middlewares/        autenticação JWT
    lib/               prisma client, jwt, bcrypt
  components/
    ui/                design system (Button, Card, Field, Badge, Switch, Logo, EmptyState...)
  hooks/               hooks customizados (useState/useEffect) por módulo
  types/               tipos compartilhados
  utils/               utilitários (auth storage, fetch autenticado, embaralhamento de questões)
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
cp .env.example .env       # configurar DATABASE_URL e JWT_SECRET

# banco local via Docker (ou aponte DATABASE_URL para um Postgres existente)
docker run --name gerenciamento-avaliacoes-db \
  -e POSTGRES_USER=app -e POSTGRES_PASSWORD=app -e POSTGRES_DB=gerenciamento_avaliacoes \
  -p 55432:5432 -d postgres:16-alpine

npx prisma migrate dev     # cria as tabelas
npx prisma db seed         # popula professor, bancos, questões, turmas e alunos de exemplo
npm run dev
```

Acesse `http://localhost:3000` e entre com o professor criado pelo seed:

- **E-mail:** `professor@uepb.edu.br`
- **Senha:** `123456`
