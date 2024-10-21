"use client"; // Indicate this is a client-side component in Next.js

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
import { useRouter } from "next/navigation"; // Use Next.js' useRouter
import { MoonIcon, SunIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignInForm = ({ theme, setTheme }) => {
  const { toast } = useToast()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter(); // Use Next.js' router

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
        toast({
          title: "Sign In successful",
          description: "Welcome to Pet Walks Console",
        });
      })
      .catch((err) => {
        setError("Login failed: " + err.message);
        toast({
          title: "Sign In to Pet Walks Console failed",
        });      });
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
          <img
            src="/images/logo192.png"
            width="60"
            height="60"
            alt="Logo"
            style={{ objectFit: "cover" }}
          />
          <Typography
            variant="h2"
            align="center"
            color={theme ? "#F7F7F7" : "#1C1C1C"}
          >
            SIGN IN
          </Typography>

          <IconButton
            onClick={handleToggleDarkMode}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer", // Change cursor to pointer on hover
              transition: "color 0.3s ease", // Smooth transition for color change
            }}
          >
            {theme ? (
              <SunIcon
                width={34}
                height={34}
                color="yellow"
                style={{ transition: "fill 0.3s ease" }}
              />
            ) : (
              <MoonIcon
                width={24}
                height={24}
                color="black"
                fill="black"
                style={{ transition: "fill 0.3s ease" }}
              />
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
