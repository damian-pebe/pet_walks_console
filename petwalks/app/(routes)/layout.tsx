"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar/NavBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import SignIn from "./auth/SignIn";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactElement;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <div className="w-full h-[200px] bg-gray-300 animate-pulse"></div>
        <div className="w-full h-[200px] bg-gray-300 animate-pulse"></div>
        <div className="w-full h-[200px] bg-gray-300 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full">
      {!user ? (
        <div className="w-full h-full">
          <SignIn />
        </div>
      ) : (
        <>
          <div className="hidden xl:block w-80 h-full xl:fixed">
            <Sidebar />
          </div>
          <div className="w-full xl:ml-80">
            <NavBar />
            <div className="p-6 bg-[#fafbfc] dark:bg-secondary">{children}</div>
          </div>
        </>
      )}
    </div>
  );
}
