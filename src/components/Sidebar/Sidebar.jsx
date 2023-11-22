import React, { useState, useContext } from "react";
import { FaUserCircle, FaExchangeAlt, FaArchive, FaHome, FaClipboard, FaCalendar, FaAngleDoubleLeft, FaAngleDoubleRight, FaShieldAlt, FaDonate, FaClipboardCheck, FaWhatsapp, FaUserSecret, FaTools } from "react-icons/fa";
import { RiAlarmWarningLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import AuthContext from "../../context/AuthContext";
import { Badge, IconButton } from "@mui/material";
import 'react-pro-sidebar/dist/css/styles.css'
import { useEffect } from "react";
import { io } from "socket.io-client";
import { getChats } from "../../_services/chat.service";
import ChatIcon from '@mui/icons-material/Chat';

const socket = io(process.env.REACT_APP_CHAT_SERVICE);


const Sidebar = () => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(true)
    const [quantidadeMensagens, setQuantidadeMensagens] = useState(0)
    const { name, acessos } = useContext(AuthContext)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
        let side = document.getElementById('sidebar')
        side.classList.toggle('slidein')
        side.classList.toggle('slideout')
    }
    const logout = async () => {
        const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/logout`, {}, { withCredentials: true })

        if (result.status === 200) {
            navigate('/login')
        }
    }

    const fetchData = async () => {
        const result = await getChats()
        console.log(result.naoLidas);
        setQuantidadeMensagens(result.naoLidas)
    }

    useEffect(() => {
        fetchData()
        socket.on('receivedMessage', async () => {
            fetchData()
        })
        socket.on('seeMessage', async () => {
            fetchData()
        })
    }, [])

    return (
        <>
            {
                <ProSidebar className="" id="sidebar">
                    <Menu iconShape="square">
                        <MenuItem icon={<FaHome />}><Link to='/'>Home</Link></MenuItem>
                        <MenuItem icon={<FaUserCircle />}><Link to='/profile'>Perfil</Link></MenuItem>
                        <MenuItem icon={<Badge badgeContent={quantidadeMensagens} color="secondary">
                            <ChatIcon />
                        </Badge>}><Link to='/internMessages'>Chat</Link></MenuItem>
                        <MenuItem icon={< FaExchangeAlt />}><Link to='/controleAtividades'>Controle de Atividades</Link></MenuItem>
                        {
                            acessos?.administrador ? (
                                <SubMenu title="Admin" icon={<FaShieldAlt />} >
                                    <SubMenu icon={<FaArchive />} title='RH'>
                                        <MenuItem><Link to='/admin/rh/ferias'>Controle Férias</Link></MenuItem>
                                        <MenuItem><Link to='/admin/rh/bancoHoras'>Banco De Horas</Link></MenuItem>
                                        <MenuItem><Link to='/admin/rh/treinamentos'>Treinamentos</Link></MenuItem>
                                    </SubMenu>
                                    <SubMenu title='Infra' icon={<FaTools />}>
                                        <MenuItem><Link to='/admin/infra/inventario'>Inventário</Link></MenuItem>
                                        <MenuItem><Link to='/admin/infra/resetPassword'>Restaurar Senha</Link></MenuItem>
                                        <MenuItem><Link to='/admin/infra/liberarModulos' >Liberação Módulos</Link></MenuItem>
                                        <MenuItem><Link to='/admin/infra/atendimentoChamados'>Chamados TI</Link></MenuItem>

                                    </SubMenu>
                                    <SubMenu title='Produção' icon={<FaUserSecret />}>
                                        <MenuItem><Link to='/admin/producao/criar'>Criar Usuário</Link></MenuItem>
                                        <MenuItem><Link to='/admin/producao/relatorioProdutividade'>Relatorios de Produtividade</Link></MenuItem>
                                        <MenuItem><Link to='/admin/producao/controlePoliticas'>Controle de Políticas</Link></MenuItem>
                                        <MenuItem><Link to='/admin/producao/solicitarChamados'>Abrir Chamados</Link></MenuItem>
                                    </SubMenu>
                                </SubMenu>
                            ) : null
                        }
                        <SubMenu title="Tele Entrevistas" icon={<FaClipboard />}>
                            <SubMenu title='Agenda' icon={<FaCalendar />}>
                                <MenuItem><Link to='/entrevistas/agenda/agendar'>Agendar</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/agenda/agendados'>Agendados</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/agenda/mensagens'>Mensagens</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/agenda/anexos'>Anexar SisAmil</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/implantacao'>Implatação</Link></MenuItem>
                                {
                                    acessos?.agendamento || acessos?.administrador ? (
                                        <MenuItem><Link to='/entrevistas/agenda/horarios'>Ajustar Horarios</Link></MenuItem>
                                    ) : null
                                }
                            </SubMenu>
                            <SubMenu title='Whatsapp' icon={<FaWhatsapp />}>
                                <MenuItem><Link to='/entrevistas/naoEnviados'>Não Enviados</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/Ajustar'>Ajustar</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/Enviados'>Enviados</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/ErroAoEnviar'>Erro ao enviar</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/AtendimentoHumanizado'>Atendimento Humanizado</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/RespostasJanelas'>Janelas Escolhidas</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/conversas'>Conversas</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/whatsappTwilio'>Whatsapp Twilio</Link></MenuItem>
                            </SubMenu>
                            <MenuItem><Link to='/entrevistas/propostas'>Propostas</Link></MenuItem>
                            <MenuItem><Link to='/rn/todas'>Rns</Link></MenuItem>
                            {
                                acessos?.agendamento || acessos?.administrador ? (<>

                                    <MenuItem><Link to='/entrevistas/reportAgendadas'>Report Agendadas</Link></MenuItem>
                                    <MenuItem><Link to='/entrevistas/producaoDiaria'>Produção Diaria</Link></MenuItem>
                                    <MenuItem><Link to='/entrevistas/producao'>Produção</Link></MenuItem>
                                </>
                                ) : null
                            }
                            {
                                name === 'Administrador' ? (
                                    <MenuItem><Link to='/entrevistas/faturamento'>Faturamento</Link></MenuItem>
                                ) : null
                            }
                            <MenuItem><Link to='/entrevistas/report'>Report</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/upload'>Upload</Link></MenuItem>
                            <MenuItem><Link to='/rn/upload'>Upload Rn</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/cid/adicionar'>Adicionar Cid</Link></MenuItem>
                            <MenuItem><Link to='/dicionario'>Dicionário</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Urgência & Emergência" icon={<RiAlarmWarningLine />} >
                            <MenuItem><Link to='/urgenciaEmergencia/andamento'>Em andamento</Link></MenuItem>
                            <MenuItem><Link to='/urgenciaEmergencia/anexar'>Anexar</Link></MenuItem>
                            <MenuItem><Link to='/urgenciaEmergencia/todos'>Concluídos</Link></MenuItem>
                            <MenuItem><Link to='/urgenciaEmergencia/producao'>Produção</Link></MenuItem>
                            <MenuItem><Link to='/urgenciaEmergencia/upload'>Upload</Link></MenuItem>

                        </SubMenu>
                        <SubMenu title='RSD' icon={<FaDonate></FaDonate>}>
                            <MenuItem><Link to='/Rsd/PainelProcesso'>Painel de Processos</Link></MenuItem>
                            <MenuItem><Link to='/rsd/CriarPedidoIndividual/'>Criar Pedido/Protocolo</Link></MenuItem>
                            <MenuItem><Link to='/rsd/OperadoraBeneficiario/'>Operadora Beneficiário</Link></MenuItem>
                            <MenuItem><Link to='/rsd/Concluidos/'>Concluidos</Link></MenuItem>
                            <MenuItem><Link to='/Rsd/UploadArquivo'>Upload</Link></MenuItem>
                            <MenuItem><Link to='/Rsd/UploadQuarentena'>Upload Alta Frequência</Link></MenuItem>
                            <MenuItem><Link to='/rsd/Relatorio'>Relatório</Link></MenuItem>
                            {/* {
                                accessLevel !== 'false' ? (
                                    <MenuItem><Link to='/rsd/producaoDiaria'>Produção Diaria</Link></MenuItem>
                                ) : null
                            } */}
                            <MenuItem><Link to='/rsd/BaixaAgd'>Baixa AGD</Link></MenuItem>

                        </SubMenu>
                        <SubMenu title='Elegiblidade' icon={<FaClipboardCheck />}>
                            <MenuItem><Link to='/elegibilidade/analiseDocumentos'>Atribuição analista</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/semDocumentos'>Sem Documentos</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/analise'>Análise</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/devolvidas'>Devolvidas</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/cancelar'>Cancelar</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/todos'>Todos</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/propostasAmil'>Propostas Amil</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/producao'>Produção</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/upload'>Upload</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/divergencias'>Divergências</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/planosBlacklist'>Planos Blacklist</Link></MenuItem>
                            <SubMenu title='PME'>
                                <MenuItem><Link to='/elegibilidadePme/andamento'>Em andamento</Link></MenuItem>
                                <MenuItem><Link to='/elegibilidadePme/todos'>Todos</Link></MenuItem>
                                <MenuItem><Link to='/elegibilidadePme/upload'>Upload</Link></MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <MenuItem icon={<RiLogoutBoxRLine />}>
                            <a onClick={logout}>Sair</a>
                        </MenuItem>
                    </Menu>
                </ProSidebar>
            }
            {
                isOpen ? (
                    <div className="div-toggle">
                        <IconButton style={{ zIndex: 1100, background: 'gray', color: 'white', position: 'absolute', left: '250px' }} onClick={toggleMenu} >
                            <FaAngleDoubleLeft className="toggle" />
                        </IconButton>
                    </div>

                ) : (
                    <div className="div-toggle">
                        <IconButton style={{ zIndex: 99, background: 'gray', color: 'white' }} onClick={toggleMenu} >
                            <FaAngleDoubleRight className="toggle" />
                        </IconButton>
                    </div>
                )
            }

        </>



    )
}

export default Sidebar