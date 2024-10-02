import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, Dialog, DialogTitle, DialogContent, Snackbar, Alert } from '@mui/material';
import { Add, Delete, Edit, Email, Phone } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setStudents } from '../../Redux/adminSlice';
import { getStudentsList, getUserList, removeStudent, updateStudent, enrollStudent } from '../../API/admin';
import StudentForm from "./StudentForm";
import { getDepartments } from '../../API/student';
import SamplePic from "../../assets/AvatarImage.jpeg";

const Students = () => {
  const dispatch = useDispatch();
  const [studentList, setStudentList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { error, isLoading, refetch } = useQuery('students', getStudentsList, {
    onSuccess: (data) => {
      setStudentList(data?.data);
      dispatch(setStudents(data?.data));
    },
  });

  const { data: userList } = useQuery('users', getUserList, {
    onSuccess: (data) => {
    },
  });
  const { data: courseList } = useQuery('scourses', getDepartments, {
    onSuccess: (data) => {
    },
  });
  const updateMutation = useMutation(({ params, id }) => updateStudent(params, id), {
    onSuccess: (response) => {
      const updatedList = studentList.filter(student => student.id !== response.data.id);
      setStudentList(updatedList);
      setSnackbarMessage('Student updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    onError: (error) => {
      setSnackbarMessage(`Error updating student: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
    onSettled: () => {
      refetch();
    }
  });
  const enrollMutation = useMutation(enrollStudent, {
    onSettled: (response) => {
      if (response?.status === 201 || response?.status === 200) {
        const updatedList = studentList.filter(student => student?.userId !== response?.data?.userId);
        setStudentList(updatedList);
        setSnackbarMessage('Student enrolled successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(`Error enrolling student: ${error.message}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
      refetch();
    }
  });

  const mutation = useMutation(removeStudent, {
    onSuccess: (response) => {
      const updatedList = studentList.filter(student => student.id !== response.data.id);
      setStudentList(updatedList);
      setSnackbarMessage('Student removed successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    onError: (error) => {
      setSnackbarMessage(`Error removing student: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
    onSettled: () => {
      refetch();
    }
  });

  const handleDeleteStudent = (studentId) => {
    mutation.mutate(studentId);
  };
  const handleAddStudent = () => {
    setShowForm(true);
    setEditStudentId(null);
  };

  const handleEditStudent = (studentId) => {
    setEditStudentId(studentId);
    setShowForm(true);
  };

  const handleSubmit = (formData) => {
    if (editStudentId) {
      const data = {
        departmentId: formData?.departmentId,
        year: formData?.year,
        user: {
          id: formData?.userId
        }
      };
      updateMutation.mutate({ params: data, id: editStudentId });
    } else {
      const data = {
        departmentId: formData?.departmentId,
        year: formData?.year,
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
      <Typography variant="h5">Students</Typography>
      <Button
        variant="contained"
        color="success"
        onClick={handleAddStudent}
        startIcon={<Add />}
        style={{ marginBottom: 20 }}
      >
        Student Enrollment
      </Button>
      <Dialog open={showForm} onClose={handleCancel}>
        <DialogTitle>{editStudentId ? 'Edit Student Enrollment' : 'Enroll Student'}</DialogTitle>
        <DialogContent>
          <StudentForm
            userList={userList || []}
            coursesList={courseList || []}
            initialValues={editStudentId ? studentList.find(student => student?.userId === editStudentId) : {}}
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
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Enrolled Course</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Year</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Contacts</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList?.length > 0 ? (
            studentList?.map((student) => (
              <TableRow key={student?.userId}>
                <TableCell>
                  <img
                    src={student?.photo || SamplePic}
                    alt="student"
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                  />
                </TableCell>
                <TableCell>{student?.user?.name}</TableCell>
                <TableCell>{student?.user?.role}</TableCell>
                <TableCell>{student?.departmentName}</TableCell>
                <TableCell>{student?.year}</TableCell>
                <TableCell>
                  <Typography>
                    <Email style={{ marginRight: 8, fontSize: '18px' }} />{student?.user?.email}
                  </Typography>
                  <Typography>
                    <Phone style={{ marginRight: 8, fontSize: '18px' }} />{student?.user?.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton color="warning" onClick={() => handleEditStudent(student?.userId)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteStudent(student?.userId)}>
                    <Delete />
                  </IconButton>
                </TableCell>
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

export default Students;
