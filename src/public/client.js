let store = {
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    selectedRover: 'Curiosity',
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
        <section>${Rover(state)}</section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Main component to display all info
const Rover = (state) => {
    // Build 3 rovers container
    if (!state.selectedRover) {
        return `
        ${WrapperDiv(state, 'rovers', MapJoin, state.rovers, CardMaker)}
        `
    }

    // TODO - if undefined data, run getRoverData again
    if (!state.roverData) {
        getRoverData(state)
    }

    // Photos from rover
    let photos;
    if (state.selectedRover === 'Curiosity') {
        photos = state.roverData.data.latest_photos;
        console.log(photos);
    } else {
        photos = state.roverData.data.photos
    }

    // Ger URLs of the photos
    const photoUrl = photos.map(photo => photo.img_src);

    // Get photo date (all from same date, so take index 0)
    const photoDate = photos[0].earth_date;

    // Get rover manifest data ( all from same photo, so take index 0)
    const { name, landing_date, launch_date, status } = photos[0].rover;

    return `
    <ul>
    <li>${name}</li>
    <li>${launch_date}</li>
    <li>${landing_date}</li>
    <li>${status}</li>
    <li>${photoDate}</li>
    </ul>
    ${WrapperDiv(state, 'photo-wrapper', MapJoin, photoUrl, ImgMaker)}
    
    `

}


// Creates div wrapper for the 3 rovers and for all the rover photos
const WrapperDiv = (state, className, mapJoiner, arr, elMaker) => {
    return (`
    <div class="${className}">
    ${mapJoiner(state, arr, elMaker)}
    </div>
    `)
}

// Joins mapped array to avoid commas
const MapJoin = (state, arr, elMaker) => {
    return (`
    ${arr.map(x => elMaker(state, x)).join('')}
    `)
}

// Make a card for a rover
const CardMaker = (state, rover) => {
    return `
    <div class="card">
        <a href="tbd" onclick="setTimeout(updateStore, 3000, {selectedRover: '${rover}'})">${rover}</a>
    </div>
    `
}

// Make an image tag for a photo URL
const ImgMaker = (state, url) => {
    return `
    <img src="${url}" alt="photo taken by ${state.selectedRover}" class="photo" />
    `
}


// ------------------------------------------------------  API CALLS
// TODO - replace curiosity with {selectedRover}
const getRoverData = (state) => {
    fetch(`http://localhost:3000/curiosity`)
        .then(res => res.json())
        .then((roverData) => {
            console.log(roverData)
            updateStore(state, { roverData })
        })
        .catch(err => console.log(err))
}