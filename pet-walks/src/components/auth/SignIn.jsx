import React, { useState } from "react";
import SignInForm from "./SignInForm";
import { Typography } from "@mui/material";

const SignIn = () => {
  const [theme, setTheme] = useState(true);
  const darkImage =
    "https://img.freepik.com/free-vector/gradient-black-background-with-cubes_23-2149152315.jpg?t=st=1728462656~exp=1728466256~hmac=6d658f7dc8d2d02fb351a85dbff20b4685e3784dd91fabc2d214be40689256b8&w=1060";
  const lightImage =
    "https://img.freepik.com/free-vector/abstract-geometric-wireframe-background_52683-59421.jpg?w=1060&t=st=1728456716~exp=1728457316~hmac=7387be4c45bc444d0df7a25aec4c3eacd6f4ace4e6da15665165cff806e03602";

  const logoDark = "/logo_dark.png";
  const logoLight = "/logo_light.png";

  return (
    <div
      className="SignIn"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${theme ? darkImage : lightImage})`,
        // backgroundImage: `url(${darkImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        transition: "background-image 4s ease",
      }}
    >
      {/* Left-side content (light mode) */}
      {!theme && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: "40px",
            transition: "all 0.5s ease-in-out",
            opacity: 1,
            transform: "translateX(0)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            style={{
              fontWeight: 700,
              padding: "20px 0",
              color: "#333333",
              fontSize: "2.5rem",
              letterSpacing: "1.5px",
              lineHeight: "1.2",
            }}
          >
            Welcome to Pet Walks Console
          </Typography>

          <img
            src={logoLight}
            alt="Light Logo"
            style={{
              width: "260px",
              maxHeight: "260px",
              objectFit: "contain",
              margin: "0 auto",
              transition: "transform 3s ease-in-out, opacity 3s ease-in-out",
              opacity: 1,
              transform: "scale(1)",
            }}
          />
        </div>
      )}

<SignInForm theme={theme} setTheme={setTheme} />
      {theme && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginLeft: "40px",
            transition: "all 0.5s ease-in-out",
            opacity: 1,
            transform: "translateX(0)",
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

          <img
            src={logoDark}
            alt="Dark Logo"
            style={{
              width: "400px",
              maxHeight: "400px",
              objectFit: "contain",
              margin: "0 auto",
              transition: "transform 3s ease-in-out, opacity 3s ease-in-out",
              opacity: 1,
              transform: "scale(1)",
            }}
          />
        </div>
      )} 
    </div>
  );
};

export default SignIn;
