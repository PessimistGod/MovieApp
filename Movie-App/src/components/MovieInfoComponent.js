import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: center;
  border-bottom: 1px solid lightgray;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;

  @media (max-width: 768px) {
    height: auto;
    max-width: 100%;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;

  @media (max-width: 768px) {
    margin: 10px;
  }
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.8;
  }
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;

const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: black;
  position: absolute;
  right: 20px;
  height: fit-content;
  padding: 10px 20px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 1;

  @media (max-width: 768px) {
    right: 0px;
    top: 90px;
  }
`;

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;

  useEffect(() => {
    if (selectedMovie) {
      Axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${API_KEY}&language=en-US`
      )
        .then((response) => setMovieInfo(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedMovie]);

  if (!movieInfo) {
    return (
      <Container>
        <Close onClick={() => props.onMovieSelect(null)}>X</Close>
        <InfoColumn>
          <MovieName>N/A</MovieName>
          <MovieInfo>Loading...</MovieInfo>
        </InfoColumn>
      </Container>
    );
  }

  return (
    <Container>
      <Close onClick={() => props.onMovieSelect(null)}>X</Close>
      <CoverImage
        src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
        alt={movieInfo.title}
      />
      <InfoColumn>
        <MovieName>
          {movieInfo.title} <span>({movieInfo.release_date})</span>
        </MovieName>
        <MovieInfo>
          IMDB Rating: <span>{movieInfo.vote_average}</span>
        </MovieInfo>
        <MovieInfo>
          Year: <span>{movieInfo.release_date.substr(0, 4)}</span>
        </MovieInfo>
        <MovieInfo>
          Language:{" "}
          <span>
            {movieInfo.original_language ? movieInfo.original_language : "N/A"}
          </span>
        </MovieInfo>
        <MovieInfo>
          Rated: <span>{movieInfo.adult ? "A" : "U/A"}</span>
        </MovieInfo>
        <MovieInfo>
          Runtime: <span>{movieInfo.runtime} minutes</span>
        </MovieInfo>
        <MovieInfo>
          Genre:{" "}
          <span>
            {movieInfo.genres.map((genre) => genre.name).join(", ")}
          </span>
        </MovieInfo>
        <MovieInfo>
          Director:{" "}
          <span>{movieInfo.director ? movieInfo.director : "N/A"}</span>
        </MovieInfo>
        <MovieInfo>
          Actors: <span>{movieInfo.actors ? movieInfo.actors : "N/A"}</span>
        </MovieInfo>
        <MovieInfo>
          Plot: <span>{movieInfo.overview ? movieInfo.overview : "N/A"}</span>
        </MovieInfo>
      </InfoColumn>
    </Container>
  );
};

export default MovieInfoComponent;
