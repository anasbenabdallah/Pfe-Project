import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Event from "./Event";
import EventPopup from "./EventPopup";
import { Pagination, Button } from "@mui/material";
import SearchBar from "./SearchBar";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
  const [sortBy, setSortBy] = useState("participants"); // "salary" for sorting by salary

  const JOBS_PER_PAGE = 9;

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/event")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user._id);
    sendRequest()
      .then((data) => setEvents(data.events))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });

  const startIndex = (page - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
  const handleSortClick = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="all-events-container">
      <div>
        <SearchBar
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button onClick={handleSortClick}>
          Sort by {sortBy} {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
      </div>
      {selectedEvent && (
        <EventPopup
          open={Boolean(selectedEvent)}
          handleClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          description={selectedEvent.description}
          eventId={selectedEvent._id}
          userId={userId}
        />
      )}
      {paginatedEvents.length > 0 ? (
        paginatedEvents.map((event, index) => (
          <Event
            key={index}
            id={event._id}
            title={event.title}
            description={event.description}
            imageURL={event.image}
            profilpic={event.tester.picturePath}
            participants={event.participants}
            userName={event.tester.testerName}
            testerID={event.tester._id}
            isUser={userId === event.tester._id}
            userId={userId}
            onClick={() => handleEventClick(event)}
          />
        ))
      ) : (
        <p>No events found.</p>
      )}
      {filteredEvents.length > JOBS_PER_PAGE && (
        <Pagination
          count={Math.ceil(filteredEvents.length / JOBS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      )}
    </div>
  );
};

export default AllEvents;
