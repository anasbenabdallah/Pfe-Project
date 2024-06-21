import { useEffect, useState } from "react";
import axios from "axios";
import Event from "../../../../BrowsePage/Content/WorkCards/Event";
import CircularProgress from "@mui/material/CircularProgress";

const MyEvents = () => {
  const [tester, setTester] = useState();
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
      .then((data) => setTester(data.tester))
      .finally(() => setIsLoading(false));
  }, []);
  const noEventsMessageStyle = {
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
      {tester && tester.events && tester.events.length > 0 ? (
        tester.events.map((event, index) => (
          <Event
            id={event._id}
            key={index}
            isUser={true}
            title={event.title}
            description={event.description}
            imageURL={event.image}
            participants={event.participants}
            profilpic={tester.picturePath}
            userName={tester.testerName}
          />
        ))
      ) : (
        <div style={noEventsMessageStyle}>
          <p>You haven't added any events yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
