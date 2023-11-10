// import dependencies 
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import apiKey from './config';
import axios from "axios"
import './App.css'; 

// import component files 
import Search from './Components/Search';
import Nav from './Components/Nav';
import PhotoList from './Components/PhotoList';
import NotFound from './Components/NotFound';


function App() {
  // setting up states 
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("lilies");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeFetch = true;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}
        &per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          // handle success
          if (activeFetch) {
            setPhotos(response.data.photos.photo);
            setLoading(false);
            //console.log(response.data.photos.photo);
          }
        })
        .catch(error => {
          // handle error
          console.log("Error fetching and parsing data", error);
        });
      return () => { activeFetch = false }
    }, [query]);

  // updates new query changes to the api 
  const handleQueryChange = searchText => {
    setQuery(searchText);
  };

  return (
    <div className="container">
      <Search changeQuery={handleQueryChange}/>
      <Nav />
      {
        (loading) ? <p>Loading...</p> 
        : 
          <Routes>
            <Route index element={<Navigate replace to={query} />}/>
            <Route path="/cats" element={<PhotoList data={photos} changeQuery={handleQueryChange}/>}/>
            <Route path="/dogs" element={<PhotoList data={photos} changeQuery={handleQueryChange}/>}/>
            <Route path="/computers" element={<PhotoList data={photos} changeQuery={handleQueryChange}/>}/>
            <Route path="/search/:query" element={<PhotoList data={photos} changeQuery={handleQueryChange}/>}/>
            <Route path="*" element={<PhotoList data={photos} changeQuery={handleQueryChange}/>}/>
          </Routes>
      }

    </div>
  ); 
  
}

export default App;
