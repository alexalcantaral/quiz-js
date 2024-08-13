function verificarUpdateQuestions() {
  let lastUpdate = localStorage.getItem("lastUpdate");
  if (lastUpdate !== null) {
    let stringDataAtual = new Date().toISOString();
    let diferencaHoras =
      (new Date(stringDataAtual) - new Date(lastUpdate)) / (1000 * 60 * 60);

    if (diferencaHoras >= 24) {
      return { update: true };
    }
    return { update: false, diferencaHoras };
  }

  return { update: true };
}

export default verificarUpdateQuestions;
