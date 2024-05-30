import React, { createContext, useState } from 'react';

// Create a Context
export const MedicContext = createContext({
  isUserLogged: "",
  isRememberMeChecked: "",
  handleIsRememberMeChecked: () => { },
  handleLogin: (loginInfo) => { },
  handleLogout: () => { },
  handleSearch: () => { }
  //this is not used just for admin to add new medics
  , handleRegister: () => { }


});

export const MedicContextProvider = (props) => {

  //all function goes here
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const handleIsRememberMeChecked = () => { setIsRememberMeChecked(true); };
  const handleLogin = (loginInfo) => {


  };

  const handleLogout = () => { setIsUserLogged(false); };
  const handleSearch = () => { };
  const handleRegister = () => { };

  return (<MedicContext.Provider
    value={{
      isUserLogged: isUserLogged,
      isRememberMeChecked: isRememberMeChecked,
      handleIsRememberMeChecked: handleIsRememberMeChecked,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      handleSearch: handleSearch
      //this is not used just for admin to add new medics
      , handleRegister: handleRegister

    }}>{props.children}
  </MedicContext.Provider>
  );
};