
import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, Snackbar, Alert } from '@mui/material';
import { Add, Email, Phone } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents } from '../../Redux/adminSlice';
import GradeForm from "./GradeForm";
import SamplePic from "../../assets/AvatarImage.jpeg";
import { assignAttendance, assignGrade, getAttendanceAndGrades, getFacultyProfile, getStudentList } from '../../API/faculty';

const Students = () => {
  const dispatch = useDispatch();
  const [studentList, setStudentList] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const {  error, isLoading, refetch } = useQuery('students', getStudentList, {
    onSuccess: (data) => {
      setStudentList(data);
      dispatch(setStudents(data?.data));
    },
  });

  const studentsStoreList = useSelector((state) => state.admin.students);


  const { data: courseList } = useQuery('courses', getFacultyProfile, {
    onSuccess: (data) => {
      // setStudentList(data?.data);
      // dispatch(setStudents(data?.data));
    },
  });
  const attendanceMutation = useMutation(assignAttendance, {
    onSuccess: (response) => {
      setSnackbarMessage('Student attendence added successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    onError: (error) => {
      setSnackbarMessage(`Error adding student attendance: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
    onSettled: () => {
      refetch();
    }
  });
  const gradeMutation = useMutation(assignGrade, {
    onSuccess: (response) => {
      setSnackbarMessage('Student grade added successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    onError: (error) => {
      setSnackbarMessage(`Error addig student grade: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
    onSettled: () => {
      refetch();
    }
  });

  const mutation = useMutation(getAttendanceAndGrades, {
    onSuccess: (response) => {
      const result = response?.data?.map(item => ({
        courseId: item?.course?.id,
        totalClasses: item?.totalClasses,
        classesAttended: item?.classesAttended,
        grade: item?.grade
      }));
      const facultyCourseIds = courseList?.courses.map(course => course?.id);
      const filteredResult = result?.filter(course => facultyCourseIds.includes(course?.courseId));
      setGradeList(filteredResult);
      setShowForm(true);
    },
    onError: (error) => {
      console.log(error)
      setSnackbarMessage(`Error getting student attendance and grade details: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    },
  });

  const handleGradeAttendance = (studentId) => {
    setEditStudentId(studentId);
    mutation.mutate(studentId);
  };

  const handleSubmit = (formData) => {
    const gradeList = formData?.grades.map(gradeItem => ({
      studentId: formData?.userId,
      courseId: gradeItem?.courseId,
      grade: gradeItem?.grade
    }));
    const attendanceList = formData?.grades.map(gradeItem => ({
      studentId: formData?.userId,
      courseId: gradeItem?.courseId,
      totalClasses: gradeItem?.totalSections,
      classesAttended: gradeItem?.attended
    }));
    gradeMutation.mutate(gradeList);
    attendanceMutation.mutate(attendanceList);
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
      <Typography variant="h5">Attendance and Grades</Typography>
      <Dialog open={showForm} onClose={handleCancel}>
        <DialogTitle>Assign Grade and Atendance to Student</DialogTitle>
        <DialogContent>
          <GradeForm
            gradeList={gradeList || []}
            coursesList={courseList?.courses || []}
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
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Enrolled Course</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Year</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Contacts</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList && studentList?.length > 0 ? (
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
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Add />}
                    style={{
                      marginRight: 16,
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      width: '160px',
                    }}
                    onClick={() => handleGradeAttendance(student?.userId)}
                  >
                    Assign Grade & Attendance
                  </Button>
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
