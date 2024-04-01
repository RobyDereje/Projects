
const input = document.getElementById('search-input');
const button = document.getElementById('search-button');
const nameId = document.querySelector('.name-id');
const weightHeight = document.querySelector('.weight-height');
const typesContainer = document.querySelector('#types');
const imageContainer = document.querySelector('.image-container');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const spAttack = document.getElementById('special-attack');
const spDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const table = document.querySelector('table')
const masterUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon'

const fetchData = async ()=>{
  try{
    const res = await fetch(masterUrl);
    const data = await res.json();
    const names = data.results.map((arr)=>arr.name)
    const id = data.results.map((arr)=>arr.id)
    console.log(id)
    // console.log(data.results)
    let newUrl;
    if(!isNaN(parseInt(input.value.trim()))){
      newUrl = getPokemonNum(id)
    } else{
      newUrl = getPokemon(names)
    }
    // let newUrl = getPokemon(names)
    if(newUrl){
      fetchNewUrl(newUrl)
    } else{
      console.log('not found')
    }
  } catch (err){
    console.log(err)
  }
}
// const data = fetchData()

const getPokemon = (arr)=>{
  const value = input.value.trim().toLowerCase()
  if(!arr.includes(value)){
    alert('Pokémon not found')
    return null
  } else{
    const newUrl = `${masterUrl}/${value}`
    return newUrl
  }
}

const getPokemonNum = (arr)=>{
  const value = parseInt(input.value.trim())
  const found = arr.find((item)=>item === value)
  if(!found){
    alert('Pokémon not found')
    return null
  } else{
    const newUrl = `${masterUrl}/${value}`
    return newUrl
  }
}

const fetchNewUrl = async (url)=>{
  try{
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    labelEm(data)
  } catch(err){
    console.log(err)
  }
}

const labelEm = (obj)=>{
  const {name, id, height, weight, types, stats, sprites} = obj
  nameId.innerHTML = `<span id='pokemon-name'>${name.toUpperCase()}</span> <span id='pokemon-id'>#${id}</span>`
  weightHeight.innerHTML = `<span id='weight'>Weight: ${weight}</span>
    <span id='height'>Height: ${height}</span>`
    typesContainer.innerHTML = ''
  types.map((obj)=>{typesContainer.innerHTML += `<p id='types-el'>${obj.type.name.toUpperCase()}</p>`})
  imageContainer.innerHTML = `<img id='sprite' src='${sprites.front_default}'>`
  table.style.display = 'block'
  const statList = [hp, attack, defense, spAttack, spDefense, speed]
  for(let i=0; i < statList.length; i++){
    statList[i].textContent = stats[i].base_stat
  }
}

button.addEventListener('click', fetchData)
input.addEventListener('keydown', (event)=>{
  if(event.key === 'Enter'){
    event.preventDefault();
    fetchData()
  }
})