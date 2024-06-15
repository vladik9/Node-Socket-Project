import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LogIn from '../Components/LogIn/LogIn';
import MainPage from '../Components/MainPage/MainPage';
import { MedicContext } from '../Context/medicContext';

export default function Router() {
  const { isMedicLogged } = useContext(MedicContext);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!isMedicLogged ? <LogIn /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isMedicLogged ? <MainPage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
