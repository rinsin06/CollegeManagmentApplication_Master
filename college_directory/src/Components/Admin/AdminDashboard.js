import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Dashboard from "./Dashboard";
import Students from "./Students";
import FacultyMembers from "./FacultyMembers";
import Search from "../Search";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = React.useState("Dashboard");
  const list = ["Dashboard", "Students", "FacultyMembers", "Search"];
  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Students":
        return <Students />;
      case "FacultyMembers":
        return <FacultyMembers />;
      case "Search":
        return <Search />;
      default:
        return <Dashboard />;
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

export default AdminDashboard;
