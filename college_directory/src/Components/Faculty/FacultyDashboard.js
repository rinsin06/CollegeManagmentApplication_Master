import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Profile from "./Profile";
import Students from "./Students";
import Courses from "./Courses";
import Search from "../Search";
import Support from "./Support";

const FacultyDashboard = () => {
  const [activeComponent, setActiveComponent] = React.useState("Profile");
  const list = [
    "Profile",
    "Students",
    "Courses",
    "Search",
    "Support",
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case "Profile":
        return <Profile />;
      case "Students":
        return <Students />;
      case "Courses":
        return <Courses />;
      case "Search":
        return <Search />;
      case "Support":
        return <Support />;
      default:
        return <Profile />;
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar setActiveComponent={setActiveComponent} list={list} />
      <Box flex="1" padding={2}>
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default FacultyDashboard;
