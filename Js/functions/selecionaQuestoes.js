function selecionaQuestoes(questoes, questoesRespondidas) {
  let arrayFiltro = questoes.filter((questao) => {
    return !questoesRespondidas.some(
      (questaoRespondida) => questaoRespondida.id === questao.id
    );
  });
  return arrayFiltro.slice(0, 10);
}

export default selecionaQuestoes;
