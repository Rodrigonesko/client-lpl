import React, { useState } from "react";
import { FaHome, FaHeadset, FaClipboard, FaCalendar, FaGavel, FaAngleDoubleLeft, FaAngleDoubleRight, FaShieldAlt } from "react-icons/fa";
import { BsGraphUp} from 'react-icons/bs'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'



const Sidebar = ({ accessLevel }) => {

    const [isOpen, setIsOpen] = useState(true)

    const toggleMenu = () => {
        console.log('toggle');
        setIsOpen(!isOpen)
    }

    console.log(accessLevel);

    return (
        <>
            {
                isOpen && (
                    <ProSidebar>
                        <Menu iconShape="square">
                            <MenuItem icon={<FaHome />}><Link to='/'>Home</Link></MenuItem>
                            {
                                 (
                                    <SubMenu title="Admin" icon={<FaShieldAlt />} >
                                        <MenuItem><Link to='/admin/criar'>Criar Usuário</Link></MenuItem>
                                        <MenuItem>Alterar Senha Usuario</MenuItem>
                                        <SubMenu title='Gráficos' icon={<BsGraphUp />} >
                                            <MenuItem><Link to='/admin/graphicos/rn'>Rns</Link></MenuItem>
                                        </SubMenu>
                                    </SubMenu>
                                )
                            }

                            <SubMenu title="Rn" icon={<FaHeadset />}>
                                <MenuItem><Link to='/rn/upload'>Upload</Link></MenuItem>
                                <MenuItem><Link to='/rn/rns'>Rns</Link></MenuItem>
                                <MenuItem><Link to='/rn/todas'>Todas</Link></MenuItem>
                                <MenuItem><Link to='/rn/uploadConfirmadas'>Upload Confirmadas</Link></MenuItem>
                            </SubMenu>
                            <SubMenu title="Tele Entrevistas" icon={<FaClipboard />}>
                                <SubMenu title='Agenda' icon={<FaCalendar />}>
                                    <MenuItem>Agendar</MenuItem>
                                    <MenuItem>Agendado</MenuItem>
                                    <MenuItem>Mensagens</MenuItem>
                                    <MenuItem>Anexar</MenuItem>
                                    <MenuItem>Ajustar Horarios</MenuItem>
                                </SubMenu>
                                <MenuItem>Propostas</MenuItem>
                                <MenuItem><Link to='/entrevistas/upload'>Upload</Link></MenuItem>
                            </SubMenu>
                            <SubMenu title='Liminares' icon={<FaGavel />}>

                            </SubMenu>
                        </Menu>
                    </ProSidebar>
                )
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