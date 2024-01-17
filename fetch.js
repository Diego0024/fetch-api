const BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

const updatePokemonCard = (pokemon) => {
    const pokemonNameElement = document.getElementById('pokemon-name');
    const pokemonImageElement = document.getElementById('pokemon-image');
    const pokemonInfoElement = document.getElementById('pokemon-info');

    // Limpiar el contenido anterior
    pokemonInfoElement.innerHTML = '';

    // Actualizar nombre y tipos
    const nameElement = document.createElement('p');
    nameElement.textContent = `Name: ${pokemon.name}`;
    pokemonInfoElement.appendChild(nameElement);

    const typesElement = document.createElement('p');
    typesElement.textContent = `Types: ${pokemon.types.map(type => type.type.name).join(', ')}`;
    pokemonInfoElement.appendChild(typesElement);

    // Actualizar habilidades
    const abilitiesElement = document.createElement('p');
    abilitiesElement.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;
    pokemonInfoElement.appendChild(abilitiesElement);

    // Agregar poder de ataque
    const attackElement = document.createElement('p');
    attackElement.textContent = `Attack: ${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}`;
    pokemonInfoElement.appendChild(attackElement);

    // Actualizar imagen
    pokemonImageElement.src = pokemon.sprites.front_default;
};


document.getElementById('get-btn').addEventListener('click', async () => {
    const text = document.getElementById('poke-name').value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    localStorage.setItem('currentPokeId', pokemon.id);
    updatePokemonCard(pokemon);
});

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    updatePokemonCard(pokemon);
});

document.getElementById('previous-btn').addEventListener('click', async () => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = Math.max(1, currentPokeId - 1);
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('currentPokeId', newId);
    updatePokemonCard(pokemon);
});

document.getElementById('next-btn').addEventListener('click', async () => {
    const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
    const newId = currentPokeId + 1;
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('currentPokeId', newId);
    updatePokemonCard(pokemon);
});

// POST request example
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
})
    .then(res => res.json())
    .then(json => console.log(json));

    /////////////////// EJERCICIOS
//- Arreglar el pokemon en localStorage
// - Manipular el DOM y agregar una tarjeta del pokemon.
// - El tamaño e info de la tarjeta es a consideración personal.
// - La tarjeta debe mantenerse en la pantalla.
// - La info -> LocalStorage -> Fetch

