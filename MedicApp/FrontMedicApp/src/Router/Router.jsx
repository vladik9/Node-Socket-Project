import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from '../Components/MainPage/MainPage';
import SingIn from '../SingIn/SingIn';
import { MedicContextProvider } from '../Context/medicContext';


export default function Router() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <MedicContextProvider>
          <Routes>
            <Route path="/" element={<SingIn />}>
            </Route>
            <Route>
              <Route path="/data" element={<MainPage />} />
            </Route>
          </Routes>
        </MedicContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

