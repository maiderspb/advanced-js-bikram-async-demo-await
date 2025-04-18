//DESARROLLA AQUI TUS SOLUCIONES
async function getRandomPokemon() {
  const maxPokemonId = 1010;
  while (true) {
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      if (!response.ok) continue;
      const pokemon = await response.json();
      if (!pokemon || !pokemon.name) continue;
      return pokemon;
    } catch (error) {
      console.error(
        `Error al obtener Pokémon con ID ${randomId}:`,
        error.message
      );
    }
  }
}
async function getImageAndName(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`No se encontró el Pokémon con ID ${id}`);
    }

    const data = await response.json();

    const name = data.name;
    const img = data.sprites.front_default;

    return { name, img };
  } catch (error) {
    console.error("Error al obtener imagen y nombre:", error.message);
    return null;
  }
}

function printImageAndName(pokemon) {
  const name = pokemon?.name || "Desconocido";
  const img = pokemon?.img || "https://via.placeholder.com/150?text=No+Image";

  return `
        <section>
          <img src="${img}" alt="${name}">
          <h1>${name}</h1>
        </section>
      `;
}

async function getRandomDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");

    if (!response.ok) {
      throw new Error("No se pudo obtener la imagen del perrito");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error al obtener perrito:", error.message);
    return "https://via.placeholder.com/150?text=No+Dog";
  }
}

async function getRandomPokemonImage() {
  const maxPokemonId = 1010;

  while (true) {
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1;

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );

      if (!response.ok) continue;

      const data = await response.json();

      const img = data.sprites.front_default;

      if (img) {
        return img;
      }
    } catch (error) {
      console.error(`Error al obtener imagen del Pokémon:`, error.message);
    }
  }
}

async function printPugVsPikachu() {
  try {
    const dogRes = await fetch("https://dog.ceo/api/breed/pug/images/random");
    const dogData = await dogRes.json();
    const pugImg = dogData.message;

    const pokeRes = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pokeData = await pokeRes.json();
    const pikachuImg = pokeData.sprites.front_default;

    const html = `
          <section style="display: flex; gap: 2rem; justify-content: center; align-items: center; text-align: center;">
            <div>
              <img src="${pugImg}" alt="Pug" width="150">
              <h1>Pug</h1>
            </div>
            <h2>VS</h2>
            <div>
              <img src="${pikachuImg}" alt="Pikachu" width="150">
              <h1>Pikachu</h1>
            </div>
          </section>
        `;

    document.body.innerHTML += html;
  } catch (error) {
    console.error("Error en la batalla Pug vs Pikachu:", error.message);
  }
}

printPugVsPikachu();

async function getRandomCharacter() {
  const maxCharacters = 826;
  const randomId = Math.floor(Math.random() * maxCharacters) + 1;

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${randomId}`
    );

    if (!response.ok) {
      throw new Error(`No se pudo obtener el personaje con ID ${randomId}`);
    }

    const character = await response.json();
    return character;
  } catch (error) {
    console.error("Error al obtener personaje aleatorio:", error.message);
    return null;
  }
}
async function getRandomCharacterInfo() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    const characters = data.results;
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];

    const { name, image, episode } = randomCharacter;

    const firstEpisodeUrl = episode[0];
    const firstEpisodeResponse = await fetch(firstEpisodeUrl);
    const firstEpisodeData = await firstEpisodeResponse.json();

    const firstEpisode = firstEpisodeData.name;
    const dateEpisode = firstEpisodeData.air_date;

    return {
      img: image,
      name: name,
      episodes: episode,
      firstEpisode: firstEpisode,
      dateEpisode: dateEpisode,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
