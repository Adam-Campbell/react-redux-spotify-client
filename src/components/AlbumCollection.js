import React from 'react';
import PropTypes from 'prop-types';
import AlbumCollectionItem from './AlbumCollectionItem';

const AlbumCollection = props => {

    let albumArr;
    if (props.albumArray.length) {
        albumArr = props.albumArray.map(album => {
            return (
                <AlbumCollectionItem 
                    albumImage={album.albumImage}
                    albumName={album.albumName}
                    albumID={album.albumID}
                    key={album.albumID}
                />
            );
        })
    } else {
        albumArr = <p>Sorry, there are no albums to show here.</p>
    }

    return (
        <section className="card-collection">
            <h1 className="heading heading--regular">{props.title}</h1>
            <div className="card-collection__container">
                {albumArr}
            </div>
        </section>
    )
}

AlbumCollection.propTypes = {
    albumArray: PropTypes.array,
    title: PropTypes.string,
}

export default AlbumCollection;








// const AlbumCollection = props => {

//     let albumArr;
//     if (props.albumArray.length) {
//         albumArr = props.albumArray.map(album => {
            
//         })
//     }

//     return (
//         <section className="card-collection">
//             <h1 className="heading heading--regular">{props.title}</h1>
//             <div className="card-collection__container">
//                 {
//                     props.albumArray.map(album => {
//                         return (
//                             <AlbumCollectionItem 
//                                 albumImage={album.albumImage}
//                                 albumName={album.albumName}
//                                 albumID={album.albumID}
//                                 key={album.albumID}
//                             />
//                         )
//                     })
//                 }
//             </div>
//         </section>
//     )
// }