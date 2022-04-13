$(document).ready(function () {

    const urlPokemons = 'https://pokeapi.co/api/v2/pokemon/';

    getPokemons(urlPokemons);

    $('#getMorePokemons').click(function () {
        const urlNext = $(this).attr('nextPageUrl');
        getPokemons(urlNext);
    });


    $('.btnGetDataPokemon').on('click', function(){
        window.location.href= "pokemon.html";
        
     });
     

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
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            $(`#img_${name}`).attr("src", data.sprites.other.dream_world.front_default);
        });
}

const getPokemonData = (url) => {

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            $('#pokemonData').text(data.name);

            $('#pokemonAbilities').text('');
            $('#pokemonWeight').text('');
            $('#pokemonMoves').text('');
            $('#pokemonBaseExperience').text('');

            data.abilities.forEach(function (ability) {
                $('#pokemonAbilities').append(`<li>${ability.ability.name} </li>`);
            });

            data.weight.forEach(function (weight) {
                $('#pokemonAbilities').append(`<li>${weight.value} </li>`);
            });

            $('.btnOtherPokemons').click(function () {
                const urlOtherPokemons = $(this).attr('data-url-other-pokemons');
                getOtherPokemons(urlOtherPokemons);
            });

            for (let i = 0; i < 5; i++) {
                $('#pokemonMoves').append(`<li>${data.moves[i].move.name}</li>`);
            };

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
                        <a href = "pokemon.html" data-url-pokemon =' ${pokemon.url}'>
                            <button class ="btn btn-primary btnGetDataPokemon" >¡mas info!</button> 
                        </a>
                    </div>
                </div>
            </div>
           
    `);
    getPhoto(pokemon.url, pokemon.name);
}

const showPokemonData = (pokemon) => {

    $('#pokemonData').append(`
        
                    <h4 class='card-title'>${pokemon.name}</h4>
                    <div class = "">
                        <img src="" id="img_${pokemon.name}" class = "img-card">
                    </div>
                    <div class = "">
                        <ul>
                            <li> "Weight : ${pokemon.name.weight}" </li>
                            <li> "Ability : ${pokemon.name.ability}" </li>
                        </ul>   
                    </div>

    
           
    `);
    getPhoto(pokemon.url, pokemon.name);
}
