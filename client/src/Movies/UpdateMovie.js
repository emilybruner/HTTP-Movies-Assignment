import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: []
}


const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);


    useEffect(() => {
      const movieToEdit = props.movies.find(
        e => `${e.id}` === props.match.params.id
      );
      console.log(props.movies, movieToEdit);
      if (movieToEdit) {
          setMovie(movieToEdit)
      }

    }, [props.movies, props.match.params.id]);

    const handleChanges = e => {
        e.persist()
        let value = e.target.value

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleStars = e => {
        setMovie({
            ...movie, 
            stars: e.target.value.split(',')
        })
    }

    const handleSubmit = e => {
    e.preventDefault();

    axios
    .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
    .then(res => {
        setMovie(res.data);
        props.history.push('/');
    })
    .catch(err => console.log(err))

    
}


return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
            type='text' 
            name='title'
            value={movie.title}
            onChange={handleChanges}
            placeholder='title'
            />
            <input
            type='text' 
            name='director'
            value={movie.director}
            onChange={handleChanges}
            placeholder='director'
            />
            <input 
            type='text'
            name='metascore'
            value={movie.metascore}
            onChange={handleChanges}
            placeholder='metascore'
            />
            <input
            type='text' 
            name='stars'
            value={movie.stars}
            placeholder='stars'
            onChange={handleStars}
            
            />
            <button>Submit Changes</button>
        </form>
    </div>
)
};

export default UpdateMovie;