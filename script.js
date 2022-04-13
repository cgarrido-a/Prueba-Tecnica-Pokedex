$(document).ready(function () {
  

    const urlPokemons = 'https://pokeapi.co/api/v2/pokemon/';

    
    getPokemons(urlPokemons);
    
    $('#getMorePokemons').click(function () {
        const urlNext = $(this).attr('nextPageUrl');
        getPokemons(urlNext);
    });
    
   
});

const getPhoto = (url, name) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            $(`#img_${name}`).attr("src", data.sprites.other.dream_world.front_default);
        });
}

const getPokemons = (url) => {


    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const pokemons = data.results;
            const urlMorePokemons = data.next;

            $('#getMorePokemons').attr('nextPageUrl', urlMorePokemons);

            pokemons.forEach(function (pokemon) {
                showPokemon(pokemon, pokemon.url);
                console.log(pokemon.url)
            });            

            $('.btnGetDataPokemon').click(function () {
                const urlPokemon = $(this).attr('data-url-pokemon');
                getPokemonData(urlPokemon);
                
            });
        });
};

const getPokemonData = (url) => {

    
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            $('#modalPokemonLabel').text(data.name);
            $('#pokemonAbilities').text('');
            $('#pokemonMoves').text('');
            $('#pokemonWeight').text('');
            $('#pokemonBaseExperience').text('');
               
            $('#pokemonAbilities').append(`<li>${data.abilities[0].ability.name}</li>`);
       
            $('#pokemonMoves').append(`<li>${data.moves[0].move.name}</li>`);

            $('#pokemonWeight').append(`<li>${data.weight}</li>`);

            $('#pokemonBaseExperience').append(`<li>${data.base_experience}</li>`);
         
            $("#modalPokemon").modal("show");
         
        });

}



const showPokemon = (pokemon, url) => {

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            $('#pokedex').append(`
            <div class='card col-6'>
                <div class='card-body'>
                    <h5 class='card-title'>${pokemon.name}</h5>
                    <div class = "d-inline-block">
                        <img src="" id="img_${pokemon.name}" class = "img-card">
                    </div>
                    <div id="datosCard" class="d-inline-block">
                        <p>Peso: <ul><li>${data.weight}</li></ul> </p>
                        <p>Habilidad: <ul><li>${data.abilities[0].ability.name}</li></ul> </p>
                    </div>
                    <button class ="btn btn-primary btnGetDataPokemon" data-url-pokemon = "${pokemon.url}">¡Quiero saber más de este pokémon!</button>
                </div>
            </div>
            `);
});

    
getPhoto(pokemon.url, pokemon.name)
    
}