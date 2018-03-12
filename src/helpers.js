import { setMarket } from './actions/userActions';
import CDIcon from './cd-icon.jpg';
import GroupIcon from './group-icon.jpg';

//  Data structure that is used when Spotify didn't supply an image array.
//  Imported from here to save from rewriting it every time. 

export const placeholderArtistImageArray = [
    {
        height: 1000,
        width: 1000,
        url: GroupIcon
    }
];


export const placeholderMusicImageArray = [
    {
        height: 1000,
        width: 1000,
        url: CDIcon
    }
];


//  Function takes an image array which is arranged from largest image to smallest, along
//  with a minimum desired width and height. It then utilises recursion (via the inner function
//  recursiveImageTest) to go backwards through the image array until it finds an image that
//  satisfies the minimum height and width requirements, or until it reaches the first (and 
//  therefore largest) image in the array.

export const imageSizePicker = (imageArray, minWidth, minHeight) => {

    const recursiveImageTest = index => {
        const image = imageArray[index];
        return (index === 0 || (image.width >= minWidth && image.height >= minHeight) ) ?
                image.url :
                recursiveImageTest(index - 1);
    };

    if (imageArray.length === 1) {
        return imageArray[0].url;
    }

    let index = imageArray.length - 1;
    return recursiveImageTest(index);

};


//  Function that takes a value in milliseconds and converts it into a string
//  of formatted minutes and seconds. 

export const convertMsToMinSec = ms => {
    const toSecs = ms / 1000;
    const totalMins = Math.floor(toSecs / 60);
    let remainingSecs = Math.round(toSecs % 60);
    if (remainingSecs < 10) remainingSecs = '0' + remainingSecs;
    return `${totalMins}:${remainingSecs}`;
};


//  A wrapper for fetch with built in error handling. Designed for simple GET requests 
//  that don't require anything special in the body.

export const fetchWrapper = async (url, token) => {
    const settingsObject = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch(url, settingsObject);
    if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    } else {
        const errorJSON = await response.json();
        const { error } = errorJSON;
        return Promise.reject(error);
    }
};


//  A wrapper for fetch with built in error handling. Designed for more specific requests 
//  that do require a custom settings object to be passed in.

export const fetchWrapperWithSettings = async (url, settingsObject) => {
    const response = await fetch(url, settingsObject);
    if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    } else { 
        const errorJSON = await response.json();
        const { error } = errorJSON;
        return Promise.reject( error );
    }
};


//  A wrapper for fetch with built in error handling. Designed for more requests that 
//  don't return a JSON object in their response. 

export const fetchWrapperNoResponseBody = async (url, settingsObject) => {
    const response = await fetch(url, settingsObject);
    if (response.ok) {
        return response;
    } else { 
        const errorJSON = await response.json();
        const { error } = errorJSON;
        return Promise.reject( error );
    }
};

export const fetchWrapperWithSettingsNoResponseBody = async (url, settingsObject) => {
    const response = await fetch(url, settingsObject);
    if (response.ok) {
        return response;
    } else { 
        const errorJSON = await response.json();
        const { error } = errorJSON;
        return Promise.reject( error );
    }
};



export const getOrSetMarket = async (marketFromState, dispatch, token) => {
    if (marketFromState) { 
        return marketFromState;
    }
    const userInfo = await fetchWrapper('https://api.spotify.com/v1/me', token);
    const market = userInfo.country;
    dispatch(setMarket(market));
    saveMarketToLocalStorage(market);
    return market;
} 

export const saveMarketToLocalStorage = market => {
    try {
        const JSONMarket = JSON.stringify(market);
        localStorage.setItem('market', JSONMarket);
    } catch(err) {
        console.log(err);
    }
}