import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userSlice";
import {
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { useMutation } from "react-query";
import { userLogin } from "../../API/user";
import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(10),
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const roles = [
    {
      value: "student",
      label: "Student",
    },
    {
      value: "faculty",
      label: "Faculty Member",
    },
    {
      value: "admin",
      label: "Administrator",
    },
  ];

  const mutation = useMutation(userLogin, {
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password };
    mutation.mutate(credentials, {
      onSettled: (result) => {
        if (result.status === 200) {
          const token = result?.data?.token;
          document.cookie = `jwtToken=${token}; path=/; max-age=${60 * 60 * 10};`;
          dispatch(setUser({ userInfo: result?.data, role: role }));
          setTimeout(() => {
            navigate(`/${role}`);
          }, 100);
        } else {
          setErrorMessage(result.data);
          setOpenSnackbar(true);
          navigate("/home/login");
        }
      },
    });
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography variant="h5">Login</Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Role"
            defaultValue="student"
            helperText="Please select your Role"
            required
            fullWidth
            margin="normal"
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </StyledPaper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
