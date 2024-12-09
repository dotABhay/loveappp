"use client";

import { useState, useEffect } from "react";
import Homee from "./home";
import Login from "./login"; // Import Login component
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Import the auth object


export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true); // User is logged in
      } else {
        setUserLoggedIn(false); // User is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <div className="w-full h-full bg-pinkk">
      {userLoggedIn ? (
        <div className="">
          <Homee />
        </div>
      ) : (
        <Login/> // Show the login form if not logged in
      )}
    </div>
  );
}
