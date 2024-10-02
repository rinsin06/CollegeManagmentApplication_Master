import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Paper
} from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userSignUp } from "../../API/user";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(10),
}));

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { email, phone, password, confirmPassword } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbarMessage("Invalid email format.");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setSnackbarMessage("Phone number must be 10 digits.");
      return false;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      return false;
    }

    return true;
  };
  const signUpMutation = useMutation(userSignUp, {
    onSuccess: () => {
      setSnackbarMessage("Sign-up successful!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/home/login");
      }, 1000);
    },
    onError: () => {
      setSnackbarMessage("Sign-up failed. Please try again.");
      setOpenSnackbar(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setOpenSnackbar(true);
      return;
    }
    const { confirmPassword, ...dataToSend } = formData;
    try {
      signUpMutation.mutate(dataToSend);
    } catch (error) {
      setSnackbarMessage("Sign-up failed. Please try again.");
      setOpenSnackbar(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <StyledPaper elevation={3}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Re-enter Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ marginTop: '80px' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarMessage === "Sign-up successful!" ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </StyledPaper>
  );
};

export default SignUp;
