$(document).ready(function () {

    const urlPokemons = 'https://pokeapi.co/api/v2/pokemon/';

    getPokemons(urlPokemons);

    $('#getMorePokemons').click(function () {
        const urlNext = $(this).attr('nextPageUrl');
        getPokemons(urlNext);
    });
    console.log('hola')
    
    
});

const getPokemons = (url) => {
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const pokemons = data.results;
        const urlMorePokemons = data.next;

        $('#getMorePokemons').attr('nextPageUrl', urlMorePokemons);
        pokemons.forEach(function (pokemon) {
            showPokemon(pokemon);
        });

        $('.btnGetDataPokemon').click(function () {
            const urlPokemon = $(this).attr('data-url-pokemon');
            getPokemonData(urlPokemon);
        });
        
      
    });
    
};

const getPhoto = (url, name) => {
    console.log('obteniendo fotos ' + url)
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            $(`#img_${name}`).attr("src", data.sprites.other.dream_world.front_default);
        });
}

const getPokemonData = (url) => {
    console.log('obteniendo datos desde' + url);

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            $('#modalPokemonLabel').text(data.name);

            console.log("PokemonData", data);

            $('#pokemonAbilities').text('');
            $('#pokemonMoves').text('');

    
            data.abilities.forEach(function (ability) {
                $('#pokemonAbilities').append(`<li>${ability.ability.name}</li>`);
            });
        
            $('#pokemonMoves').append(`<li>${data.moves[0].move.name}</li>`);
         

            $("#modalPokemon").modal("show");
        });

}


const showPokemon = (pokemon) => {

    $('#pokedex').append(`
        
            <div class='card col-6'>
                <div class='card-body'>
                    <h4 class='card-title'>${pokemon.name}</h4>
                    <div class = "d-inline-block">
                        <img src="" id="img_${pokemon.name}" class = "img-card">
                    </div>
                    <div class = "d-inline-block">
                        <ul>
                            <li> "Weight : ${pokemon.name.height}" </li>
                            <li> "Ability : ${pokemon.name.ability}" </li>
                        </ul>   
                        <a href = "pokemon.html" class = "btnGetDataPokemon" >
                            <button class ="btn btn-primary " >¡mas info!</button> 
                        </a>
                    </div>
                </div>
            </div>
           
    `);
    getPhoto(pokemon.url, pokemon.name);
}

const showPokemonData = (pokemon) => {

    $('#pokemonData').append(`
        
    <div>
        <img id = "img_${pokemon.name}" class = "w-100">
    </div>
    
           
    `);
    getPhoto(pokemon.url, pokemon.name);
    
}
