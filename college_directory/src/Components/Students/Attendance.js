import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getStudentAttendance } from "../../API/student";
import { useSelector } from "react-redux";

const Attendance = () => {

  const user = useSelector((state) => state.student.profile);

  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentAttendance(user.userId);
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching student grades:', error);
      }
    };

    fetchData();
  }, [user.userId]);

  const calculatePercentage = (attended, total) => {
    const attendedNumber = parseFloat(attended);
    const totalNumber = parseFloat(total);
    if (isNaN(attendedNumber) || isNaN(totalNumber) || totalNumber <= 0) {
      return "N/A";
    }
    const percentage = (attendedNumber / totalNumber) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <Box>
      <Typography variant="h5" marginBottom={"1%"}>
        Attendance
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Course</TableCell>

              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Total Sections</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Attended Sections</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData?.map((attendance) => (
              <TableRow key={attendance?.id}>
                <TableCell>{attendance?.course?.title}</TableCell>

                <TableCell>{attendance?.totalClasses}</TableCell>
                <TableCell>{attendance?.classesAttended}</TableCell>
                <TableCell>
                  {calculatePercentage(
                    attendance?.classesAttended,
                    attendance?.totalClasses
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance;
