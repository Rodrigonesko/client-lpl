import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { filterUsers } from "../../../_services/user.service";
const ProfileBar = ({ nome, showOps, setShowOps, tipo, url }) => {

    const [openImage, setOpenImage] = useState(false)
    const [online, setOnline] = useState(false)

    useEffect(() => {
        if (tipo !== 'Grupo') {
            filterUsers({
                name: nome
            }).then((result) => {
                setOnline(result[0].online)
            })
        }
    }, [])

    return (
        <Box display={'flex'} justifyContent={"space-between"} p={1} component="div" bgcolor={grey[500]}>
            <Box display={'flex'} alignItems={"center"}>
                <Avatar sx={{
                    marginLeft: '10px',
                    mr: '20px',
                    cursor: 'pointer',
                    boxShadow: openImage && '0px 0px 10px 0px rgba(0,0,0,0.75)',
                    transition: 'ease-in 0.3s',
                    width: openImage ? '300px' : '30px',
                    height: openImage ? '300px' : '30px',
                    zIndex: openImage && '1000',
                    position: openImage && 'absolute',

                }} component={'div'} onClick={() => setOpenImage(!openImage)} alt={nome} src={tipo !== 'Grupo' ? `${process.env.REACT_APP_API_KEY}/media/profilePic/${nome.split(' ').join('%20')}.jpg` : url}
                ></Avatar>
                <Typography color='white'  >
                    {nome}
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'white',
                        }}
                    >
                        {online ? 'Online' : ''}
                    </Typography>
                </Typography>
            </Box>
            {
                tipo === 'Grupo' && (
                    <Tooltip title='Opções'>
                        <IconButton onClick={() => setShowOps((prev) => !prev)}>
                            {
                                showOps ? (
                                    <CloseIcon />
                                ) : (
                                    <SettingsIcon />
                                )
                            }

                        </IconButton>
                    </Tooltip>
                )
            }
        </Box >
    )
}

export default ProfileBar