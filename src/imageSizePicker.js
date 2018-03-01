// imageArray is an array of objects in this form:
// {
//      height: number,
//      width: number,
//      url: string
// }



//  Function takes an image array which is arranged from largest image to smallest, along
//  with a minimum desired width and height. It then utilises recursion (via the inner function
//  recursiveImageTest) to go backwards through the image array until it finds an image that
//  satisfies the minimum height and width requirements, or until it reaches the first (and 
//  therefore largest) image in the array.

export const dummyImageArray = [
    {
        height: 1000,
        width: 1000,
        url: ''
    }
];


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

