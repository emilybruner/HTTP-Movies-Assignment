import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import Axios from "axios";


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] =useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:5000/api/movies')
    .then(res => setMovies(res.data))
    .catch(error => console.log(error))
  }, [])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={() => 
      <MovieList movies={movies} setMovies={setMovies} />} />
      
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} movies={movies} setMovies={setMovies} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path='/update-movie/:id' render={props => <UpdateMovie {...props} movies={movies} setMovies={setMovies} />} />
    </>
  );
};

export default App;
