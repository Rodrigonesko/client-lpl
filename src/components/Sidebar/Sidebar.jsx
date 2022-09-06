import React from "react";
import { FaGem, FaHeart } from "react-icons/fa";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'



const Sidebar = () => {

    return (

        <ProSidebar>
            <Menu iconShape="square">
                <MenuItem icon={<FaGem />}><Link to='/'>Home</Link></MenuItem>
                <SubMenu title="Rn" icon={<FaHeart />}>
                    <MenuItem><Link to='/rn/upload'>Upload</Link></MenuItem>
                    <MenuItem><Link to='/rn/rns'>Rns</Link></MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>


    )
}

export default Sidebar