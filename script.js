async function getRandomCharacterInfo() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    const characters = data.results;
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];
    const { name, image, episode } = randomCharacter;
    if (!episode || episode.length === 0) {
      throw new Error("El personaje no tiene episodios.");
    }
    const firstEpisodeUrl = episode[0];
    const firstEpisodeResponse = await fetch(firstEpisodeUrl);
    const firstEpisodeData = await firstEpisodeResponse.json();
    const firstEpisode = firstEpisodeData.name;
    const dateEpisode = firstEpisodeData.air_date;
    return {
      img: image,
      name: name,
      episodes: episode.length,
      firstEpisode: firstEpisode,
      dateEpisode: dateEpisode,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
function paintCharacterInfo(characterInfo) {
  const characterSection = document.getElementById("characterInfo");
  characterSection.innerHTML = "";
  if (characterInfo) {
    const img = document.createElement("img");
    img.src = characterInfo.img;
    img.alt = characterInfo.name;
    const name = document.createElement("h1");
    name.textContent = characterInfo.name;
    const episodes = document.createElement("p");
    episodes.textContent = `Número de episodios: ${characterInfo.episodes}`;
    const firstEpisode = document.createElement("p");
    firstEpisode.textContent = `Primer episodio: ${characterInfo.firstEpisode}`;
    const dateEpisode = document.createElement("p");
    dateEpisode.textContent = `Fecha de estreno: ${characterInfo.dateEpisode}`;
    characterSection.appendChild(img);
    characterSection.appendChild(name);
    characterSection.appendChild(episodes);
    characterSection.appendChild(firstEpisode);
    characterSection.appendChild(dateEpisode);
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "No se pudo obtener la información del personaje.";
    characterSection.appendChild(errorMessage);
  }
}
document
  .getElementById("loadCharacterBtn")
  .addEventListener("click", async () => {
    const characterInfo = await getRandomCharacterInfo();
    paintCharacterInfo(characterInfo);
  });
