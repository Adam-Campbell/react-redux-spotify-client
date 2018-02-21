export function convertMsToMinSec(ms) {
    const toSecs = ms / 1000;
    const totalMins = Math.floor(toSecs / 60);
    let remainingSecs = Math.round(toSecs % 60);
    if (remainingSecs < 10) remainingSecs = '0' + remainingSecs;
    return `${totalMins}:${remainingSecs}`;
}


export async function fetchWrapper(url, token) {
    //  func needs to:  
    //  - return a promise, inside that promise:
    //      - make fetch request using info provided in arguments
    //          - fetch request should use proper headers, required on some routes only,
    //             but it's safer to just do this on every route. 
    //      - when fetch request completes, check status 
    //          - if 200, call .json() method on results, then call resolve with results
    //          - if 401, we need a new token so we call reject... reject with what?
    return new Promise(
        (resolve, reject) => {
            console.log(token);
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);
            const init = {
                headers
            };
            fetch(url, init)
            .then(response => response.json())
            .then(response => resolve(response))
    })
}


export async function genericFetchWrapper(url, token) {
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
}


export async function newFetchWrapper(url, settingsObject) {
    const response = await fetch(url, settingsObject);
    if (response.ok) {
        const responseJSON = await response.json();
        return responseJSON;
    } else { 
        const errorJSON = await response.json();
        const { error } = errorJSON;
        return Promise.reject( error );
    }
}

export async function noResponseFetchWrapper(url, settingsObject) {
    const response = await fetch(url, settingsObject);
    if (response.ok) {
        return response;
    } else { 
        const errorJSON = await response.json();
        const { error } = errorJSON;
        return Promise.reject( error );
    }
}


// EXAMPLES OF HOW TO USE THIS FUNCTION

// With await and a try/catch block:

// try {
//     const createPlaylistResponse = await newFetchWrapper(url, settings);
//     const playlistObject = createPlaylistObject(createPlaylistResponse);
//     dispatch(createPlaylistSuccess(playlistObject));
// } catch(e) {
//     console.log(e);   
// }


// With Promise.all:

// Promise.all([newFetchWrapper(url, settings)])
// .then(response => {
//     const playlistObject = createPlaylistObject(response[0]);
//     dispatch( createPlaylistSuccess(playlistObject) );
// })
// .catch(e => console.log(e))