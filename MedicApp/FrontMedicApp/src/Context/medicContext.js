import React, { createContext, useState, useContext } from 'react';

// Create a Context
export const MedicContext = createContext({
  isUserLogged: "",
  handleLogin: () => { },
  handleLogout: () => { },
  handleSearch: () => { }
  //this is not used just for admin to add new medics
  , handleRegister: () => { }


});

export const MedicContextProvider = (props) => {


  //all function goes here
  const [isUserLogged, setIsUserLogged] = useState(false);
  const handleLogin = () => {
    setIsUserLogged(true); console.log("in handleLogin ");
  };
  const handleLogout = () => { setIsUserLogged(false); };
  const handleSearch = () => { };
  const handleRegister = () => { };

  return (<MedicContext.Provider
    value={{
      isUserLogged: isUserLogged,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      handleSearch: handleSearch
      //this is not used just for admin to add new medics
      , handleRegister: handleRegister

    }}>{props.children}</MedicContext.Provider>
  );
};