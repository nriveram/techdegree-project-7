import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import apiKey from './config';
import axios from "axios"
import './App.css'; 
import Search from './Components/Search';
import Nav from './Components/Nav';
import PhotoList from './Components/PhotoList';


function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("sunsets");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeFetch = true;
    axios.get(`https://www.flickr.com/services/rest/?
      method=flickr.photos.search&api_key=${apiKey}&tags=${query}
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

  const handleQueryChange = searchText => {
    setQuery(searchText);
  }


  return (
    <div className="container">
      <Search changeQuery={handleQueryChange}/>
      <Nav />
      {
        (loading) 
        ? 
        <p>Loading...</p> 
        : 
        <PhotoList data={photos}/>
      }

    </div>
  ); 
  
}
      /*
      <Search changeQuery={handleQueryChange} />
      <Nav />
      {
          (loading)
          ? <p>Loading...</p>
          : 
          <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="cats" element={<PhotoList />} />
          <Route path="dogs" element={<PhotoList />} />
          <Route path="computers" element={<PhotoList />} />
          <Route path="/search/:query" element={<PhotoList />}/>
        </Routes>
      }
      */
export default App
