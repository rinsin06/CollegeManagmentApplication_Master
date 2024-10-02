import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Profile from "./Profile";
import FacultyAdvisor from "./Faculties";
import Academics from "./Academics";
import Attendance from "./Attendance";
import Search from "../Search";
import Support from "./Support";

const StudentDashboard = () => {
  const [activeComponent, setActiveComponent] = React.useState("Profile");
  const list = [
    "Profile",
    "Faculties",
    "Academics",
    "Attendance",
    "Search",
    "Support",
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case "Profile":
        return <Profile />;
      case "Faculties":
        return <FacultyAdvisor />;
      case "Academics":
        return <Academics />;
      case "Attendance":
        return <Attendance />;
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

export default StudentDashboard;
