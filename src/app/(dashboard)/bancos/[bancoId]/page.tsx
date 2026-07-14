export default function BancoEspecificoPage({ params }: { params: { bancoId: string } }) {
  return (
    <section>
      <h1>Banco de Questões #{params.bancoId}</h1>
      {/* Lista de questões do acervo + botão para nova questão */}
    </section>
  );
}
