import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Photo from './Photo';
import NoPhotos from './NoPhotos';
import NotFound from './NotFound';

const PhotoList = (props) => {
    let { query } = useParams(); 

    useEffect(() => {
        props.changeQuery(query); 
    }); 

    const pathName = window.location.pathname.split('/')[1].toLowerCase();

    let photos; 
    if (pathName === 'search' || pathName === 'cats' || pathName === 'dogs' || pathName === 'computers') {
        const results = props.data; 
        if (results.length > 0) {
        photos = results.map(photo => 
            <Photo 
                key={photo.id} 
                id={photo.id} 
                secret={photo.secret}
                server={photo.server}
                title={photo.title}
            />); 
        } else {
            photos = <NoPhotos />
        }
    } else {
        photos = <NotFound />
    }
    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {photos}
            </ul>
        </div>
    );
}

export default PhotoList; 