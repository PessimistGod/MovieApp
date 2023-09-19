import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieComponent = (props) => {
  const { title, release_date, original_language, poster_path, id } = props.movie;

  const formattedReleaseDate = new Date(release_date).toLocaleDateString();
  return (
    <MovieContainer
      onClick={() => {
        props.onMovieSelect(id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CoverImage src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
      <MovieName>{title || "N/A"}</MovieName>
      <InfoColumn>
        <MovieInfo>Release Date: {formattedReleaseDate || "N/A"}</MovieInfo>
        <MovieInfo>Lang: {original_language || "N/A"}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};

export default MovieComponent;
