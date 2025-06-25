import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "./ui/components/layout/Layout/Layout.jsx";
import HomePage from "./ui/pages/RemindersPage.jsx";
import Register from "./ui/components/auth/Register/Register.jsx";
import Login from "./ui/components/auth/Login/Login.jsx";
import ProtectedRoute from "./ui/components/routing/ProtectedRoute/ProtectedRoute.jsx";
import ReminderDetails from "./ui/components/reminders/ReminderDetails/ReminderDetails.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route element={<ProtectedRoute/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="reminder/:id" element={<ReminderDetails/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;