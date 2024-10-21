"use client"; // This ensures the component is treated as a Client Component
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import { Typography } from "@mui/material";


const SignIn = () => {
  const [theme, setTheme] = useState(true);
  const darkImage =
    "/images/dark_mode.png";
  const lightImage =
    "/images/light_mode.png";



  return (
    <div
      className="SignIn"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap", // Allows wrapping for small screens
        backgroundImage: `url(${theme ? darkImage : lightImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
        padding: "20px", // Adds padding for mobile devices
      }}
    >
      {/* Left-side content (light mode) */}
      {!theme && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "40px",
            transition: "all 2s ease-in-out",
            opacity: 1,
            transform: "translateX(0)",
            textAlign: "center", // Center content on smaller screens
            maxWidth: "100%", // Allow it to fill the width on smaller screens
          }}
        >
          <Typography
            variant="h4"
            align="center"
            style={{
              fontWeight: 700,
              padding: "20px 0",
              color: "#000000",
              fontSize: "2.5rem",
              letterSpacing: "1.5px",
              lineHeight: "1.2",
            }}
          >
            Welcome to Pet Walks Console
          </Typography>

        
        </div>
      )}

      <SignInForm theme={theme} setTheme={setTheme} />

      {theme && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "40px",
            transition: "all 2s ease-in-out",
            opacity: 1,
            transform: "translateX(0)",
            textAlign: "center", // Center content on smaller screens
            maxWidth: "100%", // Allow it to fill the width on smaller screens
          }}
        >
          <Typography
            variant="h4"
            align="center"
            style={{
              fontWeight: 700,
              padding: "20px 0",
              color: "#ffffff",
              fontSize: "2.5rem",
              letterSpacing: "1.5px",
              lineHeight: "1.2",
            }}
          >
            Welcome to Pet Walks Console
          </Typography>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .SignIn {
            flex-direction: column; // Stacks elements vertically
          }
          /* Dark mode: Move text above the form */
          ${theme
            ? `
          .SignIn > div:last-child {
            order: -1; /* Move the dark mode text above the form */
          }`
            : `
          /* Light mode: Move text below the form */
          .SignIn > div:first-child {
            order: 1; /* Move the light mode text below the form */
          }`}
        }
      `}</style>
    </div>
  );
};

export default SignIn;
