import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserdataContext = createContext(null);

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [selectImg, setSelectImg] = useState(null);
  const [selectBackendImg, setSelectBackendImg] = useState(null);

  // ✅ Fetch current user from backend
  const handleCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/user/currunt-user",
        { withCredentials: true },
      );

      setUserData(res.data.user || null);
      console.log("Current User:", res.data.user);
    } catch (error) {
      console.log(
        "Error on user context:",
        error.response?.data || error.message,
      );
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    selectImg,
    setSelectImg,
    selectBackendImg,
    setSelectBackendImg,
    loading, // ✅ export loading
    refreshUser: handleCurrentUser, // optional helper to refetch user
  };

  return (
    <UserdataContext.Provider value={value}>
      {children}
    </UserdataContext.Provider>
  );
};

export default UserContext;
