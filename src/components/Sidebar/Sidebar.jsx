import React, { useState } from "react";
import { FaHome, FaHeadset, FaClipboard, FaCalendar, FaGavel, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'



const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true)

    const toggleMenu = () => {
        console.log('toggle');
        setIsOpen(!isOpen)
    }

    return (
        <>
            {
                isOpen && (
                    <ProSidebar>
                        <Menu iconShape="square">
                            <MenuItem icon={<FaHome />}><Link to='/'>Home</Link></MenuItem>
                            <SubMenu title="Rn" icon={<FaHeadset />}>
                                <MenuItem><Link to='/rn/upload'>Upload</Link></MenuItem>
                                <MenuItem><Link to='/rn/rns'>Rns</Link></MenuItem>
                                <MenuItem><Link to='/rn/todas'>Todas</Link></MenuItem>
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
                                <MenuItem>Upload</MenuItem>
                            </SubMenu>
                            <SubMenu title='Liminares' icon={<FaGavel />}>

                            </SubMenu>
                        </Menu>
                    </ProSidebar>
                )
            }
            {
                isOpen ? (
                    <FaAngleDoubleLeft className="toggle" onClick={toggleMenu} />
                ) : (
                    <FaAngleDoubleRight className="toggle" onClick={toggleMenu} />
                )
            }

        </>



    )
}

export default Sidebar