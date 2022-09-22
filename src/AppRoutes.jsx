import React from "react";
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/login/Login";
import Home from "./pages/home/home";
import UploadRn from "./pages/Rn/upload/UploadRn";
import UploadConfirmadas from "./pages/Rn/UploadConfirmadas/UploadConfirmadas";
import Rns from "./pages/Rn/Rns/Rns";
import Detalhes from "./pages/Rn/Detalhes/Detalhes";
import Todas from "./pages/Rn/Todas/Todas";
import ProtectedRoute from "./ProtectedRoute";

import UploadEntrevistas from './pages/TeleEntrevistas/Upload/UploadEntrevistas'

import UploadLiminar from "./pages/Liminares/Upload/UploadLiminar";
import AndamentoLiminar from "./pages/Liminares/Andamento/AndamentoLiminar";

import RnGraphs from "./pages/Admin/Graphs/Rn/RnGraphs";

import Create from "./pages/Admin/Create/Create";
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
                <Route exact path="/rn/uploadConfirmadas" element={<ProtectedRoute>
                    <UploadConfirmadas />
                </ProtectedRoute>} />
                <Route exact path="/rn/rns" element={<ProtectedRoute>
                    <Rns />
                </ProtectedRoute>} />
                <Route exact path="/rn/todas" element={<ProtectedRoute>
                    <Todas />
                </ProtectedRoute>} />
                <Route path="/rn/rns/:proposta" element={<ProtectedRoute>
                    <Detalhes />
                </ProtectedRoute>} />

                {/* Admin Routes*/}

                <Route exact path="/admin/criar" element={<ProtectedRoute>
                    <Create />
                </ProtectedRoute>} />
                <Route exact path="/admin/graphicos/rn" element={<ProtectedRoute>
                    <RnGraphs />
                </ProtectedRoute>} />

                {/* Tele entrevista Routes */}

                <Route exact path="/entrevistas/upload" element={<ProtectedRoute>
                    <UploadEntrevistas />
                </ProtectedRoute>} />

                {/* Liminares Routes */}

                <Route exact path="/liminares/upload" element={<ProtectedRoute>
                    <UploadLiminar />
                </ProtectedRoute>} />
                
                <Route exact path="/liminares/andamento" element={<ProtectedRoute>
                    <AndamentoLiminar />
                </ProtectedRoute>} />


            </Routes>
        </AuthProvider>

    )
}

export default AppRoutes