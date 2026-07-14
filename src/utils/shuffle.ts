function criarGeradorSeed(seed: number) {
  let estado = seed % 2147483647;
  if (estado <= 0) estado += 2147483646;

  return () => {
    estado = (estado * 16807) % 2147483647;
    return (estado - 1) / 2147483646;
  };
}

export function embaralhar<T>(itens: T[], seed: number): T[] {
  const aleatorio = criarGeradorSeed(seed);
  const resultado = [...itens];

  for (let i = resultado.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
  }

  return resultado;
}
