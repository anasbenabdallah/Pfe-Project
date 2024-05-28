import { useEffect, useState } from "react";
import axios from "axios";
import Event from "../../../../BrowsePage/Content/WorkCards/Event";
import CircularProgress from "@mui/material/CircularProgress";

const MyJobs = () => {
  const [tester, setCompany] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const id = JSON.parse(localStorage.getItem("user"))._id;

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:8000/event/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest()
      .then((data) => setCompany(data.tester))
      .finally(() => setIsLoading(false));
  }, []);
  const noJobsMessageStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    fontSize: "2rem",
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
    <div>
      {tester && tester.jobs && tester.jobs.length > 0 ? (
        tester.jobs.map((event, index) => (
          <Event
            id={event._id}
            key={index}
            isUser={true}
            title={event.title}
            description={event.description}
            imageURL={event.image}
            participants={event.participants}
            profilpic={tester.picturePath}
            userName={tester.companyName}
          />
        ))
      ) : (
        <div style={noJobsMessageStyle}>
          <p>You haven't added any jobs yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
