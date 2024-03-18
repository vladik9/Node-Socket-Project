import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from '../Components/MainPage/MainPage';
import SingIn from '../SingIn/SingIn';

// const root = ReactDOM.createRoot(document.getElementById('root'));


export default function Router() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SingIn />}>
          </Route>
          <Route>
            <Route path="/Data" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

