import React from "react";
import ReactDOM from "react-dom/client";
import Form from "./components/Login";
import App from "./App";
import EnterDetails from "./components/DetailsForm";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResponsiveDrawer from "./components/Dashboard";
import SignUp from "./components/Signup";
import Error from "./components/Error";
import Team from "./components/Team";
import Search from "./components/Search";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="detailsform" element={<EnterDetails/>}/>
        <Route path="login" element={<Form />} />
        <Route path="/" element={<App/>} />
        <Route path="dashboard" element={<ResponsiveDrawer/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="error" element={<Error/>} />
        <Route path="team" element={<Team/>} />
        <Route path="search" element={<Search/>} />
     

      </Routes>
    </BrowserRouter>
    </>
);
