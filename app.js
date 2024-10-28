console.log("I'm working now")

const createImage = (name, src) => {
    let div = document.createElement('div')
    let label = document.createElement('label')
    label.innerHTML=name
    let pokemonImg = document.createElement('img')
    pokemonImg.src = src
    div.appendChild(pokemonImg)
    div.appendChild(label)
    div.style.display='flex'
    div.style.flexDirection='column'
    div.style.textAlign = 'center'
    document.getElementById('images').appendChild(div)
}

const createImgByUrl = (url) => {
    fetch(url)
      .then((response) => response.json())
        .then((data) => {
            createImage(data.name, data.sprites['front_default'])
        })
}

const getPokemonType = () => {
    // document.getElementById('images').innerHTML=""
    let pokemonId = Math.floor(Math.random()*151)+1
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
        .then((data) => {
            createImage(data.name, data.sprites['front_default'])
            let typeUrl = data.types[0]['type']['url']
            fetch(typeUrl)
              .then((response) => response.json())
                .then(((data) => {
                    // gets random number in length of array of all pokemon of same type
                    const otherType = () => {
                       return Math.floor(Math.random()*data['pokemon'].length)+1 
                    } 
                    for (i=0; i<4; i++) {
                        createImgByUrl(data.pokemon[otherType()]['pokemon']['url'])
                    }
                    console.log(data.pokemon[6]['pokemon']['url'])
                }))
        })
}