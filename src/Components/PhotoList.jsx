import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Photo from './Photo';
import NoPhotos from './NoPhotos';
import NotFound from './NotFound';

const PhotoList = (props) => {
    let photos; 
    let { query } = useParams(); 
    const pathName = window.location.pathname.split('/')[1].toLowerCase();

    useEffect(() => {
        if (query) {
        } else {
            props.changeQuery(pathName); 
        }
    }, [query, pathName]); 

    // checks for valid pathnames
    if (pathName === 'search' || pathName === 'cats' || 
        pathName === 'dogs' || pathName === 'computers' || 
        pathName === 'lilies') {
        const results = props.data; 
        if (results.length > 0) {
        // maps through each photo and creates a photo component 
        photos = results.map(photo => 
            <Photo 
                key={photo.id} 
                id={photo.id} 
                secret={photo.secret}
                server={photo.server}
                title={photo.title}
            />); 
        } else {
            // displays if there are no searches 
            photos = <NoPhotos />
        }
    } else {
        // displays if there was a n error to the path 
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