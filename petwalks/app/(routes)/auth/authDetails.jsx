"use client";  // Indicate this is a client-side component in Next.js

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";  // Adjust the path if necessary
import { useRouter } from "next/navigation";  // Use Next.js' useRouter

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const router = useRouter();  // Use Next.js' router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      unsubscribe();  // Clean up listener on unmount
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        router.push("/");  //TODO
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <div>
      {authUser ? (
        <>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>NotLogged</p>
      )}
    </div>
  );
};

export default AuthDetails;
