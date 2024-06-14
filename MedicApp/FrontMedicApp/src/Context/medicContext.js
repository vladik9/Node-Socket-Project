import React, { createContext, useState } from 'react';
import {
  handleIsMedicLoggedToken,
  loginApi,
  logoutApi,
  searchByMedicId,
  searchByPatientId,
  searchNewPatientByPatientId
} from '../api/api';


export const MedicContext = createContext({
  isMedicLogged: "",
  isRememberMeChecked: "",
  currentMedic: "",
  patientList: [],
  currentPatient: [],
  requestNewData: "",
  handleIsRememberMeChecked: () => { },
  handleLogin: (loginInfo) => { },
  handleLogout: () => { },
  handleSearchByMedicId: (id) => { },
  handleSearchNewPatient: (id) => { },
  handleSearchByNewPatientId: (id) => { },
  handleIsMedicLogged: () => { },
  //this is not used just for admin to add new medics
  handleRegister: () => { }
});

export const MedicContextProvider = (props) => {

  //all function goes here
  const [isMedicLogged, setIsMedicLogged] = useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] =
    useState(localStorage.getItem("rememberMe") ? true : false);
  const [currentMedic, setCurrentMedic] = useState(null);
  const [patientList, setPatientList] = useState([]);
  const [currentPatient, setCurrentPatient] = useState([]);
  const [requestNewData, setRequestNewData] = useState(true);
  const handleIsRememberMeChecked = () => {
    setIsRememberMeChecked((prev) => !prev);
  };


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
      if (loginInfo.rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("token", res.data.token);

      }
      else localStorage.clear();
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
  const handleSearchByMedicId = async (id) => {
    const token = currentMedic.token;

    try {
      const assignedPatients = await searchByMedicId(id, token);
      const result = assignedPatients?.data || [];
      setPatientList(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchByPatientId = async (id) => {
    const token = currentMedic.token;
    try {
      const patientData = await searchByPatientId(id, token);
      const result = patientData?.data?.existingPatient || [];

      setCurrentPatient(result);
    } catch (error) {
      console.log(error);
    };
  };

  const handleSearchNewPatient = async (patientId) => {
    const token = currentMedic.token;
    const medicId = currentMedic.medic.medicId;
    try {
      const newPatientInfo = await searchNewPatientByPatientId(medicId, patientId, token);
      setRequestNewData(true);
      return newPatientInfo;
    } catch (error) {
      return error;
    }
  };

  const handleIsMedicLogged = async () => {
    const token = localStorage.getItem("token");
    try {
      const medic = await handleIsMedicLoggedToken(token);
      if (medic) {
        setIsMedicLogged(true);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const handleRegister = () => { };
  return (<MedicContext.Provider
    value={{

      isMedicLogged: isMedicLogged,
      isRememberMeChecked: isRememberMeChecked,
      currentMedic: currentMedic,
      patientList: patientList,
      currentPatient: currentPatient,
      handleIsRememberMeChecked: handleIsRememberMeChecked,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      handleSearchByMedicId: handleSearchByMedicId,
      handleSearchByPatientId: handleSearchByPatientId,
      handleSearchNewPatient: handleSearchNewPatient,
      handleIsMedicLogged: handleIsMedicLogged,
      requestNewData: requestNewData,
      setRequestNewData: setRequestNewData,
      //this is not used just for admin to add new medics
      handleRegister: handleRegister,

    }}>
    {props.children}
  </MedicContext.Provider>
  );
};
