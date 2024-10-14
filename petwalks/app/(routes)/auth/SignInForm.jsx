"use client";  // Indicate this is a client-side component in Next.js

import React, { useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  TextField,
  Button,
  Typography,
  Alert,
  AlertTitle,
  IconButton,
  Link,
  Checkbox,
  FormControlLabel,
  Box,
  Card,
} from "@mui/material";
import { useRouter } from "next/navigation";  // Use Next.js' useRouter

const LightModeIcon = "/logo_dark.png";
const DarkModeIcon = "/logo_light.png";

const SignInForm = ({ theme, setTheme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();  // Use Next.js' router

  const handleToggleDarkMode = () => {
    setTheme(!theme);
  };

  const signIn = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess("Login successful!");
        router.push("../dashboard");  // Use Next.js' router to navigate
      })
      .catch((err) => {
        setError("Login failed: " + err.message);
      });
  };

  return (
    <Box
      sx={{
        boxShadow: 20,
        borderRadius: 5,
        padding: 1,
      }}
    >
      <Card
        variant="outlined"
        style={{
          maxWidth: "600px",
          padding: "50px",
          backgroundColor: theme ? "#1C1C1C" : "#FAF3E0",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            color={theme ? "#F7F7F7" : "#1C1C1C"}
          >
            Log in
          </Typography>

          <IconButton onClick={handleToggleDarkMode}>
            {theme ? (
              <img src={LightModeIcon} width="24" height="24" />
            ) : (
              <img src={DarkModeIcon} width="24" height="24" />
            )}
          </IconButton>
        </div>
        <form onSubmit={signIn}>
          <Typography
            align="left"
            color={theme ? "#F7F7F7" : "#1C1C1C"}
            style={{ fontSize: "18px", marginTop: "20px" }}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            autoFocus
            required
            margin="normal"
            placeholder="your@email.com"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: { color: theme ? "#F7F7F7" : "#1C1C1C", fontSize: "16px" },
            }}
            InputLabelProps={{
              style: { color: theme ? "#F7F7F7" : "#1C1C1C", fontSize: "16px" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme ? "#B0BEC5" : "#B0BEC5",
                },
                "&:hover fieldset": {
                  borderColor: theme ? "#B0BEC5" : "#B0BEC5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme ? "#B0BEC5" : "#B0BEC5",
                },
              },
            }}
          />
          <Typography
            align="left"
            color={theme ? "#F7F7F7" : "#1C1C1C"}
            style={{ fontSize: "18px", marginTop: "20px" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type="password"
            placeholder="********"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { color: theme ? "#F7F7F7" : "#1C1C1C", fontSize: "16px" },
            }}
            InputLabelProps={{
              style: { color: theme ? "#F7F7F7" : "#1C1C1C", fontSize: "16px" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme ? "#B0BEC5" : "#B0BEC5",
                },
                "&:hover fieldset": {
                  borderColor: theme ? "#B0BEC5" : "#B0BEC5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme ? "#B0BEC5" : "#B0BEC5",
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              marginInline: "30px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  color={theme ? "#1C1C1C" : "#F7F7F7"}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label={
                <Typography
                  color={theme ? "#F7F7F7" : "#1C1C1C"}
                  style={{ fontSize: "16px" }}
                >
                  Remember me
                </Typography>
              }
            />
            <Link
              href="#"
              underline="hover"
              color={theme ? "#F7F7F7" : "#1C1C1C"}
            >
              <Typography style={{ fontSize: "16px" }}>
                Forgot your password?
              </Typography>{" "}
            </Link>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}
          >
            Log in
          </Button>

          {success && (
            <Alert
              severity="success"
              variant="filled"
              style={{
                marginTop: "20px",
                color: theme ? "#F7F7F7" : "#1C1C1C",
              }}
            >
              <AlertTitle>Success</AlertTitle>
              {success}
              Log in to Pet Walks Console successful
            </Alert>
          )}
          {error && (
            <Alert
              severity="error"
              variant="outlined"
              style={{
                marginTop: "20px",
                color: theme ? "#F7F7F7" : "#1C1C1C",
              }}
            >
              <AlertTitle>Error</AlertTitle>
              Something went wrong, check your credentials and try again
            </Alert>
          )}
        </form>
      </Card>
    </Box>
  );
};

export default SignInForm;
