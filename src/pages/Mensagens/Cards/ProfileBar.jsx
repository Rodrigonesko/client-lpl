import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from "@mui/material/colors";
const ProfileBar = ({ nome, showOps, setShowOps, tipo, url }) => {


    return (
        <Box display={'flex'} justifyContent={"space-between"} p={1} component="div" bgcolor={grey[500]}>
            <Box display={'flex'} alignItems={"center"}>
                <Avatar sx={{
                    marginLeft: '10px',
                    mr: '20px',
                    '&:hover': {
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                        transition: 'ease-in 0.3s',
                        width: '300px',
                        height: '300px',
                        position: 'absolute',
                    },
                }} alt={nome} src={tipo !== 'Grupo' ? `${process.env.REACT_APP_API_KEY}/media/profilePic/${nome.split(' ').join('%20')}.jpg` : url}
                ></Avatar>
                <Typography color='white'  >
                    {nome}
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