import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Support = () => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = () => {
    setMessage();
  };

  return (
    <Box>
      <Typography variant="h4">Support Requests</Typography>
      <TextField
        label="Message"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
    </Box>
  );
};

export default Support;
