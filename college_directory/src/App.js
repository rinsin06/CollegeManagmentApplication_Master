import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Home/Login";
import SignUp from "./Components/Home/SignUp";
import FAQ from "./Components/Home/FAQ";
import Contact from "./Components/Home/Contact";
import StudentDashboard from "./Components/Students/StudentDashboard";
import FacultyDashboard from "./Components/Faculty/FacultyDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Carousel from "./Components/Home/Carousel";
import { Box } from "@mui/material";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, removeCookie] = useCookies(["jwtToken"]);
  const isLoggedIn = cookies.jwtToken ? true : false;

  const renderHomeContent = (component) => (
    <Box display="flex" justifyContent="space-between" height="100%">
      <Box width="50%" height="100%">
        <Carousel />
      </Box>
      <Box
        width="50%"
      >
        {component}
      </Box>
    </Box>
  );

  return (
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh" overflow="hidden">
        <Header isLoggedIn={isLoggedIn} removeCookie={removeCookie} />
        <Box flex="1" padding={2} overflow="hidden">
          <Routes>
            <Route path="/home/login" element={renderHomeContent(<Login />)} />
            <Route path="/home/signup" element={renderHomeContent(<SignUp />)} />
            <Route path="/home/FAQ" element={renderHomeContent(<FAQ />)} />
            <Route path="/home/contact" element={renderHomeContent(<Contact />)} />
            <Route path="/student" element={isLoggedIn ? <StudentDashboard /> : <Navigate to="/home/login" />} />
            <Route path="/faculty" element={isLoggedIn ? <FacultyDashboard /> : <Navigate to="/home/login" />} />
            <Route path="/admin" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/home/login" />} />
            <Route path="*" element={<Navigate to="/home/login" />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
