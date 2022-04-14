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
                            <div class = "div-img-card div_${pokemon.name}">
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
        $(`.card_${name}`).append(`<h5>${data.id}</h5>`)
        const typeColor = (type, colorCard, colorDiv) =>{
            if(data.types[0].type.name === type){
                $(`.card_${name}`).css('background-color', colorCard)
                $(`.div_${name}`).css('background-color', colorDiv)
            }
        }
        typeColor('grass', '#47A737', '#88B881')
        typeColor('bug', '#47A737', '#88B881')
        typeColor('fire', '#DE5F2C', '#E58158')
        typeColor('water', '#464FD6', '#6F76E5')
        typeColor('ice', '#464FD6', '#6F76E5')
        typeColor('normal', '#D4A97C', '#FFE1C0')
        typeColor('flying', '#D4A97C', '#FFE1C0')
        typeColor('ground',  '#B87A25', '#DABD97')
        typeColor('rock',  '#B87A25', '#DABD97')
        typeColor('fighting', '#B87A25', '#DABD97')
        typeColor('steel', '5D5D5C', '#CA6AE1')
        typeColor('dark', '#181108', '#949391')
        typeColor('dragon', 'A28E12', 'A59E6F')
        typeColor('fairy','#C63F83', '#CF8BAD')
        typeColor('shadow', '', '')
        typeColor('poison', '#B528D8', '#CA6AE1')
        typeColor('psychic', '#B528D8', '#CA6AE1')
        typeColor('ghost', '#B528D8', '#CA6AE1')
        typeColor('electric', '#DCBE01', '#E5D468')
        console.log(data.types[0].type.name)
       
      
    });
}