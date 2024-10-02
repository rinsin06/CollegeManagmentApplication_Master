
import React from 'react';
import { useQuery } from 'react-query';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getFacultyProfile } from '../../API/faculty';

const Courses = () => {
  const { data: courseList, isLoading, error } = useQuery('courses', getFacultyProfile, {
    onSuccess: (data) => {
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading students: {error.message}</div>;

  return (
    <Box>
      <Typography variant="h5">Courses</Typography>
      <Typography variant="body1" gutterBottom>{courseList?.departmentName}</Typography>
      <Typography variant="body1" gutterBottom>Office Hours : {courseList?.officeHours}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Course Subject</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Subject Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseList && courseList?.courses?.length > 0 ? (
            courseList?.courses?.map((course) => (
              <TableRow key={courseList?.userId}>
                <TableCell>{course?.title}</TableCell>
                <TableCell>{course?.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No students found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Courses;
