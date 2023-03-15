import React, { useState, useContext } from "react";
import { FaExchangeAlt, FaHome, FaClipboard, FaCalendar, FaAngleDoubleLeft, FaAngleDoubleRight, FaShieldAlt, FaDonate, FaClipboardCheck } from "react-icons/fa";
import { BsGraphUp } from 'react-icons/bs'
import { RiAlarmWarningLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import AuthContext from "../../context/AuthContext";
import 'react-pro-sidebar/dist/css/styles.css'

const Sidebar = () => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(true)

    const { accessLevel, name } = useContext(AuthContext)

    const toggleMenu = () => {
        console.log('toggle');
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

    return (
        <>
            {

                <ProSidebar className="" id="sidebar">
                    <Menu iconShape="square">
                        <MenuItem icon={<FaHome />}><Link to='/'>Home</Link></MenuItem>
                        <MenuItem icon={< FaExchangeAlt />}><Link to='/controleAtividades'>Controle de Atividades</Link></MenuItem>
                        {
                            accessLevel !== 'false' ? (
                                <SubMenu title="Admin" icon={<FaShieldAlt />} >
                                    <MenuItem><Link to='/admin/criar'>Criar Usuário</Link></MenuItem>
                                    <MenuItem><Link to='/admin/resetPassword'>Restaurar Senha</Link></MenuItem>
                                    <MenuItem><Link to='/admin/liberarModulos' >Liberação Módulos</Link></MenuItem>
                                    <SubMenu title='Gráficos' icon={<BsGraphUp />} >
                                        <MenuItem><Link to='/admin/graphicos/rn'>Rns</Link></MenuItem>
                                        <MenuItem><Link to='/admin/graphicos/liminares'>Liminares</Link></MenuItem>
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
                                    accessLevel !== 'false' ? (
                                        <MenuItem><Link to='/entrevistas/agenda/horarios'>Ajustar Horarios</Link></MenuItem>
                                    ) : null
                                }
                            </SubMenu>
                            <SubMenu title='Mensagens'>
                                <MenuItem><Link to='/entrevistas/naoEnviados'>Não Enviados</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/Ajustar'>Ajustar</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/Enviados'>Enviados</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/ErroAoEnviar'>Erro ao enviar</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/AtendimentoHumanizado'>Atendimento Humanizado</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/RespostasJanelas'>Janelas Escolhidas</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/conversas'>Conversas</Link></MenuItem>
                            </SubMenu>
                            <MenuItem><Link to='/entrevistas/propostas'>Propostas</Link></MenuItem>
                            <MenuItem><Link to='/rn/todas'>Rns</Link></MenuItem>
                            {
                                accessLevel !== 'false' ? (<>

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
                            <MenuItem><Link to='/Rsd/UploadQuarentena'>Upload Quarentena</Link></MenuItem>
                            <MenuItem><Link to='/rsd/Relatorio'>Relatório</Link></MenuItem>
                            <MenuItem><Link to='/rsd/agd'>AGD</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title='Elegiblidade' icon={<FaClipboardCheck />}>
                            <MenuItem><Link to='/elegibilidade/analiseDocumentos'>Analise Documentos</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/preProcessamento'>Pré Processamento</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/analise'>Análise</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/upload'>Upload</Link></MenuItem>
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
                        <FaAngleDoubleLeft className="toggle" onClick={toggleMenu} />
                    </div>

                ) : (
                    <div className="div-toggle">
                        <FaAngleDoubleRight className="toggle" onClick={toggleMenu} />
                    </div>
                )
            }

        </>



    )
}

export default Sidebar