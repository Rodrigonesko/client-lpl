import React from "react";
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/login/Login";
import Home from "./pages/home/home";
import UploadRn from "./pages/Rn/upload/UploadRn";
import Rns from "./pages/Rn/Rns/Rns";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";


const AppRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                {/* <ProtectedRoute path='/' element='<Home />' /> */}


                <Route exact path="/" element={<ProtectedRoute>
                    <Home />
                </ProtectedRoute>} />
                <Route exact path="/rn/upload" element={<ProtectedRoute>
                    <UploadRn />
                </ProtectedRoute>} />
                <Route exact path="/rn/rns" element={<ProtectedRoute>
                    <Rns />
                </ProtectedRoute>} />
            </Routes>
        </AuthProvider>

    )
}

export default AppRoutes