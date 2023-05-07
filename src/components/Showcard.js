import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ series }) => {
  const getgenre = series?.show.genres.join(", ");
  return (
    <div className="container">
      <div className="center list flex-column">
        <div className="card flex-row open">
          <img
            src={series?.show.image?.original}
            className="book"
            alt="movie-poster"
          />
          <div className="flex-column info">
            <div className="title">{series?.show.name}</div>
            <div className="author">{series?.show.type}</div>
            <div className="author">Genre : {getgenre} </div>
          </div>
          <div className="flex-column group">
            <div className="members">
              {series?.show.rating.average !== null ? (
                <>
                  <span className="current">{series?.show.rating.average}</span>{" "}
                  /<span className="max">10</span>
                </>
              ) : (
                <>
                  <span className="current">8</span> /
                  <span className="max">10</span>
                </>
              )}
            </div>
            <div className="hidden bottom">
              <Link to={`/summary/${series?.show.id}`}>
                <button className="simple">Show summary</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
