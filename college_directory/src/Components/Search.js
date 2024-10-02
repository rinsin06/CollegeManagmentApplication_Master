import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Alert, Snackbar, Card, CardContent } from '@mui/material';
import { getStudentSearch, getDepartments } from "../API/student";
import { useMutation } from 'react-query';
import { useSelector } from "react-redux";

const Search = () => {
  const [name, setName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [departments, setDepartments] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const user = useSelector((state) => state?.user?.userInfo);


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response);
      } catch (error) {
        setErrorMessage('Error fetching departments:');
        setOpenSnackbar(true);
      }
    };

    fetchDepartments();
  }, []);

  const { mutate: searchStudents, isLoading } = useMutation(
    (params) => getStudentSearch(params),
    {
      onSuccess: (data) => {
        if (data?.status === 200) {
          setSearchResults(data.data || []);
          setNoDataFound(false);
        } else if (data?.status === 404) {
          setSearchResults([]);
          setErrorMessage(data.data);
          setNoDataFound(true);
        }
      },
      onError: (error) => {
        setErrorMessage("Something went wrong! Please try again later.");
        setOpenSnackbar(true);
      },
    }
  );

  const handleSearch = () => {
    if (!name) {
      setErrorMessage("Name is required!");
      setOpenSnackbar(true);
      return;
    }
    setOpenSnackbar(false);
    const searchParams = {
      name,
      departmentId: selectedDepartment || undefined,
      year: selectedYear || undefined,
    };
    searchStudents(searchParams);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event?.target?.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event?.target?.value);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h4">Search</Typography>
      <TextField
        label="Enter Name"
        value={name}
        onChange={(e) => setName(e?.target?.value.trim())}
        fullWidth
        required
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="department-label">Select Department (Optional)</InputLabel>
        <Select
          labelId="department-label"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          fullWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {departments?.map((department) => (
            <MenuItem key={department?.id} value={department?.id}>
              {department?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Enter Year (Optional)"
        value={selectedYear}
        onChange={handleYearChange}
        fullWidth
        margin="normal"
        InputProps={{ inputProps: { min: 2000, max: 2100 } }}
      />

      <Button
        onClick={handleSearch}
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
        disabled={isLoading}
      >
        Search
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {noDataFound && (
        <Typography variant="h6" color="error" style={{ marginTop: 20 }}>
          {errorMessage}
        </Typography>
      )}
      <Box display="flex" flexDirection="column" marginTop={2}>
        {searchResults.length > 0 && searchResults.map((student) => (
          <Card key={student?.id} variant="outlined" style={{ marginBottom: 20 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                <strong>{student?.user?.name}</strong>
              </Typography>
              <Typography color="textSecondary">
                Department: {student?.departmentName}
              </Typography>
              <Typography color="textSecondary">
                Year: {student?.year}
              </Typography>
              <Typography color="textSecondary">
                Email: {student?.user?.email}
              </Typography>
              {/* {user?.role === "student" && <Typography color="textSecondary">
                Phone: {student?.user?.phone}
              </Typography>} */}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Search;
