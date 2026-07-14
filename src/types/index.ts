export type TipoQuestao = "DISCURSIVA" | "MULTIPLA_ESCOLHA";
export type TipoAvaliacao = "PROVA" | "LISTA_EXERCICIOS";

export interface Professor {
  id: string;
  nome: string;
  email: string;
}

export interface Turma {
  id: string;
  nome: string;
  codigo: string;
  periodo: string;
}

export interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  email: string;
}

export interface BancoQuestoes {
  id: string;
  nome: string;
}

export interface Questao {
  id: string;
  bancoId: string;
  tipo: TipoQuestao;
  enunciado: string;
  peso: number;
  gabarito: string;
}

export interface Avaliacao {
  id: string;
  titulo: string;
  tipo: TipoAvaliacao;
  dataInicio: string;
  dataTermino: string;
  ordemAleatoria: boolean;
  turmaId: string;
}
