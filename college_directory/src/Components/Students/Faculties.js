import React from 'react';
import { useQuery } from 'react-query';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getStudentFaculty } from '../../API/student';
import { Email, Phone } from '@mui/icons-material';
const FacultyAdvisor = () => {
  const { isLoading, isError, data } = useQuery(
    'facultyData',
    () => getStudentFaculty()
  );

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching data</Typography>;


  return (
    <Box>
      <Typography variant="h5" marginBottom={"1%"}>Faculties</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Photo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Office Hours</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Contacts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((advisor) => (
              <TableRow key={advisor?.user?.name}>
                <TableCell>
                  <img src={advisor?.photo} alt="Advisor" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                </TableCell>
                <TableCell>{advisor?.user?.name}</TableCell>
                <TableCell>{advisor?.departmentId}</TableCell>
                <TableCell>{advisor?.officeHours}</TableCell>
                <TableCell>
                  <Typography>
                    <Email style={{ marginRight: 8, fontSize: '18px' }} />{advisor?.user?.email} {/* Email icon */}
                  </Typography>
                  <Typography>
                    <Phone style={{ marginRight: 8, fontSize: '18px' }} />{advisor?.user?.phone} {/* Phone icon */}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FacultyAdvisor;