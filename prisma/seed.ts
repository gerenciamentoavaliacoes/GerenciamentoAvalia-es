import { PrismaClient, TipoQuestao, TipoAvaliacao } from "@prisma/client";
import { hashSenha } from "../src/server/lib/bcrypt";

const prisma = new PrismaClient();

const ALUNOS = [
  { nome: "Maria Silva", matricula: "2023001", email: "maria.silva@aluno.uepb.edu.br" },
  { nome: "João Pereira", matricula: "2023002", email: "joao.pereira@aluno.uepb.edu.br" },
  { nome: "Ana Beatriz Souza", matricula: "2023003", email: "ana.souza@aluno.uepb.edu.br" },
  { nome: "Pedro Henrique Lima", matricula: "2023004", email: "pedro.lima@aluno.uepb.edu.br" },
  { nome: "Larissa Costa", matricula: "2023005", email: "larissa.costa@aluno.uepb.edu.br" },
  { nome: "Gabriel Santos", matricula: "2023006", email: "gabriel.santos@aluno.uepb.edu.br" },
  { nome: "Camila Oliveira", matricula: "2023007", email: "camila.oliveira@aluno.uepb.edu.br" },
  { nome: "Lucas Almeida", matricula: "2023008", email: "lucas.almeida@aluno.uepb.edu.br" },
  { nome: "Beatriz Ferreira", matricula: "2023009", email: "beatriz.ferreira@aluno.uepb.edu.br" },
  { nome: "Rafael Carvalho", matricula: "2023010", email: "rafael.carvalho@aluno.uepb.edu.br" },
  { nome: "Juliana Rocha", matricula: "2023011", email: "juliana.rocha@aluno.uepb.edu.br" },
  { nome: "Matheus Barbosa", matricula: "2023012", email: "matheus.barbosa@aluno.uepb.edu.br" },
  { nome: "Fernanda Ribeiro", matricula: "2023013", email: "fernanda.ribeiro@aluno.uepb.edu.br" },
  { nome: "Bruno Cardoso", matricula: "2023014", email: "bruno.cardoso@aluno.uepb.edu.br" },
  { nome: "Isabela Martins", matricula: "2023015", email: "isabela.martins@aluno.uepb.edu.br" },
  { nome: "Thiago Gomes", matricula: "2023016", email: "thiago.gomes@aluno.uepb.edu.br" },
];

const BANCOS = [
  {
    nome: "Estruturas de Dados",
    questoes: [
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "Explique a diferença entre pilha (stack) e fila (queue).",
        peso: 2,
        gabarito: "Pilha é LIFO (último a entrar, primeiro a sair); fila é FIFO (primeiro a entrar, primeiro a sair).",
      },
      {
        tipo: TipoQuestao.MULTIPLA_ESCOLHA,
        enunciado: "Qual estrutura de dados utiliza o princípio LIFO?",
        peso: 1,
        gabarito: "Pilha",
      },
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "Descreva o funcionamento de uma lista duplamente encadeada.",
        peso: 2,
        gabarito: "Cada nó possui ponteiros para o próximo e para o anterior, permitindo percurso nos dois sentidos.",
      },
      {
        tipo: TipoQuestao.MULTIPLA_ESCOLHA,
        enunciado: "Qual a complexidade de busca em uma árvore binária de busca balanceada?",
        peso: 1.5,
        gabarito: "O(log n)",
      },
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "O que é uma tabela hash e como ela trata colisões?",
        peso: 2.5,
        gabarito: "Estrutura que mapeia chaves a posições via função hash; colisões podem ser tratadas por encadeamento ou endereçamento aberto.",
      },
    ],
  },
  {
    nome: "Banco de Dados",
    questoes: [
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "Explique a diferença entre um relacionamento 1:N e N:N.",
        peso: 2,
        gabarito: "1:N: um registro de uma tabela se relaciona com vários de outra. N:N: exige tabela intermediária, pois vários registros de ambos os lados se relacionam entre si.",
      },
      {
        tipo: TipoQuestao.MULTIPLA_ESCOLHA,
        enunciado: "No Prisma, qual comando aplica uma nova migration ao banco de dados?",
        peso: 1,
        gabarito: "npx prisma migrate dev",
      },
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "O que é normalização de dados e qual seu principal objetivo?",
        peso: 2,
        gabarito: "Processo de organizar colunas e tabelas para reduzir redundância e evitar anomalias de atualização.",
      },
      {
        tipo: TipoQuestao.MULTIPLA_ESCOLHA,
        enunciado: "Qual cláusula SQL é usada para filtrar resultados de uma consulta?",
        peso: 1,
        gabarito: "WHERE",
      },
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "Explique o que é uma chave estrangeira (foreign key).",
        peso: 1.5,
        gabarito: "Campo que referencia a chave primária de outra tabela, garantindo integridade referencial.",
      },
    ],
  },
  {
    nome: "JavaScript e TypeScript",
    questoes: [
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "Qual a diferença entre 'let', 'const' e 'var' em JavaScript?",
        peso: 1.5,
        gabarito: "'var' tem escopo de função e é reatribuível; 'let' tem escopo de bloco e é reatribuível; 'const' tem escopo de bloco e não pode ser reatribuída.",
      },
      {
        tipo: TipoQuestao.MULTIPLA_ESCOLHA,
        enunciado: "Qual hook do React é usado para efeitos colaterais e carga assíncrona de dados?",
        peso: 1,
        gabarito: "useEffect",
      },
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "O que o TypeScript adiciona ao JavaScript?",
        peso: 2,
        gabarito: "Tipagem estática opcional, interfaces e verificação de tipos em tempo de compilação.",
      },
      {
        tipo: TipoQuestao.MULTIPLA_ESCOLHA,
        enunciado: "Qual método transforma um array aplicando uma função a cada elemento?",
        peso: 1,
        gabarito: "map",
      },
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "Explique o conceito de closure em JavaScript.",
        peso: 2,
        gabarito: "Função que mantém acesso ao escopo léxico em que foi criada, mesmo executada fora dele.",
      },
      {
        tipo: TipoQuestao.MULTIPLA_ESCOLHA,
        enunciado: "Qual palavra-chave declara uma função assíncrona?",
        peso: 1,
        gabarito: "async",
      },
    ],
  },
  {
    nome: "Redes e HTTP",
    questoes: [
      {
        tipo: TipoQuestao.MULTIPLA_ESCOLHA,
        enunciado: "Qual código de status HTTP indica que um recurso foi criado com sucesso?",
        peso: 1,
        gabarito: "201",
      },
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "Explique a diferença entre os métodos HTTP PUT e PATCH.",
        peso: 2,
        gabarito: "PUT substitui o recurso inteiro; PATCH aplica uma atualização parcial.",
      },
      {
        tipo: TipoQuestao.MULTIPLA_ESCOLHA,
        enunciado: "Qual cabeçalho HTTP é usado para autenticação via token Bearer?",
        peso: 1,
        gabarito: "Authorization",
      },
      {
        tipo: TipoQuestao.DISCURSIVA,
        enunciado: "O que é CORS e por que ele existe?",
        peso: 2,
        gabarito: "Mecanismo do navegador que restringe requisições entre origens diferentes por segurança, controlado por cabeçalhos do servidor.",
      },
    ],
  },
];

const TURMAS = [
  {
    nome: "Programação Web",
    codigo: "CCT-101",
    periodo: "2026.1",
    alunos: ALUNOS.slice(0, 9),
  },
  {
    nome: "Estrutura de Dados",
    codigo: "CCT-205",
    periodo: "2026.1",
    alunos: [...ALUNOS.slice(0, 3), ...ALUNOS.slice(9, 13)],
  },
  {
    nome: "Banco de Dados",
    codigo: "CCT-310",
    periodo: "2025.2",
    alunos: ALUNOS.slice(11, 16),
  },
];

async function main() {
  const email = "professor@uepb.edu.br";
  const senha = "123456";

  const professor = await prisma.professor.upsert({
    where: { email },
    update: {},
    create: {
      nome: "Professor Demo",
      email,
      senhaHash: await hashSenha(senha),
    },
  });

  // Reseta os dados de exemplo (mantendo o professor) para permitir rodar o seed várias vezes.
  await prisma.participanteAvaliacao.deleteMany({});
  await prisma.avaliacao.deleteMany({ where: { turma: { professorId: professor.id } } });
  await prisma.matricula.deleteMany({ where: { turma: { professorId: professor.id } } });
  await prisma.aluno.deleteMany({});
  await prisma.questao.deleteMany({ where: { banco: { professorId: professor.id } } });
  await prisma.bancoQuestoes.deleteMany({ where: { professorId: professor.id } });
  await prisma.turma.deleteMany({ where: { professorId: professor.id } });

  const bancosCriados: Record<string, { id: string; questoesIds: string[] }> = {};

  for (const banco of BANCOS) {
    const registro = await prisma.bancoQuestoes.create({
      data: { nome: banco.nome, professorId: professor.id },
    });

    const questoesIds: string[] = [];
    for (const questao of banco.questoes) {
      const q = await prisma.questao.create({
        data: { ...questao, bancoId: registro.id },
      });
      questoesIds.push(q.id);
    }

    bancosCriados[banco.nome] = { id: registro.id, questoesIds };
  }

  const alunosCriados: Record<string, string> = {};

  const turmasCriadas: Record<string, { id: string; alunosIds: string[] }> = {};

  for (const turma of TURMAS) {
    const registro = await prisma.turma.create({
      data: {
        nome: turma.nome,
        codigo: turma.codigo,
        periodo: turma.periodo,
        professorId: professor.id,
      },
    });

    const alunosIds: string[] = [];
    for (const aluno of turma.alunos) {
      let alunoId = alunosCriados[aluno.matricula];
      if (!alunoId) {
        const alunoRegistro = await prisma.aluno.create({ data: aluno });
        alunoId = alunoRegistro.id;
        alunosCriados[aluno.matricula] = alunoId;
      }

      await prisma.matricula.create({
        data: { turmaId: registro.id, alunoId },
      });
      alunosIds.push(alunoId);
    }

    turmasCriadas[turma.nome] = { id: registro.id, alunosIds };
  }

  const daquiA = (dias: number, hora: string) => new Date(`2026-08-${String(dias).padStart(2, "0")}T${hora}:00`);

  await prisma.avaliacao.create({
    data: {
      titulo: "Prova 1 - Fundamentos de JavaScript e TypeScript",
      tipo: TipoAvaliacao.PROVA,
      dataInicio: daquiA(4, "08:00"),
      dataTermino: daquiA(4, "10:00"),
      ordemAleatoria: true,
      turmaId: turmasCriadas["Programação Web"].id,
      questoes: {
        connect: bancosCriados["JavaScript e TypeScript"].questoesIds
          .slice(0, 4)
          .map((id) => ({ id })),
      },
      participantes: {
        create: turmasCriadas["Programação Web"].alunosIds.map((alunoId) => ({ alunoId })),
      },
    },
  });

  await prisma.avaliacao.create({
    data: {
      titulo: "Lista de Exercícios 1 - Estruturas de Dados",
      tipo: TipoAvaliacao.LISTA_EXERCICIOS,
      dataInicio: daquiA(10, "00:00"),
      dataTermino: daquiA(17, "23:59"),
      ordemAleatoria: false,
      turmaId: turmasCriadas["Estrutura de Dados"].id,
      questoes: {
        connect: bancosCriados["Estruturas de Dados"].questoesIds
          .slice(0, 3)
          .map((id) => ({ id })),
      },
      participantes: {
        create: turmasCriadas["Estrutura de Dados"].alunosIds.map((alunoId) => ({ alunoId })),
      },
    },
  });

  await prisma.avaliacao.create({
    data: {
      titulo: "Prova 1 - Modelagem e SQL",
      tipo: TipoAvaliacao.PROVA,
      dataInicio: daquiA(6, "14:00"),
      dataTermino: daquiA(6, "16:00"),
      ordemAleatoria: true,
      turmaId: turmasCriadas["Banco de Dados"].id,
      questoes: {
        connect: bancosCriados["Banco de Dados"].questoesIds.slice(0, 4).map((id) => ({ id })),
      },
      participantes: {
        create: turmasCriadas["Banco de Dados"].alunosIds.map((alunoId) => ({ alunoId })),
      },
    },
  });

  console.log("Professor de teste pronto para login:");
  console.log({ email, senha, id: professor.id });
  console.log(`Bancos criados: ${BANCOS.length}`);
  console.log(`Questões criadas: ${BANCOS.reduce((acc, b) => acc + b.questoes.length, 0)}`);
  console.log(`Turmas criadas: ${TURMAS.length}`);
  console.log(`Alunos únicos matriculados: ${Object.keys(alunosCriados).length}`);
  console.log("Avaliações criadas: 3");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
