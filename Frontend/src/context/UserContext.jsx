import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserdataContext = createContext(null);

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [selectImg, setSelectImg] = useState(null);
  const [selectBackendImg, setSelectBackendImg] = useState(null);
  const handleCurrentUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/user/currunt-user",
        { withCredentials: true },
      );

      setUserData(res.data.user);
      console.log(res.data.user);
    } catch (error) {
      console.log(
        "Error on user context:",
        error.response?.data || error.message,
      );
      setUserData(null);
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
  };

  return (
    <UserdataContext.Provider value={value}>
      {children}
    </UserdataContext.Provider>
  );
};

export default UserContext;
