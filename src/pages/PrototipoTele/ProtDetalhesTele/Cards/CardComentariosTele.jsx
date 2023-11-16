import { useState } from "react";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Box, Button, Divider, IconButton, Paper, Popover, TextField, Tooltip, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const CardComentariosTele = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box borderRadius={'10px'} color={'white'} bgcolor={blue[500]} maxWidth={'50%'} width={'50%'} m={2} p={2} component={Paper}>
            <Typography variant="h5" fontWeight={'bold'}>
                Comentários
                <Tooltip title='Novo Comentario'>
                    <IconButton aria-describedby="popover" onClick={handleClick} color="inherit">
                        <AddCommentIcon />
                    </IconButton>
                </Tooltip>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <form action="">
                        <Box p={2} display={'flex'} width={'30vw'}>
                            <TextField size="small" fullWidth />
                            <Button type="submit">Enviar</Button>
                        </Box>
                    </form>

                </Popover>
            </Typography>
            <Box>
                <Typography variant="subtitle2">
                    Usuario Usuario 11/10/2023 13:42
                </Typography>
                Proposta com x beneficiarios e nenhum atendeu
                <Divider />
            </Box>
            <Box>
                <Typography variant="subtitle2">
                    Usuario Usuario 11/10/2023 13:42
                </Typography>
                Proposta com x beneficiarios e nenhum atendeu
                <Divider />
            </Box>
            <Box>
                <Typography variant="subtitle2">
                    Usuario Usuario 11/10/2023 13:42
                </Typography>
                Proposta com x beneficiarios e nenhum atendeu
                <Divider />
            </Box>
        </Box>
    )
}

export default CardComentariosTele