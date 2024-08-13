export async function fetchJSON() {
  try {
    let data = await fetch("./data/questions.json");

    let dados = await data.json();
    return dados;
  } catch (error) {
    console.log(error);
  }
}
