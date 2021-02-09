//const { isImmutable } = require("immutable");

const store = {
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    selectedRover: '',
    roverData: ''
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    //store.merge(newState);
    console.log(store);
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {

    return `
        <header><h1>Mars Rovers Dashboard</h1></header>
        <main>
        <section>${Rover(state)}</section>
        </main>
        <footer>Project by Irina Kramer<br>Udacity Intermediate JavaScript nanodegree</footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Main component to display all Rover info
const Rover = (state) => {
    // Build 3 rovers container
    if (!state.selectedRover) {
        return `
            ${WrapperDiv(state, 'rovers', MapJoin, state.rovers, CardMaker)}
        `
    }

    // if undefined data, run getRoverData again and return
    if (!state.roverData) {
        getRoverData(state)
        return ''
    }

    let photos = Photos(state);

    // Ger URLs of the photos
    const photoUrl = photos.map(photo => photo.img_src);

    return `
        ${Manifest(state)}
        ${BackButton()}
        ${WrapperDiv(state, 'photo-wrapper', MapJoin, photoUrl, ImgMaker)}
    `
}

const BackButton = () => {
    return `
        <button id="back-btn" onclick="updateStore(store, {selectedRover: '', roverData: ''})">Back</button>
    `
}

// Manifest for mission data
const Manifest = (state) => {
    // Get rover manifest data ( all from same photo, so take index 0)
    const photos = Photos(state);
    const { name, landing_date, launch_date, status } = photos[0].rover;
    return `
        <ul>
            <li>${name}</li>
            <li>${launch_date}</li>
            <li>${landing_date}</li>
            <li>${status}</li>
            <li>${photos[0].earth_date}</li>
        </ul>
    `
}


// Photos array
const Photos = (state) => {
    let photos;
    if (state.selectedRover === 'Curiosity') {
        photos = state.roverData.data.latest_photos;
        //console.log("Curiosity photos:", photos);
    } else {
        photos = state.roverData.data.photos;
        //console.log("photos:", photos);
    }
    return photos;
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
            <button class="card-btn" id="card-${rover}" onclick="updateStore(store, {selectedRover: '${rover}'})" style="background-image: url('assets/images/${rover}_rover.jpg')"><span>${rover}</span></button>
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
const getRoverData = (state) => {
    const { selectedRover } = state;
    fetch(`http://localhost:3000/${selectedRover}`)
        .then(res => res.json())
        .then((roverData) => {
            console.log("roverData:", roverData)
            updateStore(state, { roverData })
        })
        .catch(err => console.log(err))
}
