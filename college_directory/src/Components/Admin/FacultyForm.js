import React, { useState, useEffect } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Chip, Input, FormHelperText } from '@mui/material';

const FacultyForm = ({ userList, departmentList, coursesList, initialValues, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        setFormData(initialValues);
        setFormData({
            ...initialValues,
            courses: initialValues?.courses?.map(course => course?.id) || []
        });
        setFormErrors({});
    }, [initialValues]);

    useEffect(() => {
        if (formData.departmentId) {
            const filtered = coursesList.filter(course => course.departmentId === formData.departmentId);
            setFilteredCourses(filtered);
        } else {
            setFilteredCourses([]);
        }
    }, [formData.departmentId, coursesList]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "departmentId")
            setFormData({ ...formData, courses: [] });

        setFormData({ ...formData, [name]: value });
    };

    const handleMultiSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        onSubmit(formData);
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.userId) {
            errors.userId = 'User is required';
        }
        if (!data.departmentId) {
            errors.departmentId = 'Department is required';
        }
        if (!data.officeHours) {
            errors.officeHours = 'Office Hours is required';
        }
        if (!data.courses || data.courses.length === 0) {
            errors.courses = 'Courses are required';
        }

        return errors;
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                {initialValues?.userId ?
                    <TextField
                        label="Name"
                        name="name"
                        value={formData?.user?.name}
                        fullWidth
                        required
                        disabled
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    :
                    <FormControl fullWidth style={{ marginTop: 10 }} error={!!formErrors?.userId}>
                        <InputLabel id="select-user-label">Select User *</InputLabel>
                        <Select
                            labelId="select-user-label"
                            value={formData?.userId || ''}
                            name="userId"
                            onChange={handleChange}
                            required
                            margin='normal'
                        >
                            {userList?.map((user) => (
                                <MenuItem key={user?.id} value={user?.id}>{user?.name}</MenuItem>
                            ))}
                        </Select>
                        {formErrors?.userId && <FormHelperText error>{formErrors?.userId}</FormHelperText>}
                    </FormControl>
                }
                <FormControl fullWidth style={{ marginTop: 10 }} error={!!formErrors?.departmentId}>
                    <InputLabel id="select-department-label">Select Department *</InputLabel>
                    <Select
                        labelId="select-department-label"
                        value={formData?.departmentId || ''}
                        name="departmentId"
                        onChange={handleChange}
                        required
                        margin='normal'
                    >
                        {departmentList?.map((department) => (
                            <MenuItem key={department?.id} value={department?.id}>{department?.name}</MenuItem>
                        ))}
                    </Select>
                    {formErrors?.departmentId && <FormHelperText error>{formErrors?.departmentId}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth style={{ marginTop: 10 }} error={!!formErrors?.courses}>
                    <InputLabel id="select-courses-label">Select Courses *</InputLabel>
                    <Select
                        labelId="select-courses-label"
                        multiple
                        value={formData?.courses || []}
                        name="courses"
                        margin='dense'
                        onChange={handleMultiSelectChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((id) => {
                                    const course = coursesList?.find(course => course?.id === id);
                                    return <Chip key={id} label={course?.title} style={{ margin: 2 }} />;
                                })}
                            </div>
                        )}
                        required
                    >
                        {filteredCourses.map((course) => (
                            <MenuItem key={course?.id} value={course?.id}>
                                {course?.title}
                            </MenuItem>
                        ))}
                    </Select>
                    {formErrors?.courses && <FormHelperText error>{formErrors?.courses}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth style={{ marginTop: 10 }} error={!!formErrors?.officeHours}>
                    <TextField
                        label="Office Hours *"
                        name="officeHours"
                        value={formData?.officeHours || ''}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    {formErrors?.officeHours && <FormHelperText error>{formErrors?.officeHours}</FormHelperText>}
                </FormControl>

                <Box marginTop={2}>
                    <Button variant="contained" color="primary" type="submit" style={{ marginRight: 10 }}>
                        Save
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default FacultyForm;
