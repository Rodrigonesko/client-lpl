import { Box, Paper, Button, Avatar, Typography, Divider, IconButton, Tooltip } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2  
import { FaInstagram, FaLinkedin } from 'react-icons/fa'

const ProfileHead = ({ userData }) => {

    return (
        <Box component={Paper} p={1} mr='2%' ml='2%' mt='2%' maxHeight='300px' display='flex' justifyContent='space-between' >
            <Box display='flex' alignItems='center'>
                <Tooltip title='Trocar foto'>
                    <Button sx={{ borderRadius: '50%' }} >
                        <Avatar
                            sx={{ width: '100px', height: '100px' }}
                        ></Avatar>
                    </Button>
                </Tooltip>

                <Box ml='20px'>
                    <Typography variant="h5">
                        {userData.name}
                    </Typography>
                    <Typography mb={1} variant='body2' color='gray'>
                        {userData.email}
                    </Typography>
                    <Box>
                        <Button size="small" variant="contained" href={`/profile/minhaProducao/${userData.name}`}>Produção</Button>
                        <Button disabled sx={{ ml: '5px' }} size="small" variant="contained" color="inherit">Editar</Button>
                    </Box>
                </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Grid container>
                <Grid xs={5}>
                    <Typography>
                        Tempo de casa:
                    </Typography>
                </Grid>
                <Grid xs={7}>
                    <Typography color='gray'>
                        
                    </Typography>
                </Grid>
                <Grid xs={5}>
                    <Typography>
                        Data admissão:
                    </Typography>
                </Grid>
                <Grid xs={7}>
                    <Typography color='gray'>
                        
                    </Typography>
                </Grid>
                <Grid xs={5}>
                    <Typography>
                        Célula:
                    </Typography>

                </Grid>
                <Grid xs={7}>
                    <Typography color='gray'>
                        {userData.atividadePrincipal}
                    </Typography>
                </Grid>
                <Grid xs={1}>
                    <IconButton sx={{
                        transition: 'color 0.5s', // Ajuste o tempo de transição conforme necessário
                    }} color="secondary">
                        <FaInstagram />
                    </IconButton>
                </Grid>
                <Grid xs={1}>
                    <IconButton
                        sx={{
                            transition: 'color 0.5s', // Ajuste o tempo de transição conforme necessário
                        }}
                        color="primary"
                    >
                        <FaLinkedin />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfileHead