import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from "@mui/material/colors";

const ProfileBar = ({ nome, showOps, setShowOps, tipo, url }) => {

    console.log(tipo);

    return (
        <Box display={'flex'} justifyContent={"space-between"} p={1} component="div" bgcolor={grey[500]}>
            <Box display={'flex'} alignItems={"center"}>
                <Avatar sx={{ marginLeft: '10px', mr: '20px' }} src={url} ></Avatar>
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