import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Request from './Components/Requests/Request';
import Navbar from './Components/Navbar/Navbar';
import Row from './Components/Row/Row';
import SearchRow from './Components/Row/SearchRow';
import Header from './Components/Header/Header';
import MoviePage from './Components/MoviePage/MoviePage';
import CastPage from './Components/CastPage/CastPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

const baseURL = "https://api.themoviedb.org/3/";

const App = () => {
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (search.trim() !== '') {
      axios
        .get(`${baseURL}${Request.searchMovies(search)}`)
        .then((response) => setSearchList(response.data.results || []))
        .catch((error) => console.error('Error fetching search:', error));
    } else {
      setSearchList([]);
    }
  }, [search]);

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar setSearch={setSearch} user={user} />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {!search.trim() && <Header url={Request.fetchPopularMovies} />}

                {search.length > 0 ? (
                  <SearchRow
                    title={`Search Results for "${search}"`}
                    searchList={searchList}
                  />
                ) : null}

                <Row url={Request.fetchPopularMovies} title="Popular Movies" />
                <Row url={Request.fetchUpcomingMovies} title="Upcoming Movies" />
                <Row url={Request.fetchTopRatedMovies} title="Top Rated Movies" />
              </>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/movie/:id' element={<MoviePage />} />
          <Route path='/cast/:id' element={<CastPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
