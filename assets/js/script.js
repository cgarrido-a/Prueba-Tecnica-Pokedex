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
            $(`#img_modal_${name}`).attr("src", data.sprites.other.dream_world.front_default);
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
            $('#img-modal').text('')
          
            $('#pokemonAbilities').append(data.abilities[0].ability.name);
            $('#pokemonMoves').append(data.moves[0].move.name);
            $('#pokemonWeight').append(data.weight);
            $('#pokemonBaseExperience').append(data.base_experience);

            $('#img-modal').append(` <img src = "" id="img_modal_${data.name}" class = "img-modal">`)

            $("#modalPokemon").modal('show');
            getPhoto(url, data.name)
        });
  
}

const showPokemon = (pokemon) => {
    $('#pokedex').append(`
        <div class='card card_${pokemon.name} col-6 m-5'>
            <div class='card-body'>
                <h5 class='card-title'>${pokemon.name}</h5>
                <div class = "div-img-card div_${pokemon.name}">
                    <img src="" id="img_${pokemon.name}" class = "img-card">
                </div>
                <table class = "table table-sm table-card-data card-data">
                    <thead class = 'thead-dark '>
                        <tr>
                            <th>Habilidad</th>
                            <th>Peso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id = "pokemonAbilitiesCard_${pokemon.name}" class = "card-data" ></td>
                            <td id = "pokemonWeightCard_${pokemon.name}" class = "card-data" ></td>
                        </tr>
                    </body>    
                </table>
            </div>
            <div class ="d-flex justify-content-center">
                <button type="button"  class ="btn btnGetDataPokemon" data-url-pokemon = "${pokemon.url}">Quiero saber más de </button>
            </div>
        
            
        </div>
    `)

    getPhoto(pokemon.url, pokemon.name)
    cardInfo(pokemon.url, pokemon.name)
}

const cardInfo = (url, name) => {

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        $(`#pokemonAbilitiesCard_${name}`).append(data.abilities[0].ability.name);
        $(`#pokemonWeightCard_${name}`).append( `${data.weight} lbs`);
        
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
    });
}