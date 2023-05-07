import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ShowSummary = () => {
  const [show, setShow] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { showId } = useParams();
  const [ticketData, setTicketData] = useState({
    movieName: "",
    customerName: "",
    email: "",
    phone: "",
  });
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchShowSummary = async () => {
      const response = await axios.get(
        `https://api.tvmaze.com/shows/${showId}`
      );
      setShow(response.data);
    };
    fetchShowSummary();
  }, [showId]);

  const removeTags = (str) => {
    if (str === null || str === "") return false;
    else str = str?.toString();
    return str?.replace(/(<([^>]+)>)/gi, "");
  };

  const getgenre = show?.genres?.join("| ");

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...ticketData,
      movieName: show.name,
    };
    localStorage.setItem("ticketData", JSON.stringify(data));
    setTicketData({
      movieName: "",
      customerName: "",
      email: "",
      phone: "",
    });
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "customerName" || name === "email" || name === "phone") {
      setTicketData({
        ...ticketData,
        [name]: value,
      });
    } else if (name === "date") {
      setDate(value);
    }
  };

  return (
    <div>
      <div id="card_container" data-offset="2">
        <div class="pg">
          <img src={show.image?.original} alt="movie-poster" />
        </div>
        <div id="card">
          <div class="shine"></div>
          <div class="text-block">
            <h1>{show.name}</h1>
            <h3>{getgenre}</h3>
            <p>{removeTags(show?.summary)}</p>
            <button onClick={toggleModal}>Book Ticket</button>
            <Modal
              isOpen={isOpen}
              onRequestClose={() => setIsOpen(false)}
              contentLabel="Book Movie Ticket"
              className="modal"
            >
              <h2>Book Movie Ticket</h2>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Movie Name:
                  <input
                    type="text"
                    name="movieName"
                    value={show.name}
                    readOnly
                  />
                </label>
                <label>
                  Customer Name:
                  <input
                    type="text"
                    name="customerName"
                    value={ticketData.customerName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label htmlFor="date">Date & Timing</label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={date}
                  onChange={handleInputChange}
                />
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={ticketData.email}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="tel"
                    name="phone"
                    value={ticketData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <button type="submit">Book Now</button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSummary;
