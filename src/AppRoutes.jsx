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

/* Modulo de Contingencia*/

import ControleContigencias from "./pages/ControleContigencias/ControleContigencias";

/* Modulo de Admissional e Demissional*/

import ProtAdmissionalDemissional from "./pages/PrototipoAdmissionalDemissional/ProtAdmissionalDemissional";

/* Modulo de Chamados*/

// import SolicitarChamados from "./pages/Chamados/SolicitarChamados";
// import AtendimentoChamados from "./pages/Chamados/AtendimentoChamados";

/* Modulo de Mensagens*/

import InternMessages from "./pages/Mensagens/InternMessages";


/* Modulo de Ferias*/

import SolicitacaoFerias from "./pages/Ferias/Solicitacao/SolicitacaoFerias";

/* Elegibilidade */

// import UploadElegibilidade from "./pages/Elegibilidade/Upload/UploadElegibilidade";
// import AnaliseDocumentos from "./pages/Elegibilidade/AnaliseDocumentos/AnaliseDocumentos";
// import SemDocumentos from "./pages/Elegibilidade/SemDocumentos/SemDocumentos";
// import AnaliseElegibilidade from "./pages/Elegibilidade/Analise/AnaliseElegibilidade";
// import CancelarElegibilidade from "./pages/Elegibilidade/Cancelar/CancelarElegibilidade";
// import AnaliseElegibilidadeDetalhes from "./pages/Elegibilidade/AnaliseDetalhes/AnaliseElegibilidadeDetalhes";
// import TodosElegibilidade from "./pages/Elegibilidade/Todos/TodosElegibilidade";
// import ProducaoElegibilidade from "./pages/Elegibilidade/ProducaoElegibilidade/ProducaoElegibilidade";
// import DevolvidasElegibilidade from "./pages/Elegibilidade/Devolvidas/Devolvidas";
// import PropostasAmil from "./pages/Elegibilidade/PropostasAmil/PropostasAmil";
// import Divergencias from "./pages/Elegibilidade/Divergencias/Divergencias";
// import PlanosBlacklist from "./pages/Elegibilidade/PlanosBlacklist/PlanosBlacklist";

// /* ELegibilidade PME */

// import UploadElegibilidadePme from "./pages/Elegibilidade/PME/upload/UploadElegibilidadePme";
// import TodosElegibilidadePme from "./pages/Elegibilidade/PME/Todos/TodosElegibilidadePme";
// import DetalhesElegibilidadePme from "./pages/Elegibilidade/PME/Detalhes/DetalhesElegibilidadePme";
// import AndamentoElegibilidadePme from "./pages/Elegibilidade/PME/Andamento/AndamentoElegibilidadePme";

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
// import Mensagens from "./pages/TeleEntrevistas/Agenda/Mensagens/Mensagens";
import Formulario from "./pages/TeleEntrevistas/Formulario/Formulario";
import EntrevistasRealizadas from "./pages/TeleEntrevistas/EntrevistasRealizadas/EntrevistasRealizadas";
import EditarEntrevista from "./pages/TeleEntrevistas/EditarEntrevista/EditarEntrevista";
import Anexos from "./pages/TeleEntrevistas/Agenda/Anexos/Anexos";
import Horarios from "./pages/TeleEntrevistas/Agenda/Horarios/Horarios";
import FaturamentoEntrevistas from "./pages/TeleEntrevistas/FaturamentoEntrevistas/FaturamentoEntrevistas";
import ReportTeleEntrevistas from "./pages/TeleEntrevistas/ReportTeleEntrevistas/ReportTeleEntrevistas";
import ProducaoEntrevistas from "./pages/TeleEntrevistas/Producao/ProducaoTele";
import ProducaoDiariaTele from "./pages/TeleEntrevistas/ProducaoDiaria/ProducaoDiariaTele";
import AdicionarCid from "./pages/TeleEntrevistas/AdicionarCid/AdicionarCid";
import Implantacao from "./pages/TeleEntrevistas/Agenda/Implantacao/Implantacao";

import NaoEnviados from "./pages/TeleEntrevistas/Mensagens/NaoEnviados/NaoEnviados";
import Ajustar from "./pages/TeleEntrevistas/Mensagens/Ajustar/Ajustar";
import Chat from "./pages/TeleEntrevistas/Mensagens/Chat/Chat";
import Conversas from "./pages/TeleEntrevistas/Mensagens/Conversas/Conversas";

import ProtFiltros from "./pages/PrototipoTele/ProtFiltros/ProtFiltros";
import ProtDetalhesTele from "./pages/PrototipoTele/ProtDetalhesTele/ProtDetalhesTele";
import ProtEnviar from "./pages/PrototipoTele/ProtEnviar/ProtEnviar";

/* Urgencia Emergencia */

import UploadUrgenciaEmergencia from "./pages/UrgenciaEmergencia/Upload/UploadUrgenciaEmergencia";
import UrgenciaEmergencia from "./pages/UrgenciaEmergencia/UrgenciaEmergencia/UrgenciaEmergencia";
import UrgenciaEmergenciaDetalhes from "./pages/UrgenciaEmergencia/UrgenciaEmergenciaDetalhes/UrgenciaEmergenciaDetalhes";
import UrgenciaEmergenciaProducao from "./pages/UrgenciaEmergencia/Producao/UrgenciaEmergenciaProducao";
import UrgenciaEmergenciaTodos from "./pages/UrgenciaEmergencia/Todos/UrgenciaEmergenciaTodos";

/* Admin */

import RelatorioProdutividade from "./pages/Admin/RelatorioProdutividade/RelatorioProdutividade";
import ControlePoliticas from "./pages/Admin/ControlePoliticas/ControlePoliticas";
import Treinamentos from "./pages/Admin/Treinamentos/Treinamentos";
import BancoHoras from "./pages/Admin/BancoHoras/BancoHoras";
import Inventario from "./pages/Admin/Inventario/Inventario";
import Users from "./pages/Admin/Users/Users";
import Analitico from "./pages/Admin/Analitico/Analitico";
import Agenda from "./pages/Admin/Agenda/Agenda";

/* Sindicancia*/

import Demandas from "./pages/Sindicancia/Demandas/Demandas";
import ItensChecklist from "./pages/Sindicancia/ItensChecklist/ItensChecklist";

/* Controle atividades  */

// import ControleAtividades from "./pages/ControleAtividades/ControleAtividades";

/* Whatsapp */

import Templates from "./pages/Whatsapp/Templates/Templates";
import WhatsappChat from "./pages/Whatsapp/Chat/Index";

/* Prototipo produção entrevistas  */
import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./pages/Whatsapp/Chat/ChatContext";
import Beneficiarios from "./pages/Rsd/Beneficiarios/Beneficiarios";

/* Tele entrevista V2 */

// import UploadPropostasEntrevistaV2 from "./pages/TeleEntrevistaV2/Upload/Index";
// import ConfigPerguntas from "./pages/TeleEntrevistaV2/ConfigPerguntas/Index";
// import FormularioV2 from "./pages/TeleEntrevistaV2/Formulario/Index";
// import { FormProvider } from "./pages/TeleEntrevistaV2/Formulario/context";
// import Envio from "./pages/TeleEntrevistaV2/Envio/Index";
// import Propostas from "./pages/TeleEntrevistaV2/Propostas/Index";
// import { PropostasProvider } from "./pages/TeleEntrevistaV2/Propostas/context";
// import AdicionarProposta from "./pages/TeleEntrevistaV2/AdicionarProposta";

/* SulAmerica */

import ConfiguracaoQuestionario from "./pages/SulAmerica/ConfiguracaoQuestionario/ConfiguracaoQuestionario";
import UploadSulAmerica from "./pages/SulAmerica/upload/Index";
import FormularioSulAmerica from "./pages/SulAmerica/Formulario/Index";
import EditFormulario from "./pages/SulAmerica/EditarFormulario/Index";
import FichaBeneficiarioSulAmerica from "./pages/SulAmerica/FichaBeneficiario/Index";
import PedidosSulAmerica from "./pages/SulAmerica/Pedidos/Index";
import RendimentoSulAmerica from "./pages/SulAmerica/RendimentoSulAmerica/Index";
import FaturamentoSulamerica from "./pages/SulAmerica/Faturamento/Index";

/* RsdBradesco */

import RsdBradesco from "./pages/RsdBradesco/PaginaPrincipal/Index";
import UploadBradesco from "./pages/RsdBradesco/Upload/Index";
import Segurados from "./pages/RsdBradesco/Segurados/Index";
import FichaSegurado from "./pages/RsdBradesco/FichaSegurado/Index";
import Protocolos from "./pages/RsdBradesco/Protocolos/Protocolos";
import AnaliticoBradescoRsd from "./pages/RsdBradesco/Analitico/Analitico"
import Prestadores from "./pages/RsdBradesco/Prestadores/Prestadores";
import FichaPrestador from "./pages/RsdBradesco/FichaPrestador/FichaPrestador";
import AnaliticoRsdBradesco from "./pages/RsdBradesco/Analitico/Analitico";
import Contatos from "./pages/Sindicancia/Contatos/Contatos";

/* Urgencia Emergenca Nova*/

import UrgenciaEmergenciaNew from "./pages/UrgenciaEmergenciaNew/UrgenciaEmergenciaNew";
import Producao from "./pages/UrgenciaEmergenciaNew/Producao/Producao";

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route exact path="/login" element={<Login />} />

                {/* <ProtectedRoute path='/' element='<Home />' /> */}

                {/* Urgencia Emergencia Novo */}
                <Route exact path="/urgenciaEmergenciaNew" element={<ProtectedRoute>
                    <UrgenciaEmergenciaNew />
                </ProtectedRoute>} />
                <Route exact path="/urgenciaEmergenciaNew/producao" element={<ProtectedRoute>
                    <Producao />
                </ProtectedRoute>} />

                {/* RSD Bradesco */}
                <Route exact path="/bradesco/rsdBradesco" element={<ProtectedRoute>
                    <RsdBradesco />
                </ProtectedRoute>} />
                <Route exact path="/bradesco/uploadBradesco" element={<ProtectedRoute>
                    <UploadBradesco />
                </ProtectedRoute>} />
                <Route exact path="/bradesco/titulares" element={<ProtectedRoute>
                    <Segurados />
                </ProtectedRoute>} />
                <Route exact path="/bradesco/fichaSegurado/:id" element={<ProtectedRoute>
                    <FichaSegurado />
                </ProtectedRoute>} />
                <Route exact path="/bradesco/fichaPrestador/:id" element={<ProtectedRoute>
                    <FichaPrestador />
                </ProtectedRoute>} />
                <Route exact path="/bradesco/protocolos/:id" element={<ProtectedRoute>
                    <Protocolos />
                </ProtectedRoute>} />
                <Route exact path="/bradesco/analiticoRsdBradesco" element={<ProtectedRoute>
                    <AnaliticoBradescoRsd />
                </ProtectedRoute>} />
                <Route exact path="/bradesco/prestadores" element={<ProtectedRoute>
                    <Prestadores />
                </ProtectedRoute>} />
                <Route exact path="/bradesco/rendimento" element={<ProtectedRoute>
                    <AnaliticoRsdBradesco />
                </ProtectedRoute>} />

                <Route exact path="/sulAmerica/configuracaoQuestionario" element={<ProtectedRoute>
                    <ConfiguracaoQuestionario />
                </ProtectedRoute>} />
                <Route exact path="/sulAmerica/Pedidos" element={<ProtectedRoute>
                    <PedidosSulAmerica />
                </ProtectedRoute>} />
                <Route exact path="/sulAmerica/upload" element={<ProtectedRoute>
                    <UploadSulAmerica />
                </ProtectedRoute>} />
                <Route exact path="/sulAmerica/formulario/:id" element={<ProtectedRoute>
                    <FormularioSulAmerica />
                </ProtectedRoute>} />
                <Route exact path="/sulAmerica/beneficiario/:id" element={<ProtectedRoute>
                    <FichaBeneficiarioSulAmerica />
                </ProtectedRoute>} />
                <Route exact path="/sulAmerica/editarFormulario/:id" element={<ProtectedRoute>
                    <EditFormulario />
                </ProtectedRoute>} />
                <Route exact path="/sulAmerica/rendimentoSulAmerica" element={<ProtectedRoute>
                    <RendimentoSulAmerica />
                </ProtectedRoute>} />
                <Route exact path="/sulAmerica/faturamento" element={<ProtectedRoute>
                    <FaturamentoSulamerica />
                </ProtectedRoute>} />

                <Route exact path="/internMessages" element={<ProtectedRoute>
                    <InternMessages />
                </ProtectedRoute>} />
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

                {/*admin producao*/}
                <Route exact path="/admin/producao/relatorioProdutividade" element={<ProtectedRoute>
                    <RelatorioProdutividade />
                </ProtectedRoute>} />
                <Route exact path="/admin/producao/users" element={<ProtectedRoute>
                    <Users />
                </ProtectedRoute>} />
                <Route exact path="/admin/producao/analitico" element={<ProtectedRoute>
                    <Analitico />
                </ProtectedRoute>} />

                {/*admin rh*/}

                <Route exact path="/admin/rh/AdmissionalDemissional" element={<ProtectedRoute>
                    <ProtAdmissionalDemissional />
                </ProtectedRoute>} />
                <Route exact path="/admin/rh/controlePoliticas" element={<ProtectedRoute>
                    <ControlePoliticas />
                </ProtectedRoute>} />
                <Route exact path="/admin/rh/treinamentos" element={<ProtectedRoute>
                    <Treinamentos />
                </ProtectedRoute>} />
                <Route exact path="/admin/rh/controleHoras" element={<ProtectedRoute>
                    <BancoHoras />
                </ProtectedRoute>} />
                <Route exact path="/admin/rh/ferias" element={<ProtectedRoute>
                    <SolicitacaoFerias />
                </ProtectedRoute>} />
                <Route exact path="/admin/rh/agenda" element={<ProtectedRoute>
                    <Agenda />
                </ProtectedRoute>} />

                {/*admin infra*/}

                {/* <Route exact path="/admin/infra/atendimentoChamados" element={<ProtectedRoute>
                    <AtendimentoChamados />
                </ProtectedRoute>} /> */}
                <Route exact path="/admin/infra/contingencias" element={<ProtectedRoute>
                    <ControleContigencias />
                </ProtectedRoute>} />
                <Route exact path="/admin/infra/inventario" element={<ProtectedRoute>
                    <Inventario />
                </ProtectedRoute>} />
                {/* <Route exact path="/admin/producao/solicitarChamados" element={<ProtectedRoute>
                    <SolicitarChamados />
                </ProtectedRoute>} /> */}

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
                {/* <Route exact path="/entrevistas/agenda/mensagens" element={<ProtectedRoute>
                    <Mensagens />
                </ProtectedRoute>} /> */}
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
                <Route exact path="/entrevistas/chat/:whatsapp" element={<ProtectedRoute>
                    <Chat />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/conversas" element={<ProtectedRoute>
                    <Conversas />
                </ProtectedRoute>} />

                {/* Prototipo Tele */}
                <Route exact path="/prototipoTele/filtros" element={<ProtectedRoute>
                    <ProtFiltros />
                </ProtectedRoute>} />
                <Route exact path="/entrevistas/ProtDetalhesTele/:cpfTitular" element={<ProtectedRoute>
                    <ProtDetalhesTele />
                </ProtectedRoute>} />
                <Route exact path="/prototipoTele/enviar" element={<ProtectedRoute>
                    <ProtEnviar />
                </ProtectedRoute>} />

                {/* RSD */}
                <Route exact path="/rsd/PainelProcesso" element={<ProtectedRoute>
                    <PainelProcessos />
                </ProtectedRoute>} />
                <Route exact path="/rsd/Beneficiarios" element={<ProtectedRoute>
                    <Beneficiarios />
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

                {/* <Route path="/elegibilidade/upload" element={<ProtectedRoute>
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
                </ProtectedRoute>} /> */}

                {/*Elegibilidade PME*/}

                {/* <Route path="/elegibilidadePme/upload" element={<ProtectedRoute>
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
                </ProtectedRoute>} /> */}

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
                <Route path="/urgenciaEmergencia/producao" element={<ProtectedRoute>
                    <UrgenciaEmergenciaProducao />
                </ProtectedRoute>} />

                {/* Controle de Atividades */}

                {/* <Route path="/controleAtividades" element={<ProtectedRoute>
                    <ControleAtividades />
                </ProtectedRoute>} /> */}

                {/* Whatsapp */}

                <Route path="/whatsapp/templates" element={<ProtectedRoute>
                    <Templates />
                </ProtectedRoute>} />
                <Route path="/whatsapp/chat" element={<ProtectedRoute>
                    <ChatProvider>
                        <WhatsappChat />
                    </ChatProvider>
                </ProtectedRoute>} />

                {/* <Route path="/teleEntrevistaV2/upload" element={<ProtectedRoute>
                    <UploadPropostasEntrevistaV2 />
                </ProtectedRoute>} />
                <Route path="/teleEntrevistaV2/configPerguntas" element={<ProtectedRoute>
                    <ConfigPerguntas />
                </ProtectedRoute>} />
                <Route path="/teleEntrevistaV2/formulario/:id" element={<ProtectedRoute>
                    <FormProvider>
                        <FormularioV2 />
                    </FormProvider>
                </ProtectedRoute>} />
                <Route path="/teleEntrevistaV2/envio" element={<ProtectedRoute>
                    <Envio />
                </ProtectedRoute>} />
                <Route path="/teleEntrevistaV2/propostas" element={<ProtectedRoute>
                    <PropostasProvider>
                        <Propostas />
                    </PropostasProvider>
                </ProtectedRoute>} />
                <Route path="/teleEntrevistaV2/adicionarProposta" element={<ProtectedRoute>
                    <AdicionarProposta />
                </ProtectedRoute>} /> */}

                {/* Sindicancia */}

                <Route exact path="/demandas" element={<ProtectedRoute>
                    <Demandas />
                </ProtectedRoute>} />
                <Route exact path="/sindicancia/itensChecklist" element={<ProtectedRoute>
                    <ItensChecklist />
                </ProtectedRoute>} />
                <Route exact path="/sindicancia/contatos" element={<ProtectedRoute>
                    <Contatos />
                </ProtectedRoute>} />

            </Routes>
        </AuthProvider>
    )
}

export default AppRoutes