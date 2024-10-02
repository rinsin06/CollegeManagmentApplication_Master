import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const GradeForm = ({ gradeList, coursesList, initialValues, onSubmit, onCancel }) => {

    const calculatePercentage = (attended, totalSections) => {
        if (!attended || !totalSections || isNaN(attended) || isNaN(totalSections) || totalSections === 0) {
            return '';
        }
        return ((attended / totalSections) * 100).toFixed(2);
    };
    const [formData, setFormData] = useState({
        ...initialValues,
        grades: gradeList?.length > 0
            ? gradeList?.map(grade => ({
                courseId: grade?.courseId,
                grade: grade?.grade,
                attended: grade?.classesAttended,
                totalSections: grade?.totalClasses,
                percentage: calculatePercentage(grade?.classesAttended, grade?.totalClasses)
            }))
            : coursesList?.map(course => ({
                courseId: course.id,
                grade: '',
                attended: '',
                totalSections: '',
                percentage: ''
            }))
    });

    const handleChange = (e, index, field) => {
        const newGrades = [...formData.grades];
        newGrades[index][field] = e.target.value;

        if (field === 'attended' || field === 'totalSections') {
            const attended = newGrades[index].attended;
            const totalSections = newGrades[index].totalSections;
            newGrades[index].percentage = calculatePercentage(attended, totalSections);
        }

        setFormData({ ...formData, grades: newGrades });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, userId: initialValues?.userId });
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>{formData?.user?.name}</Typography>
            <Typography variant="body1" gutterBottom>{formData?.departmentName}</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Course</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Attended Sections</TableCell>
                            <TableCell>Total Sections</TableCell>
                            <TableCell>Percentage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coursesList.map((course, index) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>
                                    <TextField
                                        name="grade"
                                        value={formData.grades[index]?.grade || ''}
                                        onChange={(e) => handleChange(e, index, 'grade')}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="attended"
                                        value={formData.grades[index]?.attended || ''}
                                        onChange={(e) => handleChange(e, index, 'attended')}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="totalSections"
                                        value={formData.grades[index]?.totalSections || ''}
                                        onChange={(e) => handleChange(e, index, 'totalSections')}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="percentage"
                                        value={formData.grades[index]?.percentage || ''}
                                        fullWidth
                                        disabled
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box marginTop={2}>
                <Button variant="contained" color="primary" type="submit" style={{ marginRight: 10 }}>
                    Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default GradeForm;
