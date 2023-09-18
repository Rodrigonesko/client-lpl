import React from "react";
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/login/Login";
import Home from "./pages/home/home";
import UploadRn from "./pages/Rn/upload/UploadRn";
import Detalhes from "./pages/Rn/Detalhes/Detalhes";
import Todas from "./pages/Rn/Todas/Todas";
import ProtectedRoute from "./ProtectedRoute";


/* User */

import Profile from "./pages/User/Perfil/Profile";
import MyProduction from "./pages/User/Production/MyProduction";
import EditInfoUser from "./pages/User/EditInfo/EditInfoUser";

/* Modulo de Ferias*/

import SolicitacaoFerias from "./pages/Ferias/Solicitacao/SolicitacaoFerias";

/* Elegibilidade */

import UploadElegibilidade from "./pages/Elegibilidade/Upload/UploadElegibilidade";
import AnaliseDocumentos from "./pages/Elegibilidade/AnaliseDocumentos/AnaliseDocumentos";
import SemDocumentos from "./pages/Elegibilidade/SemDocumentos/SemDocumentos";
import AnaliseElegibilidade from "./pages/Elegibilidade/Analise/AnaliseElegibilidade";
import CancelarElegibilidade from "./pages/Elegibilidade/Cancelar/CancelarElegibilidade";
import AnaliseElegibilidadeDetalhes from "./pages/Elegibilidade/AnaliseDetalhes/AnaliseElegibilidadeDetalhes";
import TodosElegibilidade from "./pages/Elegibilidade/Todos/TodosElegibilidade";
import ProducaoElegibilidade from "./pages/Elegibilidade/ProducaoElegibilidade/ProducaoElegibilidade";
import DevolvidasElegibilidade from "./pages/Elegibilidade/Devolvidas/Devolvidas";
import PropostasAmil from "./pages/Elegibilidade/PropostasAmil/PropostasAmil";
import Divergencias from "./pages/Elegibilidade/Divergencias/Divergencias";
import PlanosBlacklist from "./pages/Elegibilidade/PlanosBlacklist/PlanosBlacklist";

/* ELegibilidade PME */

import UploadElegibilidadePme from "./pages/Elegibilidade/PME/upload/UploadElegibilidadePme";
import TodosElegibilidadePme from "./pages/Elegibilidade/PME/Todos/TodosElegibilidadePme";
import DetalhesElegibilidadePme from "./pages/Elegibilidade/PME/Detalhes/DetalhesElegibilidadePme";
import AndamentoElegibilidadePme from "./pages/Elegibilidade/PME/Andamento/AndamentoElegibilidadePme";

/* RSD */

import PainelProcessos from "./pages/Rsd/PainelProcessos/PainelProcessos";
import UploadRsd from "./pages/Rsd/UploadRsd/UploadRsd";
import UploadQuarentena from "./pages/Rsd/Upload/UploadQuarentena";
import FichaBeneficiario from "./pages/Rsd/FichaBeneficiario/FichaBeneficiario";
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
import FormasPagamento from "./pages/Rsd/OperadorasBeneficiario/FormasPagamento/FormasPagamento";
import Finalizacoes from "./pages/Rsd/OperadorasBeneficiario/Finalizacoes/Finalizacoes";
import FichaBeneficiarioConcluidos from "./pages/Rsd/FichaBeneficiarioConcluidos/FichaBeneficiarioConcluidos";
import ProducaoDiariaRsd from "./pages/Rsd/ProducaoDiaria/ProducaoDiariaRsd";
import BaixaAgd from "./pages/Rsd/BaixaAgd/BaixaAgd";

/* -----------------  Tele Entrevistas ----------------- */

import UploadEntrevistas from './pages/TeleEntrevistas/Upload/UploadEntrevistas'
import Agendar from "./pages/TeleEntrevistas/Agenda/Agendar/Agendar";
import Agendado from "./pages/TeleEntrevistas/Agenda/Agendado/Agendado";
import Mensagens from "./pages/TeleEntrevistas/Agenda/Mensagens/Mensagens";
import Formulario from "./pages/TeleEntrevistas/Formulario/Formulario";
import EntrevistasRealizadas from "./pages/TeleEntrevistas/EntrevistasRealizadas/EntrevistasRealizadas";
import EditarEntrevista from "./pages/TeleEntrevistas/EditarEntrevista/EditarEntrevista";
import Anexos from "./pages/TeleEntrevistas/Agenda/Anexos/Anexos";
import Horarios from "./pages/TeleEntrevistas/Agenda/Horarios/Horarios";
import FaturamentoEntrevistas from "./pages/TeleEntrevistas/FaturamentoEntrevistas/FaturamentoEntrevistas";
import ReportTeleEntrevistas from "./pages/TeleEntrevistas/ReportTeleEntrevistas/ReportTeleEntrevistas";
import ProducaoEntrevistas from "./pages/TeleEntrevistas/Producao/ProducaoEntrevistas";
import ReportAgendadas from "./pages/TeleEntrevistas/ReportAgendadas/ReportAgendadas";
import ProducaoDiariaTele from "./pages/TeleEntrevistas/ProducaoDiaria/ProducaoDiariaTele";
import AdicionarCid from "./pages/TeleEntrevistas/AdicionarCid/AdicionarCid";
import Implantacao from "./pages/TeleEntrevistas/Agenda/Implantacao/Implantacao";

import NaoEnviados from "./pages/TeleEntrevistas/Mensagens/NaoEnviados/NaoEnviados";
import Ajustar from "./pages/TeleEntrevistas/Mensagens/Ajustar/Ajustar";
import Enviados from "./pages/TeleEntrevistas/Mensagens/Enviados/Enviados";
import ErroAoEnviar from "./pages/TeleEntrevistas/Mensagens/ErroAoEnviar/ErroAoEnviar";
import AtendimentoHumanizado from "./pages/TeleEntrevistas/Mensagens/NecessárioAtendimento/AtendimentoHumanizado";
import RespostasJanelasHorarios from "./pages/TeleEntrevistas/Mensagens/RespostasJanelasHorarios/RespostasJanelasHorarios";
import Chat from "./pages/TeleEntrevistas/Mensagens/Chat/Chat";
import Conversas from "./pages/TeleEntrevistas/Mensagens/Conversas/Conversas";
import WhatsappTwilio from "./pages/TeleEntrevistas/Mensagens/WhatsappTwilio/WhatsappTwilio";
import ChatTwilio from "./pages/TeleEntrevistas/Mensagens/Chat/ChatTwilio";

import Dicionario from "./pages/TeleEntrevistas/Dicionario/Dicionario";

import Pdf2 from "./pages/TeleEntrevistas/Pdf/Pdf2";
import MigracaoTele from "./pages/TeleEntrevistas/Migracao/MigracaoTele";


/* Urgencia Emergencia */

import UploadUrgenciaEmergencia from "./pages/UrgenciaEmergencia/Upload/UploadUrgenciaEmergencia";
import UrgenciaEmergencia from "./pages/UrgenciaEmergencia/UrgenciaEmergencia/UrgenciaEmergencia";
import UrgenciaEmergenciaDetalhes from "./pages/UrgenciaEmergencia/UrgenciaEmergenciaDetalhes/UrgenciaEmergenciaDetalhes";
import UrgenciaEmergenciaProducao from "./pages/UrgenciaEmergencia/Producao/UrgenciaEmergenciaProducao";
import UrgenciaEmergenciaTodos from "./pages/UrgenciaEmergencia/Todos/UrgenciaEmergenciaTodos";
import UrgenciaEmergenciaAnexar from "./pages/UrgenciaEmergencia/Anexar/UrgenciaEmergenciaAnexar";

/* Admin */

import LiberacaoModulos from "./pages/Admin/LiberacaoModulos/LiberacaoModulos";
import ResetPassword from "./pages/Admin/ResetPassword/ResetPassword";
import RelatorioProdutividade from "./pages/Admin/RelatorioProdutividade/RelatorioProdutividade";
import ControlePoliticas from "./pages/Admin/ControlePoliticas/ControlePoliticas";

/* Controle ativicades  */

import ControleAtividades from "./pages/ControleAtividades/ControleAtividades";

import Create from "./pages/Admin/Create/Create";
import { AuthProvider } from "./context/AuthContext";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                {/*Modulo de Ferias*/}
                <Route exact path="/solicitacaoFerias" element={<ProtectedRoute>
                    <SolicitacaoFerias />
                </ProtectedRoute>} />

                {/* <ProtectedRoute path='/' element='<Home />' /> */}



                <Route exact path="/" element={<ProtectedRoute>
                    <Home />
                </ProtectedRoute>} />
                <Route exact path="/rn/upload" element={<ProtectedRoute>
                    <UploadRn />
                </ProtectedRoute>} />
                <Route exact path="/rn/todas" element={<ProtectedRoute>
                    <Todas />
                </ProtectedRoute>} />
                <Route path="/rn/rns/:id" element={<ProtectedRoute>
                    <Detalhes />
                </ProtectedRoute>} />

                {/* User Routes*/}

                <Route path="/profile" element={<ProtectedRoute>
                    <Profile />
                </ProtectedRoute>} />
                <Route path="/profile/edit" element={<ProtectedRoute>
                    <EditInfoUser />
                </ProtectedRoute>} />
                <Route path="/profile/minhaProducao/:name" element={<ProtectedRoute>
                    <MyProduction />
                </ProtectedRoute>} />


                {/* Admin Routes*/}

                <Route exact path="/admin/criar" element={<ProtectedRoute>
                    <Create />
                </ProtectedRoute>} />
                <Route exact path="/admin/liberarModulos" element={<ProtectedRoute>
                    <LiberacaoModulos />
                </ProtectedRoute>} />
                <Route exact path="/admin/resetPassword" element={<ProtectedRoute>
                    <ResetPassword />
                </ProtectedRoute>} />
                <Route exact path="/admin/relatorioProdutividade" element={<ProtectedRoute>
                    <RelatorioProdutividade />
                </ProtectedRoute>} />
                <Route exact path="/admin/controlePoliticas" element={<ProtectedRoute>
                    <ControlePoliticas />
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
                <Route exact path="/entrevistas/formulario/:id" element={<ProtectedRoute>
                    <Formulario />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/propostas" element={<ProtectedRoute>
                    <EntrevistasRealizadas />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/propostas/editar/:id" element={<ProtectedRoute>
                    <EditarEntrevista />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/faturamento" element={<ProtectedRoute>
                    <FaturamentoEntrevistas />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/faturamento" element={<ProtectedRoute>
                    <FaturamentoEntrevistas />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/agenda/horarios" element={<ProtectedRoute>
                    <Horarios />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/agenda/anexos" element={<ProtectedRoute>
                    <Anexos />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/report" element={<ProtectedRoute>
                    <ReportTeleEntrevistas />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/producao" element={<ProtectedRoute>
                    <ProducaoEntrevistas />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/reportAgendadas" element={<ProtectedRoute>
                    <ReportAgendadas />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/producaoDiaria" element={<ProtectedRoute>
                    <ProducaoDiariaTele />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/cid/adicionar" element={<ProtectedRoute>
                    <AdicionarCid />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/implantacao" element={<ProtectedRoute>
                    <Implantacao />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/NaoEnviados" element={<ProtectedRoute>
                    <NaoEnviados />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/Ajustar" element={<ProtectedRoute>
                    <Ajustar />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/Enviados" element={<ProtectedRoute>
                    <Enviados />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/ErroAoEnviar" element={<ProtectedRoute>
                    <ErroAoEnviar />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/AtendimentoHumanizado" element={<ProtectedRoute>
                    <AtendimentoHumanizado />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/RespostasJanelas" element={<ProtectedRoute>
                    <RespostasJanelasHorarios />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/chat/:whatsapp" element={<ProtectedRoute>
                    <Chat />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/conversas" element={<ProtectedRoute>
                    <Conversas />
                </ProtectedRoute>} />
                <Route exact path="/dicionario" element={<ProtectedRoute>
                    <Dicionario />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/whatsappTwilio" element={<ProtectedRoute>
                    <WhatsappTwilio />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/chatTwilio/:whatsapp" element={<ProtectedRoute>
                    <ChatTwilio />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/pdf2/:proposta/:nome" element={<ProtectedRoute>
                    <Pdf2 />
                </ProtectedRoute>} />

                <Route exact path="/entrevistas/migrarBase" element={<ProtectedRoute>
                    <MigracaoTele />
                </ProtectedRoute>} />

                {/* RSD */}

                <Route exact path="/rsd/PainelProcesso" element={<ProtectedRoute>
                    <PainelProcessos />
                </ProtectedRoute>} />
                <Route exact path="/rsd/UploadArquivo" element={<ProtectedRoute>
                    <UploadRsd />
                </ProtectedRoute>} />
                <Route exact path="/rsd/UploadQuarentena" element={<ProtectedRoute>
                    <UploadQuarentena />
                </ProtectedRoute>} />
                <Route path="/rsd/FichaBeneficiario/:mo" element={<ProtectedRoute>
                    <FichaBeneficiario />
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
                <Route path="/rsd/FichaBeneficiarioConcluidos/:mo" element={<ProtectedRoute>
                    <FichaBeneficiarioConcluidos />
                </ProtectedRoute>} />
                <Route path="/rsd/producaoDiaria" element={<ProtectedRoute>
                    <ProducaoDiariaRsd />
                </ProtectedRoute>} />
                <Route path="/rsd/BaixaAgd" element={<ProtectedRoute>
                    <BaixaAgd />
                </ProtectedRoute>} />
                <Route path="/rsd/formasPagamento" element={<ProtectedRoute>
                    <FormasPagamento />
                </ProtectedRoute>} />
                <Route path="/rsd/finalizacoes" element={<ProtectedRoute>
                    <Finalizacoes />
                </ProtectedRoute>} />


                {/*Elegibilidade*/}

                <Route path="/elegibilidade/upload" element={<ProtectedRoute>
                    <UploadElegibilidade />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/analiseDocumentos" element={<ProtectedRoute>
                    <AnaliseDocumentos />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/semDocumentos" element={<ProtectedRoute>
                    <SemDocumentos />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/analise" element={<ProtectedRoute>
                    <AnaliseElegibilidade />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/cancelar" element={<ProtectedRoute>
                    <CancelarElegibilidade />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/analise/detalhes/:id" element={<ProtectedRoute>
                    <AnaliseElegibilidadeDetalhes />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/todos" element={<ProtectedRoute>
                    <TodosElegibilidade />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/producao" element={<ProtectedRoute>
                    <ProducaoElegibilidade />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/devolvidas" element={<ProtectedRoute>
                    <DevolvidasElegibilidade />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/propostasAmil" element={<ProtectedRoute>
                    <PropostasAmil />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/divergencias" element={<ProtectedRoute>
                    <Divergencias />
                </ProtectedRoute>} />
                <Route path="/elegibilidade/planosBlacklist" element={<ProtectedRoute>
                    <PlanosBlacklist />
                </ProtectedRoute>} />

                {/*Elegibilidade PME*/}

                <Route path="/elegibilidadePme/upload" element={<ProtectedRoute>
                    <UploadElegibilidadePme />
                </ProtectedRoute>} />
                <Route path="/elegibilidadePme/todos" element={<ProtectedRoute>
                    <TodosElegibilidadePme />
                </ProtectedRoute>} />
                <Route path="/elegibilidadePme/detalhes/:id" element={<ProtectedRoute>
                    <DetalhesElegibilidadePme />
                </ProtectedRoute>} />
                <Route path="/elegibilidadePme/andamento" element={<ProtectedRoute>
                    <AndamentoElegibilidadePme />
                </ProtectedRoute>} />

                {/* Urgência Emergência*/}

                <Route path="/urgenciaEmergencia/upload" element={<ProtectedRoute>
                    <UploadUrgenciaEmergencia />
                </ProtectedRoute>} />
                <Route path="/urgenciaEmergencia/andamento" element={<ProtectedRoute>
                    <UrgenciaEmergencia />
                </ProtectedRoute>} />
                <Route path="/urgenciaEmergencia/detalhes/:id" element={<ProtectedRoute>
                    <UrgenciaEmergenciaDetalhes />
                </ProtectedRoute>} />
                <Route path="/urgenciaEmergencia/todos" element={<ProtectedRoute>
                    <UrgenciaEmergenciaTodos />
                </ProtectedRoute>} />
                <Route path="/urgenciaEmergencia/anexar" element={<ProtectedRoute>
                    <UrgenciaEmergenciaAnexar />
                </ProtectedRoute>} />
                <Route path="/urgenciaEmergencia/producao" element={<ProtectedRoute>
                    <UrgenciaEmergenciaProducao />
                </ProtectedRoute>} />

                {/* Controle de Atividades */}

                <Route path="/controleAtividades" element={<ProtectedRoute>
                    <ControleAtividades />
                </ProtectedRoute>} />

            </Routes>
        </AuthProvider>

    )
}

export default AppRoutes