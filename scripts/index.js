// Write your code!
// URLs
// const PHOTOS_URL = `https://api.unsplash.com/photos/?client_id=${ACCESS_TOKEN}`;
const userSearchRequest = 'cup';
const PHOTOS_URL = `https://api.unsplash.com/search/photos/?query=${userSearchRequest}&client_id=${ACCESS_TOKEN}`;

// DOM elements
const carouselContainer = document.querySelector('.carousel');
const buttonLeft = document.querySelector('.btn_left');
const buttonRight = document.querySelector('.btn_right');
const userSearchRequestInput = document.querySelector('.user_search_request_input');
const userSearchRequestButton = document.querySelector('.user_search_request_button');

const decrementPhotoIndex = () => {
    currentPhotoIndex = currentPhotoIndex === 0 ? 0 : currentPhotoIndex - 1;
    renderImageToPage( photos[currentPhotoIndex], -1 );
}

const incrementPhotoIndex = () => {
    currentPhotoIndex = currentPhotoIndex === 9 ? 0 : currentPhotoIndex + 1;
    renderImageToPage( photos[currentPhotoIndex], 1 );
}

buttonLeft.addEventListener('click', () => {
    decrementPhotoIndex();
});

buttonRight.addEventListener('click', () => {
    incrementPhotoIndex();
});

let currentPhotoIndex = 0;
let photos = [];
let userSearchQuery = '';

userSearchRequestButton.addEventListener('click', () => {
    userSearchQuery = userSearchRequestInput.value
    fetch( `https://api.unsplash.com/search/photos/?query=${userSearchQuery}&client_id=${ACCESS_TOKEN}` )
    .then( res => res.json())
    // .then(console.log)
    .then( photosFromServer => {
        photos = photosFromServer.results;
        console.log( photos );
        renderImageToPage( photos[currentPhotoIndex] )
    });
});

fetch( PHOTOS_URL )
    .then( res => res.json())
    // .then(console.log)
    .then( photosFromServer => {
        photos = photosFromServer.results;
        console.log( photos );
        renderImageToPage( photos[currentPhotoIndex] )
    });

const renderImageToPage = ( image, direction ) => {    
    const img = document.createElement('img');
    img.src = image.urls.regular

    if (direction) {
        if (direction === -1) {
            img.className = 'left active';
        }
        if (direction === 1) {
            img.className = 'right active';
        }
    } else {
        img.className = "active";
    }

    const previousImage = document.querySelector( 'img.active' );
    if ( previousImage ) {
        previousImage.className = direction === 1 ? "move_left" : "move_right";
        setTimeout(() => {
            previousImage.remove();
        }, 500);
    }

    carouselContainer.append(img);
}

const removeImageFromPage = image => {    
    const img = document.createElement('img');
    img.src = image.urls.regular
    carouselContainer.append(img);
}

