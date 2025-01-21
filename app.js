// Define a função assíncrona que vai buscar informações do Pokémon
async function fetchPokemon() { 
    // Pega o nome do Pokémon digitado pelo usuário e transforma em minúsculas
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    // Define a variável para armazenar o container onde os dados do Pokémon serão mostrados
    const pokemonContainer = document.getElementById('pokemon-container');
    
    try {
        // Faz a requisição à API para obter os dados do Pokémon, usando o nome fornecido
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        // Se a resposta não for OK (código de status diferente de 2xx), lança um erro
        if (!response.ok) {
            throw new Error('Pokémon não encontrado!');
        }
        
        // Converte a resposta da API para o formato JSON
        const pokemonData = await response.json();
        
        // Cria o HTML para exibir os tipos do Pokémon (exemplo: "fogo", "água")
        const typesHTML = pokemonData.types
            .map(type => `<span class="type type-${type.type.name}">${type.type.name}</span>`) // Para cada tipo, cria um <span> com o nome do tipo
            .join(''); // Junta todos os <span> em uma string única

        // Atualiza o conteúdo HTML do container com as informações do Pokémon
        pokemonContainer.innerHTML = `
            <div class="pokemon-card"> <!-- Cria um cartão para o Pokémon -->
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"> <!-- Exibe a imagem do Pokémon -->
                <h2>${pokemonData.name}</h2> <!-- Exibe o nome do Pokémon -->
                <p><strong>Altura:</strong> ${pokemonData.height / 10} m</p> <!-- Exibe a altura do Pokémon em metros -->
                <p><strong>Peso:</strong> ${pokemonData.weight / 10} kg</p> <!-- Exibe o peso do Pokémon em quilogramas -->
                <div class="types">${typesHTML}</div> <!-- Exibe os tipos do Pokémon (como "fogo", "água", etc.) -->
            </div>
        `;
    } catch (error) {
        // Se ocorrer algum erro (por exemplo, o Pokémon não for encontrado), exibe a mensagem de erro
        pokemonContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

// Adiciona um evento de clique no botão com id 'fetchPokemon'. Quando o botão for clicado, chama a função fetchPokemon.
document.getElementById('fetchPokemon').addEventListener('click', fetchPokemon);
