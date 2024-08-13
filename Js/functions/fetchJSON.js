export async function fetchJSON() {
  try {
    let data = await fetch("./data/questions.json");

    let dados = await data.json();
    return dados.slice(0, 10);
  } catch (error) {
    console.log(error);
  }
}
