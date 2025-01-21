async function fetchPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const pokemonContainer = document.getElementById('pokemon-container');
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
            throw new Error('Pokémon não encontrado!');
        }
        
        const pokemonData = await response.json();
        
        // Cria o HTML da carta do Pokémon
        const typesHTML = pokemonData.types
            .map(type => `<span class="type type-${type.type.name}">${type.type.name}</span>`)
            .join('');
        
        pokemonContainer.innerHTML = `
            <div class="pokemon-card">
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <h2>${pokemonData.name}</h2>
                <p><strong>Altura:</strong> ${pokemonData.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemonData.weight / 10} kg</p>
                <div class="types">${typesHTML}</div>
            </div>
        `;
    } catch (error) {
        pokemonContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// Adiciona o evento de clique ao botão
document.getElementById('fetchPokemon').addEventListener('click', fetchPokemon);
