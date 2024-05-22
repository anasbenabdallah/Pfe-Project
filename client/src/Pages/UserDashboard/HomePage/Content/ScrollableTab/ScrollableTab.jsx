import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../../redux/actions/CategoryAction";
import { getFeedPosts } from "../../../../../redux/actions/SocialPostAction";

export default function ScrollableTabs() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue);
    dispatch(getFeedPosts(newValue));
  };

  const categories = useSelector((state) => state.Category.categories);

  useEffect(() => {
    dispatch(getCategories()).catch(() =>
      console.log("Error loading categories")
    );
  }, [dispatch]);

  return (
    <Paper variant="outlined">
      <Tabs
        value={selectedCategory}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab key="all" label="All" value="" color="black" />

        {categories.map((tab) => (
          <Tab key={tab._id} label={tab.name} value={tab.name} color="black" />
        ))}
      </Tabs>
    </Paper>
  );
}
