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
