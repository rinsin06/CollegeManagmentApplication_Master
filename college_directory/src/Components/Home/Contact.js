import React, { useState } from "react";
import { Box, Typography, TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSnackbarMessage("All fields are required!");
      setOpenSnackbar(true);
      return;
    }
    setFormData({ name: "", email: "", message: "" });
    setSnackbarMessage("Your message has been sent!");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="h6">Support</Typography>
      <Typography variant="body1">
        For any technical assistance either call in the below number or send a
        mail to the below given mail id.
      </Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        General Enquiries
      </Typography>
      <Typography variant="body1">Phone: 9876543210</Typography>
      <Typography variant="body1">E-mail: support@abc.in</Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Address
      </Typography>
      <Typography variant="body1">
        ABC University College
        <br />
        Banglore, HSR Layout
        <br />
        Karnataka - 560102
        <br />
        India
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Send Message
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: '80px' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
