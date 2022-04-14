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
                showPokemon(pokemon);
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

            $("#modalPokemon").modal('show');
        });
}

const showPokemon = (pokemon) => {
    $('#pokedex').append(`
                <div class='card card_${pokemon.name} col-6 m-5'>
                    <div class="header"><h5 class='card-title'>${pokemon.name}</h5></div>
                        <div class='card-body'>
                            <div class = "div-img-card ">
                                <img src="" id="img_${pokemon.name}" class = "img-card">
                            </div>
                            <div >
                                <ul id = "pokemonAbilitiesCard_${pokemon.name}" ></ul>
                                <ul id = "pokemonWeightCard_${pokemon.name}" ></ul>
                            </div>
                        </div>
                    <button type="button"  class ="btn btn-primary btnGetDataPokemon" data-toggle="modal" data-target="#modalPokemon" data-url-pokemon = "${pokemon.url}">Quiero saber más de </button>
                </div>
    `)

    getPhoto(pokemon.url, pokemon.name)
    cardInfo(pokemon.url, pokemon.name)
}

const cardInfo = (url, name) => {

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        $(`#pokemonAbilitiesCard_${name}`).append(`<li>Habilidad: ${data.abilities[0].ability.name}</li>`);
        $(`#pokemonWeightCard_${name}`).append(`<li> Peso: ${data.weight}</li>`);

        console.log(data.types[0].type.name)
        if(data.types[0].type.name === 'grass' || data.types[0].type.name === 'bug' ){
            $(`.card_${name}`).css('background-color', 'green')
        }
    });
}