import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const StudentForm = ({ userList, coursesList, initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    setFormData(initialValues);
    setFormErrors({});
  }, [initialValues]);

  const handleChange = (e) => {
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
      errors.departmentId = 'Course Enrolled For is required';
    }
    if (!data.year) {
      errors.year = 'Year is required';
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
            >
              {userList.map((user) => (
                <MenuItem key={user?.id} value={user?.id}>{user?.name}</MenuItem>
              ))}
            </Select>
            {formErrors?.userId && <Typography variant="caption" color="error">{formErrors?.userId}</Typography>}
          </FormControl>
        }

        <FormControl fullWidth style={{ marginTop: 10 }} error={!!formErrors?.departmentId}>
          <TextField
            label="Course Enrolled For *"
            name="departmentId"
            value={formData?.departmentId || ''}
            onChange={handleChange}
            fullWidth
            required
            select
          >{coursesList.map((course) => (
            <MenuItem key={course?.id} value={course?.id}>{course?.name}</MenuItem>
          ))}
          </TextField>
          {formErrors?.departmentId && <Typography variant="caption" color="error">{formErrors?.departmentId}</Typography>}
        </FormControl>

        <FormControl fullWidth style={{ marginTop: 10 }} error={!!formErrors.year}>
          <TextField
            label="Year *"
            name="year"
            value={formData?.year || ''}
            onChange={handleChange}
            fullWidth
            required
          />
          {formErrors?.year && <Typography variant="caption" color="error">{formErrors?.year}</Typography>}
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

export default StudentForm;
