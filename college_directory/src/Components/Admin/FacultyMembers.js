import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent, Snackbar, Alert } from '@mui/material';
import { Add, Delete, Edit, Email, Phone } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setFaculty } from '../../Redux/adminSlice';
import { getFacultyList, getUserList, getCourseList, enrollFaculty, updateFaculty, removeFaculty } from '../../API/admin';
import FacultyForm from "./FacultyForm";
import { getDepartments } from '../../API/student';
import SamplePic from "../../assets/AvatarImage.jpeg";

const FacultyMembers = () => {
  const dispatch = useDispatch();
  const [facultyList, setFacultyList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editFacultyId, setEditFacultyId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { error, isLoading, refetch } = useQuery('faculty', getFacultyList, {
    onSuccess: (data) => {
      setFacultyList(data?.data);
      dispatch(setFaculty(data?.data));
    },
  });

  const { data: userList } = useQuery('users', getUserList, {
    onSuccess: (data) => {

    },
  });
  const { data: departmentList } = useQuery('department', getDepartments, {
    onSuccess: (data) => {
    },
  });
  const { data: coursesList } = useQuery('courses', getCourseList, {
    onSuccess: (data) => {
    },
  });
  const updateMutation = useMutation(updateFaculty, {
    onSuccess: (response) => {
      const updatedList = facultyList?.filter(faculty => faculty?.userId !== response?.data?.userId);
      setFacultyList(updatedList);
      setSnackbarMessage('Faculty updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    onError: (error) => {
      setSnackbarMessage(`Error updating faculty: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
    onSettled: () => {
      refetch();
    }
  });
  const enrollMutation = useMutation(enrollFaculty, {
    onSuccess: (response) => {
      const updatedList = facultyList?.filter(faculty => faculty?.userId !== response?.data?.id);
      setFacultyList(updatedList);
      setSnackbarMessage('Faculty enrolled successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    onError: (error) => {
      setSnackbarMessage(`Error enrolling faculty: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
    onSettled: () => {
      refetch();
    }
  });

  const mutation = useMutation(removeFaculty, {
    onSuccess: (response) => {
      const updatedList = facultyList?.filter(faculty => faculty?.id !== response?.data?.id);
      setFacultyList(updatedList);
      setSnackbarMessage('Faculty removed successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    onError: (error) => {
      setSnackbarMessage(`Error removing faculty: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
    onSettled: () => {
      refetch();
    }
  });

  const handleDeleteFaculty = (studentId) => {
    mutation.mutate(studentId);
  };
  const handleAddStudent = () => {
    setShowForm(true);
    setEditFacultyId(null);
  };

  const handleEditFaculty = (studentId) => {
    setEditFacultyId(studentId);
    setShowForm(true);
  };

  const handleSubmit = (formData) => {

    if (editFacultyId) {
      const data = {
        departmentId: formData?.departmentId,
        courses: formData?.courses.map(courseId => ({ id: courseId })),
        officeHours: formData?.officeHours,
        user: {
          id: formData?.userId
        }
      };
      updateMutation.mutate(data);
    } else {
      const data = {
        departmentId: formData?.departmentId,
        courses: formData?.courses.map(courseId => ({ id: courseId })),
        officeHours: formData?.officeHours,
        user: {
          id: formData?.userId
        }
      };
      enrollMutation.mutate(data);
    }

    setShowForm(false);
  }


  const handleCancel = () => {
    setShowForm(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  }


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading students: {error.message}</div>;

  return (
    <Box>
      <Typography variant="h5">Faculty Members</Typography>
      <Button
        variant="contained"
        color="success"
        onClick={handleAddStudent}
        startIcon={<Add />}
        style={{ marginBottom: 20 }}
      >
        Faculty Enrollment
      </Button>
      <Dialog open={showForm} onClose={handleCancel}>
        <DialogTitle>{editFacultyId ? 'Edit Faculty Assign Course' : 'Faculty Assign Course'}</DialogTitle>
        <DialogContent>
          <FacultyForm
            userList={userList || []}
            departmentList={departmentList || []}
            coursesList={coursesList || []}
            initialValues={editFacultyId ? facultyList.find(faculty => faculty?.userId === editFacultyId) : {}}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Photo</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Role</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Department</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Courses</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Office Hours</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Contacts</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facultyList?.length > 0 ? (
            facultyList?.map((faculty) => (
              <TableRow key={faculty?.userId}>
                <TableCell>
                  <img
                    src={faculty?.photo || SamplePic}
                    alt="faculty"
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                  />
                </TableCell>
                <TableCell>{faculty?.user?.name}</TableCell>
                <TableCell>{faculty?.user?.role}</TableCell>
                <TableCell>{faculty?.departmentName}</TableCell>
                <TableCell>
                  <Typography>
                    {faculty?.courses?.map((course, index) => (
                      <React.Fragment key={index}>
                        {course?.title}
                        <br />
                      </React.Fragment>
                    ))}
                  </Typography>
                </TableCell>
                <TableCell>{faculty?.officeHours}</TableCell>
                <TableCell>
                  <Typography>
                    <Email style={{ marginRight: 8, fontSize: '18px' }} />{faculty?.user?.email}
                  </Typography>
                  <Typography>
                    <Phone style={{ marginRight: 8, fontSize: '18px' }} />{faculty?.user?.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton color="warning" onClick={() => handleEditFaculty(faculty?.userId)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteFaculty(faculty?.userId)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No faculties found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FacultyMembers;
