import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Support = () => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = () => {
    console.log(`Support message submitted: ${message}`);
    setMessage();
  };

  return (
    <Box>
      <Typography variant="h4">Support</Typography>
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
