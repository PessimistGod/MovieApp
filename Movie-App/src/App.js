import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "308e82265eed2278648f7b2091073ecd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.div`
  background-color: #fffef2;
  color: black;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 40%;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const NoResultsMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const InitialMessage = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [searched, setSearched] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchData = async (searchString) => {
    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchString}&api_key=${API_KEY}`
      );

      updateMovieList(response.data.results);
      setSearched(true);

      if (response.data.results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    setSearched(false);

    if (e.target.value.trim() === "") {
      setNoResults(false);
    }

    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie/movie-icon.svg" />
          Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/movie/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      {searched && noResults && (
        <NoResultsMessage>No movies found.</NoResultsMessage>
      )}
      {!searched && searchQuery.length === 0 && (
  <InitialMessage>Search for a movie.</InitialMessage>
)}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="/movie/movie-icon.svg" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
