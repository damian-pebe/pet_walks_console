import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Your Firebase config
import { onAuthStateChanged } from "firebase/auth"; // Import required functions

const Wrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/Dashboard");
      } else {
        navigate("/LogIn");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return null;
};

export default Wrapper;
