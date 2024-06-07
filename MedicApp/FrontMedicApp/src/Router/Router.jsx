import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from '../Components/MainPage/MainPage';
import SignIn from '../Components/SignIn/SignIn';
import { MedicContext } from '../Context/medicContext';

export default function Router() {
  const { isMedicLogged } = useContext(MedicContext);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!isMedicLogged ? <SignIn /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isMedicLogged ? <MainPage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}