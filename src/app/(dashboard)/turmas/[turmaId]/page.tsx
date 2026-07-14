export default function TurmaEspecificaPage({ params }: { params: { turmaId: string } }) {
  return (
    <section>
      <h1>Turma #{params.turmaId}</h1>
      {/* Lista de avaliações da turma + botões "Gerenciar Alunos" e "Criar Nova Avaliação" */}
    </section>
  );
}
