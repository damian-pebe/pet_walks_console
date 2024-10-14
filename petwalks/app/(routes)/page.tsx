"use client"; 
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import SignIn from "./auth/page";
import Dashboard from "./components/dashboard/page";

export default function Home() {
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
    // Loading state: display colored containers while checking auth status
    return (
      <div className="flex flex-col space-y-4 p-4">
        <div className="w-full h-200 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-200 bg-gray-300 animate-pulse"></div>
        <div className="w-full h-200 bg-gray-300 animate-pulse"></div>
      </div>
    );
  }

  
  return (

    <div>
      {user ? <Dashboard /> : <SignIn />}
    </div>
  );
}
