import { Avatar, IconButton, Menu, Tooltip, MenuItem, ListItemIcon } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Axios from 'axios'

const ProfileMenu = () => {

    const { name } = useContext(AuthContext)
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/logout`, {}, { withCredentials: true })

        if (result.status === 200) {
            navigate('/login')
        }
    }

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ mr: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }} alt={name} src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${name.split(' ').join('%20')}.jpg`}></Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: '#1D1D1D',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        bgcolor: '#1D1D1D',
                        color: 'lightgray',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem
                    component={Link}
                    to='/profile'
                >
                    <Avatar /> Perfil
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem> */}
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout
                            sx={{
                                transform: 'rotate(180deg)',
                                color: 'lightgray',
                            }}
                            fontSize="small" />
                    </ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileMenu