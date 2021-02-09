// Data store object
const store = {
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    selectedRover: '',
    roverData: ''
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState);
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    return `
        <header><h1>Mars Dashboard</h1></header>
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

/**
* @description Main component to display all Rover info
* @param {object} state - Store object
* @returns HTML for three rovers container, and HTML for each rover mission data and photos
*/
const Rover = (state) => {
    // Build 3 rovers container
    if (!state.selectedRover) {
        return `
            ${Wrapper(state, 'rovers', Mapper, state.rovers, Card)}
        `
    }

    // if undefined data, run getRoverData again and return
    if (!state.roverData) {
        getRoverData(state)
        return ''
    }

    let photos = Photos(state);

    // Get URLs of the photos
    const photoUrl = photos.map(photo => photo.img_src);

    return `
        ${Manifest(state)}
        ${BackButton()}
        ${Wrapper(state, 'photo-wrapper', Mapper, photoUrl, Image)}
    `
}


/**
* @description Back button, resets store to initial values
* @returns HTML for back button
*/
const BackButton = () => {
    return `
        <button class="back-btn" onclick="updateStore(store, {selectedRover: '', roverData: ''})">Back</button>
    `
}


/**
* @description Manifest for mission data
* @param {object} - Store object
* @returns HTML list for rover mission data
*/
const Manifest = (state) => {
    // Get rover manifest data (all data is from same photo, so take index 0)
    const photos = Photos(state);
    const { name, landing_date, launch_date, status } = photos[0].rover;
    return `
        <ul>
            <li>Rover name: ${name}</li>
            <li>Launch date: ${launch_date}</li>
            <li>Landing date: ${landing_date}</li>
            <li>Mission status: ${status}</li>
            <li>Photos taken on date: ${photos[0].earth_date}</li>
        </ul>
    `
}


/**
* @description Build photos array using roverData. 
* For Curiosity take 'latest_photos' property, for the other two take 'photos'.
* @param {object} - Store object
* @returns Array of photos
*/
const Photos = (state) => {
    let photos;
    if (state.selectedRover === 'Curiosity') {
        photos = state.roverData.data.latest_photos;
    } else {
        photos = state.roverData.data.photos;
    }
    return photos;
}


/**
* @description Higher order function to wrap elements in a div. 
* Creates <div> wrappers for the three rovers, and for all the rover photos
* @param {object} - Store object
* @param {string} className - name of the class to add to the div
* @param {function} Mapper - function that maps over an array of elements
* @param {array} arr - array of elements to be mapped over
* @param {function} elMaker - function that builds and returns an HTML element
* @returns HTML div with elements
*/
const Wrapper = (state, className, Mapper, arr, elMaker) => {
    return (`
    <div class="${className}">
        ${Mapper(state, arr, elMaker)}
    </div>
    `)
}


/**
* @description Higher order function that maps over an array, joins via '' to avoid commas 
* @param {object} - Store object
* @param {array} arr - array of elements to be mapped over
* @param {function} elMaker - function that builds and returns an HTML element
* @returns {array} Mapped array of elements
*/
const Mapper = (state, arr, elMaker) => {
    return (`
        ${arr.map(x => elMaker(state, x)).join('')}
    `)
}


/**
* @description Make a card for a rover
* @param {object} - Store object
* @param {string} rover - name of the rover
* @returns HTML of the Card for the named rover
*/
const Card = (state, rover) => {
    return `
        <div class="card">
            <button class="card-btn" id="card-${rover}" onclick="updateStore(store, {selectedRover: '${rover}'})" style="background-image: url('assets/images/${rover}_rover.jpg')"><span>${rover}</span></button>
        </div>
    `
}


/**
* @description Make an image tag for a photo URL
* @param {object} - Store object
* @param {string} url - image URL
* @returns HTML img tag for the selected rover photo
*/
const Image = (state, url) => {
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
            updateStore(state, { roverData })
        })
        .catch(err => console.log(err))
}
