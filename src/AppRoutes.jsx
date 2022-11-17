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

/* Elegibilidade */

import UploadElegibilidade from "./pages/Elegibilidade/Upload/UploadElegibilidade";
import TodosElegibilidade from "./pages/Elegibilidade/Todos/TodosElegibilidade";
import PreProcessamento from "./pages/Elegibilidade/PreProcessamento/PreProcessamento";
import CancelarElegibilidade from "./pages/Elegibilidade/Cancelar/CancelarElegibilidade";
import AnaliseDocumentos from "./pages/Elegibilidade/AnaliseDocumentos/AnaliseDocumentos";
import AnaliseElegibilidade from "./pages/Elegibilidade/Analise/AnaliseElegibilidade";

/* RSD */

import PainelProcessos from "./pages/Rsd/PainelProcessos/PainelProcessos";
import UploadRsd from "./pages/Rsd/UploadRsd/UploadRsd";
import FichaBeneficiario from "./pages/Rsd/FichaBeneficiario/FichaBeneficiario";
import EditarPedido from "./pages/Rsd/EditarPedido/EditarPedido";
import CriarPedido from "./pages/Rsd/CriarPedido/CriarPedido";
import CriarProtocolo from "./pages/Rsd/CriarProtocolo/CriarProtocolo";
import ProcessamentoPacote from "./pages/Rsd/ProcessamentoPacote/ProcessamentoPacote";
import CriarPedidoIndividual from "./pages/Rsd/CriarPedidoIndividual/CriarPedidoIndividual";
import OperadorasBeneficiario from "./pages/Rsd/OperadorasBeneficiario/OperadorasBeneficiario";
import CriarOperadoraBeneficiario from "./pages/Rsd/OperadorasBeneficiario/CriarOperadoraBeneficiario/CriarOperadoraBeneficiario";
import EditarOperadoraBeneficiario from "./pages/Rsd/OperadorasBeneficiario/EditarOperadoraBeneficiario/EditarOperadoraBeneficiario";
import ConcluidosRsd from "./pages/Rsd/ConcluidosRsd/ConcluidosRsd";
import RelatorioRsd from "./pages/Rsd/RelatorioRsd/RelatorioRsd";
import Agd from "./pages/Rsd/Agd/Agd";

/* -----------------  Tele Entrevistas ----------------- */

import UploadEntrevistas from './pages/TeleEntrevistas/Upload/UploadEntrevistas'
import Agendar from "./pages/TeleEntrevistas/Agenda/Agendar/Agendar";
import Agendado from "./pages/TeleEntrevistas/Agenda/Agendado/Agendado";
import Mensagens from "./pages/TeleEntrevistas/Agenda/Mensagens/Mensagens";

/* -----------------  Liminares ----------------- */

import UploadLiminar from "./pages/Liminares/Upload/UploadLiminar";
import AndamentoLiminar from "./pages/Liminares/Andamento/AndamentoLiminar";
import ReportLiminar from "./pages/Liminares/Report/ReportLiminar";

/* Projeto AJ */

import UploadAj from "./pages/ProjetoAj/Upload/UploadAj";
import AndamentoAj from "./pages/ProjetoAj/Andamento/AndamentoAj";
import ReportAj from "./pages/ProjetoAj/Report/ReportAj";

import RnGraphs from "./pages/Admin/Graphs/Rn/RnGraphs";
import LiminaresGraphs from "./pages/Admin/Graphs/Liminares/LiminaresGraphs";
import LiberacaoModulos from "./pages/Admin/LiberacaoModulos/LiberacaoModulos";

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
                <Route path="/rn/rns/:id" element={<ProtectedRoute>
                    <Detalhes />
                </ProtectedRoute>} />

                {/* Admin Routes*/}

                <Route exact path="/admin/criar" element={<ProtectedRoute>
                    <Create />
                </ProtectedRoute>} />
                <Route exact path="/admin/liberarModulos" element={<ProtectedRoute>
                    <LiberacaoModulos />
                </ProtectedRoute>} />
                <Route exact path="/admin/graphicos/rn" element={<ProtectedRoute>
                    <RnGraphs />
                </ProtectedRoute>} />
                <Route exact path="/admin/graphicos/liminares" element={<ProtectedRoute>
                    <LiminaresGraphs />
                </ProtectedRoute>} />

                {/* Tele entrevista Routes */}

                <Route exact path="/entrevistas/upload" element={<ProtectedRoute>
                    <UploadEntrevistas />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/agenda/agendar" element={<ProtectedRoute>
                    <Agendar />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/agenda/agendados" element={<ProtectedRoute>
                    <Agendado />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/agenda/mensagens" element={<ProtectedRoute>
                    <Mensagens />
                </ProtectedRoute>} />


                {/* Liminares Routes */}

                <Route exact path="/liminares/upload" element={<ProtectedRoute>
                    <UploadLiminar />
                </ProtectedRoute>} />
                <Route exact path="/liminares/andamento" element={<ProtectedRoute>
                    <AndamentoLiminar />
                </ProtectedRoute>} />
                <Route exact path="/liminares/report" element={<ProtectedRoute>
                    <ReportLiminar />

                </ProtectedRoute>} />
                <Route exact path="/liminares/uploadAj" element={<ProtectedRoute>
                    <UploadAj />
                </ProtectedRoute>} />
                <Route exact path="/liminares/andamentoAj" element={<ProtectedRoute>
                    <AndamentoAj />
                </ProtectedRoute>} />
                <Route exact path="/liminares/reportAj" element={<ProtectedRoute>
                    <ReportAj />
                </ProtectedRoute>} />

                {/* RSD */}

                <Route exact path="/rsd/PainelProcesso" element={<ProtectedRoute>
                    <PainelProcessos />
                </ProtectedRoute>} />
                <Route exact path="/rsd/UploadArquivo" element={<ProtectedRoute>
                    <UploadRsd />
                </ProtectedRoute>} />
                <Route path="/rsd/FichaBeneficiario/:mo" element={<ProtectedRoute>
                    <FichaBeneficiario />
                </ProtectedRoute>} />
                <Route path="/rsd/EditarPedido/:pedido" element={<ProtectedRoute>
                    <EditarPedido />
                </ProtectedRoute>} />
                <Route path="/rsd/CriarPedido/:protocolo" element={<ProtectedRoute>
                    <CriarPedido />
                </ProtectedRoute>} />
                <Route path="/rsd/CriarProtocolo/:mo" element={<ProtectedRoute>
                    <CriarProtocolo />
                </ProtectedRoute>} />
                <Route path="/rsd/ProcessamentoPacote/:mo/:idPacote" element={<ProtectedRoute>
                    <ProcessamentoPacote />
                </ProtectedRoute>} />
                <Route path="/rsd/CriarPedidoIndividual/" element={<ProtectedRoute>
                    <CriarPedidoIndividual />
                </ProtectedRoute>} />
                <Route path="/rsd/OperadoraBeneficiario/" element={<ProtectedRoute>
                    <OperadorasBeneficiario />
                </ProtectedRoute>} />
                <Route path="/rsd/OperadoraBeneficiario/Criar" element={<ProtectedRoute>
                    <CriarOperadoraBeneficiario />
                </ProtectedRoute>} />
                <Route path="/rsd/OperadoraBeneficiario/Editar/:id" element={<ProtectedRoute>
                    <EditarOperadoraBeneficiario />
                </ProtectedRoute>} />
                <Route path="/rsd/Concluidos" element={<ProtectedRoute>
                    <ConcluidosRsd />
                </ProtectedRoute>} />
                <Route path="/rsd/Relatorio" element={<ProtectedRoute>
                    <RelatorioRsd />
                </ProtectedRoute>} />
                <Route path="/rsd/agd" element={<ProtectedRoute>
                    <Agd />
                </ProtectedRoute>} />

                {/*Elegibilidade*/}

                <Route path="/elegibilidade/upload" element={<ProtectedRoute>
                    <UploadElegibilidade/>
                </ProtectedRoute>} />

            </Routes>
        </AuthProvider>

    )
}

export default AppRoutes