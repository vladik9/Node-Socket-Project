import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from '../Components/MainPage/MainPage';
import SignIn from '../Components/SignIn/SignIn';
import { MedicContextProvider, MedicContext } from '../Context/medicContext';

export default function Router() {
  const { isUserLogged } = useContext(MedicContext);
  console.log("isUserLogged value " + isUserLogged);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!isUserLogged ? <SignIn /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isUserLogged ? <MainPage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
