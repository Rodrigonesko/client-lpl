import { Box, Paper, Button, Avatar, Typography, Divider, IconButton, Tooltip } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2  
import { FaInstagram, FaLinkedin } from 'react-icons/fa'

const ProfileHead = () => {
    return (
        <Box component={Paper} p={1} mr='2%' ml='2%' mt='2%' maxHeight='300px' display='flex' justifyContent='space-between' >
            <Box display='flex' alignItems='center'>
                <Tooltip title='Trocar foto'>
                    <Button sx={{borderRadius: '50%'}} >
                        <Avatar
                            sx={{ width: '100px', height: '100px' }}
                        ></Avatar>
                    </Button>
                </Tooltip>

                <Box ml='20px'>
                    <Typography variant="h5">
                        Rodrigo Onesko Dias
                    </Typography>
                    <Typography mb={1} variant='body2' color='gray'>
                        rodrigo_onesko@hotmail.com
                    </Typography>
                    <Box>
                        <Button size="small" variant="contained">Produção</Button>
                        <Button sx={{ ml: '5px' }} size="small" variant="contained" color="inherit">Editar</Button>
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
                        2 anos
                    </Typography>
                </Grid>
                <Grid xs={5}>
                    <Typography>
                        Data admissão:
                    </Typography>

                </Grid>
                <Grid xs={7}>
                    <Typography color='gray'>
                        06/09/2023
                    </Typography>
                </Grid>
                <Grid xs={5}>
                    <Typography>
                        Célula:
                    </Typography>

                </Grid>
                <Grid xs={7}>
                    <Typography color='gray'>
                        RSD
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