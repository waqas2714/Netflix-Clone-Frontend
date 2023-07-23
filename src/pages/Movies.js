import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { styled } from 'styled-components';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import Navbar from '../components/Navbar';
import SelectGenre from '../components/SelectGenre';

const Movies = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genresLoaded = useSelector((state)=>state.netflix.genresLoaded);
  const movies = useSelector((state)=>state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  useEffect(()=>{
    dispatch(getGenres());
  },[])

  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies({ type : "movies"}))
  })

  window.onscroll=()=>{
    setIsScrolled(window.scrollY===0?false:true)
    return ()=>window.onscroll=null
  }

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default Movies