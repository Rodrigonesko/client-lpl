import React, { useState, useContext } from "react";
import { FaHome, FaHeadset, FaClipboard, FaCalendar, FaGavel, FaAngleDoubleLeft, FaAngleDoubleRight, FaShieldAlt, FaDonate, FaClipboardCheck } from "react-icons/fa";
import { BsGraphUp } from 'react-icons/bs'
import { RiAlarmWarningLine } from 'react-icons/ri'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import AuthContext from "../../context/AuthContext";
import 'react-pro-sidebar/dist/css/styles.css'

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true)

    const { accessLevel, name } = useContext(AuthContext)

    const toggleMenu = () => {
        console.log('toggle');
        setIsOpen(!isOpen)
        // $('#sidebar').toggle('fast')
        let side = document.getElementById('sidebar')
        side.classList.toggle('slidein')
        side.classList.toggle('slideout')
    }

    return (
        <>
            {

                <ProSidebar className="" id="sidebar">
                    <Menu iconShape="square">
                        <MenuItem icon={<FaHome />}><Link to='/'>Home</Link></MenuItem>
                        {
                            accessLevel != 'false' ? (
                                <SubMenu title="Admin" icon={<FaShieldAlt />} >
                                    <MenuItem><Link to='/admin/criar'>Criar Usuário</Link></MenuItem>
                                    <MenuItem>Alterar Senha Usuario</MenuItem>
                                    <MenuItem><Link to='/admin/liberarModulos' >Liberação Módulos</Link></MenuItem>
                                    <SubMenu title='Gráficos' icon={<BsGraphUp />} >
                                        <MenuItem><Link to='/admin/graphicos/rn'>Rns</Link></MenuItem>
                                        <MenuItem><Link to='/admin/graphicos/liminares'>Liminares</Link></MenuItem>
                                    </SubMenu>
                                </SubMenu>
                            ) : null
                        }

                        <SubMenu title="Rn" icon={<FaHeadset />}>
                            <MenuItem><Link to='/rn/upload'>Upload</Link></MenuItem>
                            <MenuItem><Link to='/rn/rns'>Rns</Link></MenuItem>
                            <MenuItem><Link to='/rn/todas'>Todas</Link></MenuItem>
                            <MenuItem><Link to='/rn/uploadConfirmadas'>Upload Confirmadas</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Tele Entrevistas" icon={<FaClipboard />}>
                            <SubMenu title='Agenda' icon={<FaCalendar />}>
                                <MenuItem><Link to='/entrevistas/agenda/agendar'>Agendar</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/agenda/agendados'>Agendados</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/agenda/mensagens'>Mensagens</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/agenda/anexos'>Anexar SisAmil</Link></MenuItem>{
                                    accessLevel != 'false' ? (
                                        <MenuItem><Link to='/entrevistas/agenda/horarios'>Ajustar Horarios</Link></MenuItem>
                                    ) : null
                                }
                            </SubMenu>
                            <MenuItem><Link to='/entrevistas/propostas'>Propostas</Link></MenuItem>
                            {
                                accessLevel != 'false' ? (<>

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
                            <MenuItem><Link to='/entrevistas/cid/adicionar'>Adicionar Cid</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title="Urgência & Emergência" icon={<RiAlarmWarningLine />} >
                            <MenuItem><Link to='/urgenciaEmergencia/andamento'>Em andamento</Link></MenuItem>
                            <MenuItem><Link to='/urgenciaEmergencia/anexar'>Anexar</Link></MenuItem>
                            <MenuItem><Link to='/urgenciaEmergencia/todos'>Concluídos</Link></MenuItem>
                            <MenuItem><Link to='/urgenciaEmergencia/producao'>Produção</Link></MenuItem>
                            <MenuItem><Link to='/urgenciaEmergencia/upload'>Upload</Link></MenuItem>

                        </SubMenu>
                        <SubMenu title='Liminares' icon={<FaGavel />}>
                            <SubMenu title='Liminares'>
                                <MenuItem><Link to='/liminares/andamento'>Em andamento</Link></MenuItem>
                                <MenuItem><Link to='/liminares/upload'>Upload</Link></MenuItem>
                                <MenuItem><Link to='/liminares/report'>Report</Link></MenuItem>
                            </SubMenu>
                            <SubMenu title='Liminares AJ'>
                                <MenuItem><Link to='/liminares/andamentoAj'>Em andamento</Link></MenuItem>
                                <MenuItem><Link to='/liminares/uploadAj'>Upload</Link></MenuItem>
                                <MenuItem><Link to='/liminares/reportAj'>Report</Link></MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu title='RSD' icon={<FaDonate></FaDonate>}>
                            <MenuItem><Link to='/Rsd/PainelProcesso'>Painel de Processos</Link></MenuItem>
                            <MenuItem><Link to='/rsd/CriarPedidoIndividual/'>Criar Pedido/Protocolo</Link></MenuItem>
                            <MenuItem><Link to='/rsd/OperadoraBeneficiario/'>Operadora Beneficiário</Link></MenuItem>
                            <MenuItem><Link to='/rsd/Concluidos/'>Concluidos</Link></MenuItem>
                            <MenuItem><Link to='/Rsd/UploadArquivo'>Upload</Link></MenuItem>
                            <MenuItem><Link to='/rsd/Relatorio'>Relatório</Link></MenuItem>
                            <MenuItem><Link to='/rsd/agd'>AGD</Link></MenuItem>
                        </SubMenu>
                        <SubMenu title='Elegiblidade' icon={<FaClipboardCheck />}>
                            <MenuItem><Link to='/elegibilidade/analiseDocumentos'>Analise Documentos</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/preProcessamento'>Pré Processamento</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/analise'>Análise</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidade/upload'>Upload</Link></MenuItem>
                        </SubMenu>
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