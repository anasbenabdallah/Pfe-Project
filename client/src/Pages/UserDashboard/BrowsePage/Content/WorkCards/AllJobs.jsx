import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Event from "./Event";
import JobPopup from "./JobPopup";
import { Pagination, Button } from "@mui/material";
import SearchBar from "./SearchBar";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
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

  const handleJobClick = (event) => {
    setSelectedJob(event);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user._id);
    sendRequest()
      .then((data) =>
        setJobs(data.jobs.filter((event) => event.tester._id !== user._id))
      )
      .finally(() => setIsLoading(false));
  }, []);

  const filteredJobs = jobs
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
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
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
    <div className="all-jobs-container">
      <div>
        <SearchBar
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button onClick={handleSortClick}>
          Sort by {sortBy} {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
      </div>
      {selectedJob && (
        <JobPopup
          open={Boolean(selectedJob)}
          handleClose={() => setSelectedJob(null)}
          title={selectedJob.title}
          description={selectedJob.description}
          jobId={selectedJob._id}
          userId={userId}
        />
      )}
      {paginatedJobs.length > 0 ? (
        paginatedJobs.map((event, index) => (
          <Event
            key={index}
            id={event._id}
            title={event.title}
            description={event.description}
            imageURL={event.image}
            profilpic={event.tester.picturePath}
            participants={event.participants}
            userName={event.tester.companyName}
            companyID={event.tester._id}
            isUser={userId === event.tester._id}
            userId={userId}
            onClick={() => handleJobClick(event)}
          />
        ))
      ) : (
        <p>No events found.</p>
      )}
      {filteredJobs.length > JOBS_PER_PAGE && (
        <Pagination
          count={Math.ceil(filteredJobs.length / JOBS_PER_PAGE)}
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

export default AllJobs;
