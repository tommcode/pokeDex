
document.addEventListener("DOMContentLoaded", () =>{
    renderAllPokemons()
})

let minimum = 0;

function forInterval() {
    const loader1 = document.querySelector('.loader')
    const listOfPokes1 = document.querySelector('.pokemon-container')
    const naviBtns1 = document.querySelector('.btns')
    naviBtns1.setAttribute('style', 'display: flex')
    loader1.setAttribute('style', 'display: none')
    listOfPokes1.setAttribute('style', 'display: flex')
}

setTimeout(forInterval, 1500)
clearTimeout()

function fetchPokemons(){ 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${minimum}&limit=20`
    fetch(url)
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}


function renderAllPokemons(){
    let allPokemonContainer = document.querySelector('.pokemon-container')
    allPokemonContainer.innerText = "";
    fetchPokemons()
}


function fetchPokemonData(pokemon){
    let url = pokemon.url 
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        renderPokemon(pokeData)
        console.log(pokeData)
        })
}

const filterBtn = document.querySelector('.btn--filter-exp')

function filterList(e) {
    e.preventDefault()
    alert("I'm so sorry, but this button does not work yet")
}

filterBtn.addEventListener("click", filterList)


function renderPokemon(pokeData){
    let allPokemonContainer = document.querySelector('.pokemon-container');
    let pokeContainer = document.createElement("div") 
    pokeContainer.classList.add('pokemon')

    createPokeImage(pokeData.id, pokeContainer)

    let capitalizeName = (pokeName) => {
        return pokeName.charAt(0).toUpperCase() + pokeName.slice(1)
    }

    let pokeName = document.createElement('h4')
    pokeName.classList.add('pokemon-name') 
    pokeName.innerText = capitalizeName(pokeData.name)

    let pokeNumber = document.createElement('p')
    pokeNumber.classList.add('pokemon-id')
    pokeNumber.innerText = `#${pokeData.id}`
   
    let pokemonBaseExp = document.createElement('p')
    pokemonBaseExp.classList.add("pokemon-experience")
    pokemonBaseExp.innerText = `Base Experience: ${pokeData.base_experience}`
    
    let pokeType = document.createElement('ul') 
    

    createTypes(pokeData.types, pokeType) 

    pokeContainer.append(pokeName, pokeNumber,pokemonBaseExp, pokeType );   
    allPokemonContainer.appendChild(pokeContainer);       
}

function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = `Type:  ${type['type']['name']}`;
        ul.append(typeLi)
    })
}

function createPokeImage(pokemonId, containerDiv){
    let pokemonImageContainer = document.createElement('div')
    pokemonImageContainer.classList.add('img-container')

    let pokeImage = document.createElement('img')
    pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`
    pokeImage.classList.add('.image-container')
    pokemonImageContainer.append(pokeImage);
    containerDiv.append(pokemonImageContainer);
}



const increaseId = document.querySelector('.btn--next')
const decreaseId = document.querySelector('.btn--prev')



function increase(){
    minimum +=20;
    if(minimum > 131) {
        minimum = 131
    }
    renderAllPokemons()

    const loader1 = document.querySelector('.loader')
    const listOfPokes1 = document.querySelector('.pokemon-container')
    const naviBtns1 = document.querySelector('.btns')
    naviBtns1.setAttribute('style', 'display: none')
    loader1.setAttribute('style', 'display: block')
    listOfPokes1.setAttribute('style', 'display: none')

    setTimeout(forInterval, 1500)
}

function decrease(){
    minimum -=20;
    if(minimum < 0) {
        minimum =0
    }
    renderAllPokemons()
    const loader1 = document.querySelector('.loader')
    const listOfPokes1 = document.querySelector('.pokemon-container')
    const naviBtns1 = document.querySelector('.btns')
    naviBtns1.setAttribute('style', 'display: none')
    loader1.setAttribute('style', 'display: block')
    listOfPokes1.setAttribute('style', 'display: none')

    setTimeout(forInterval, 1500)
}


increaseId.addEventListener('click', increase)
decreaseId.addEventListener('click', decrease)

