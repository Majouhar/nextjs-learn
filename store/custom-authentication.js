"use client";

import Login from "@/components/auth/Login";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  useEffect(() => {
    function handleOrientationChange() {
      // console.log(isLandscapeOrientation(), isMobileDevice());
      if (isMobileDevice() && !isLandscapeOrientation()) {
        // Display a message to the user
        alert(
          "Please rotate your phone to landscape mode for a better experience."
        );
      }
    }
    // Function to check if the device is a mobile device
    function isMobileDevice() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }

    // Function to check if the device is in landscape orientation
    function isLandscapeOrientation() {
      return window.matchMedia("(orientation: landscape)").matches;
    }

    // Check if the device is mobile and in portrait orientation

    handleOrientationChange();

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {isAuthenticated ? children : <Login />}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
