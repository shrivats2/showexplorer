import { useEffect, useState } from "react";
import axios from "axios";
import ShowCard from "./Showcard";

const ShowList = () => {
  const [shows, setShow] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await axios.get(
        "https://api.tvmaze.com/search/shows?q=all"
      );
      setShow(response.data);
    };

    fetchShows();
  }, []);

  return (
    <div className="show-list-container">
      <ul className="wrapper">
        {shows.map((show) => (
          <ShowCard series={show} />
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
