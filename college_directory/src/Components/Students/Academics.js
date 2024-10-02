import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { getStudentGrades } from '../../API/student';
import { useSelector } from 'react-redux';

const Academics = () => {

  const [gradeData, setGradeData] = useState();

  const user = useSelector((state) => state.student.profile);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentGrades(user.userId);
        setGradeData(data);
      } catch (error) {
        console.error('Error fetching student grades:', error);
      }
    };

    fetchData();
  }, [user.userId]);

  return (
    <Box>
      <Typography variant="h5" marginBottom={"1%"}>Course List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Course Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Grade</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {gradeData?.map((grade, id) => (
              <TableRow key={id}>
                <TableCell>{grade?.course?.title}</TableCell>
                <TableCell>{grade?.grade}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Academics;
