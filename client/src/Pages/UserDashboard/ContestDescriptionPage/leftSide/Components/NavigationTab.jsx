//;
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { getTesterChallenges } from "../../../../../redux/actions/ChallengeAction";
import { useSelector } from "react-redux";
import { selectTesterChallenges } from "../../../../../redux/reducers/ChallengeReducer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import getDeadlineDifference from "../../TopSide/deadlineModif";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const NavigationTab = ({ changeValue, value }) => {
  const { id } = useParams();
  const myData = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTesterChallenges(myData._id));
  }, []);
  const testerChallenges = useSelector(selectTesterChallenges);
  console.log("test", testerChallenges);

  let challenge;
  const isOwner = testerChallenges.some((c) => {
    if (c._id === id) {
      challenge = c;
      return true;
    }
  });

  const handleProgress = (card) => {
    if (getDeadlineDifference(card?.deadline) === "0 Days 0 Hours 0 Minutes")
      return true;
    return false;
  };
  console.log(handleProgress(challenge));

  console.log(isOwner);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={changeValue}
          aria-label="basic tabs example"
        >
          <Tab label="Description" />
          <Tab label="Participants" />
          {isOwner && handleProgress(challenge) && !challenge?.winner && (
            <Tab
              label="Choose Winner"
              style={{
                marginLeft: "auto",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "red",
                border: "1px solid red",
              }}
            />
          )}
        </Tabs>
      </Box>
    </Box>
  );
};
