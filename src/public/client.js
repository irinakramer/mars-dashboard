let store = {
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    selectedRover: '',
    roverData: ''
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {

    return `
        <header></header>
        <main>
        <section>${Cards(store.rovers)}</section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Display rovers
const Cards = (rovers) => {
    if (rovers) {
        return `
            <div class="tabs">
                ${rovers.map(rover => Card(rover)).join('')}
            </div>
        `
    } else {
        return `No rovers to display`
    }
}

const Card = (rover) => {
    return `
    <div class="card">
        <a href="${rover}">${rover}</a>
    </div>
    `
}

// Rover manifest data
const Manifest = (state) => {
    const { name, launch_date, landing_date, status } = photos[0].rover;
    return `
    Rover Name: ${name},
    Launch Date: ${launch_date}
    
    `
}


// ------------------------------------------------------  API CALLS

const getRoverData = (store, name) => {
    fetch(`http://localhost:3000/rovers/${name}`)
        .then(res => res.json())
        .then((roverData) => {
            console.log(roverData)
            updateStore(store, { roverData })
        })
        .catch(err => console.log(err))
}
getRoverData(store, 'spirit');