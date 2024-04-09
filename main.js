const URL = 'https://pokeapi.co/api/v2/pokemon/'
let nextURL = ''

let app = document.getElementById('app')

fetch(URL)
.then((response) => {
    if(response.ok) {return response.json()}
})
.then((data) => {
    nextURL = data.next
    for (let i of data.results) {
        fetch(URL + i.name)
        .then((response) => {
            if(response.ok) {return response.json()}
        })
        .then((data) => {
            let card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
                <img src="${data.sprites.front_default}" alt="${data.name}" id="${data.name}" draggable="false" class="holis">
                <h2>${data.name}</h2>
                <p class="id"><strong>ID:</strong> ${data.id}</p>
            `
            app.appendChild(card)
            let types = document.createElement('div')
            types.classList.add('types')
            for (let i of data.types) {
                let text = document.createElement('a')
                text.href = '#'
                text.classList.add(i.type.name)
                text.innerHTML = i.type.name
                types.appendChild(text)
            }
            card.appendChild(types)
        })
        
    }
})
.catch((error) => {
    alert(error)
})

let info = document.getElementById('info')

app.addEventListener('click', (e) => {
    let target = e.target
    if (target.classList.contains('holis')) {
        closeBtn.style.display = 'block'
        info.classList.add('show-info')
        document.getElementById('container').style.filter = 'contrast(.1)'
        fetch(URL + target.getAttribute('id'))
        .then((response) => {
            if(response.ok) {return response.json()}
        })
        .then((data) => {
            console.log(data)
            let infoCard = document.createElement('div')
            infoCard.classList.add('card-info')
            infoCard.id = 'infoCard'
            infoCard.innerHTML = `
                <h2>${data.name}</h2>
                <div class="flex">
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <div class="info-pokemon" id="infoPokemon">
                        <div class="abilities">
                            <p class="abilities-text" id="abilities"><strong>Abilities: </strong></p>
                        </div>
                        <p><strong>Height: </strong> ${data.height / 10} mts</p>
                        <p><strong>Weight: </strong>${data.weight / 10} kg</p>
                    </div>
                </div>
                <div class="stats-two">
                    <div class="hp">
                        <h2>${data.stats[0].stat.name}</h2>
                        <div class="bar">
                            <div class="bar-progress" style="width:${data.stats[0].base_stat}%;"></div>
                        </div>
                    </div>
                    <div class="attack">
                        <h2>${data.stats[1].stat.name}</h2>
                        <div class="bar">
                            <div class="bar-progress" style="width:${data.stats[1].base_stat}%;"></div>
                        </div>
                    </div>
                    <div class="defense">
                        <h2>${data.stats[2].stat.name}</h2>
                        <div class="bar">
                            <div class="bar-progress" style="width:${data.stats[2].base_stat}%;"></div>
                        </div>
                    </div>
                    <div class="special-attack">
                        <h2>${data.stats[3].stat.name}</h2>
                        <div class="bar">
                            <div class="bar-progress" style="width:${data.stats[3].base_stat}%;"></div>
                        </div>
                    </div>
                    <div class="special-defense">
                        <h2>${data.stats[4].stat.name}</h2>
                        <div class="bar">
                            <div class="bar-progress" style="width:${data.stats[4].base_stat}%;"></div>
                        </div>
                    </div>
                    <div class="speed">
                        <h2>${data.stats[5].stat.name}</h2>
                        <div class="bar">
                            <div class="bar-progress" style="width:${data.stats[5].base_stat}%;"></div>
                        </div>
                    </div>
                </div>
            `
            info.appendChild(infoCard)
            for(let i of data.abilities) {
                let text = document.createElement('span')
                text.innerHTML = `
                    ${i.ability.name}, 
                `
                abilities.appendChild(text)
            }
            let types = document.createElement('div')
            types.classList.add('types')
            for (let i of data.types) {
                let text = document.createElement('a')
                text.href = '#'
                text.classList.add(i.type.name)
                text.innerHTML = i.type.name
                types.appendChild(text)
            }
            infoPokemon.appendChild(types)
        })
        .catch((error) => {
            alert(error)
        })
    }else {
        info.classList.remove('show-info')
        document.getElementById('container').style.filter = 'none'
        closeBtn.style.display = 'none'
        info.removeChild(infoCard)
    }
})

document.getElementById('addBtn').addEventListener('click', () => {
    fetch(nextURL)
    .then((response) => {
        if(response.ok) {return response.json()}
    })
    .then((data) => {
        nextURL = data.next
        for (let i of data.results) {
            fetch(URL + i.name)
            .then((response) => {
                if(response.ok) {return response.json()}
            })
            .then((data) => {
                let card = document.createElement('div')
                card.classList.add('card')
                card.id = data.name
                card.innerHTML = `
                    <img src="${data.sprites.front_default}" alt="${data.name}" id="${data.name}">
                    <h2>${data.name}</h2>
                    <p><strong>ID:</strong> ${data.id}</p>
                `
                app.appendChild(card)
                let types = document.createElement('div')
                types.classList.add('types')
                for (let i of data.types) {
                    let text = document.createElement('a')
                    text.href = '#'
                    text.classList.add(i.type.name)
                    text.innerHTML = i.type.name
                    types.appendChild(text)
                }
                card.appendChild(types)
            })
        }    
    })
})

let closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', () => {
    info.classList.remove('show-info')
    document.getElementById('container').style.filter = 'none'
    info.removeChild(infoCard)
    closeBtn.style.display = 'none'
})