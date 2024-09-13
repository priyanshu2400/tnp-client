import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  Alert,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setUserRole } from "../state";
import { createAsyncThunk } from '@reduxjs/toolkit';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;

  const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData, { dispatch }) => {
      const response = await fetch(`${backendServer}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to sign in');
      }
  
      const data = await response.json();
  
      dispatch(setUser(data.email));
      dispatch(setUserRole(data.role));
  
      return data;
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    console.log("Request received");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (isSignUp) {
      const confirmPassword = event.target.confirmPassword.value;
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!role) {
        setError("Role is required");
        return;
      }

      if (!registrationNumber) {
        setError("Registration number is required");
        return;
      }

      // Signup logic
      const signupData = { email, password, name, role, registrationNumber };
      try {
        console.log("Signing up");
        const response = await fetch(`${backendServer}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });
        if (!response.ok) {
          throw new Error("Failed to sign up");
        }

        const data = await response.json();
        dispatch(setUser(email));
        dispatch(setUserRole(role));
        setIsSignUp(false);
      } catch (error) {
        setError(error.message);
      }
    } else {
      // Login logic
      const loginData = { email, password };
      try {
        await dispatch(loginUser(loginData)).unwrap();
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('https://images.shiksha.com/mediadata/images/1606461255php4NobaM.jpeg')`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {isSignUp && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    select
                    id="role"
                    label="Role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ flex: 1 }}
                  >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </TextField>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="registrationNumber"
                    label="Registration Number"
                    name="registrationNumber"
                    autoComplete="registration-number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    sx={{ flex: 1 }}
                  />
                </Box>
              </>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus={!isSignUp}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Link href="#" variant="body2" onClick={toggleSignUp}>
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
