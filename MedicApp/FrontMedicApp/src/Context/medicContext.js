import React, { createContext, useState } from 'react';
import { loginApi, logoutApi } from '../api/api';
// Create a Context
export const MedicContext = createContext({
  isMedicLogged: "",
  isRememberMeChecked: "",
  currentMedic: "",
  handleIsRememberMeChecked: () => { },
  handleLogin: (loginInfo) => { },
  handleLogout: () => { },
  handleSearch: () => { }
  //this is not used just for admin to add new medics
  , handleRegister: () => { }
});

export const MedicContextProvider = (props) => {

  //all function goes here
  const [isMedicLogged, setIsMedicLogged] = useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [currentMedic, setCurrentMedic] = useState(null);
  const handleIsRememberMeChecked = () => { setIsRememberMeChecked(true); };

  const handleLogin = async (loginInfo) => {
    try {
      const res = await loginApi(loginInfo);

      // Check if the login response indicates invalid credentials
      if (!res.data || !res.data.medic.medicId) {
        alert("Invalid credentials");
        return;
      }
      setCurrentMedic(res.data);
      setIsMedicLogged(true);
    } catch (e) {
      // Handle error response
      if (e.response && e.response.status === 400) {
        alert("Invalid credentials");
        setIsMedicLogged(false);
      } else {
        console.log("Login error:", e);
        setIsMedicLogged(false);

        alert("An error occurred during login. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    setIsMedicLogged(false);
    const token = currentMedic.token;
    try {
      await logoutApi(token);
    } catch (error) { console.log(error); }

  };
  const handleSearch = () => { };
  const handleRegister = () => { };

  return (<MedicContext.Provider
    value={{
      isMedicLogged: isMedicLogged,
      isRememberMeChecked: isRememberMeChecked,
      currentMedic: currentMedic,
      handleIsRememberMeChecked: handleIsRememberMeChecked,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      handleSearch: handleSearch
      //this is not used just for admin to add new medics
      , handleRegister: handleRegister
    }}>
    {props.children}
  </MedicContext.Provider>
  );
};