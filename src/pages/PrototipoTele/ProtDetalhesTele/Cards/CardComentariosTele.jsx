import { useState } from "react";
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Paper, Popover, TextField, Tooltip, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect } from "react";
import { createComentario, deleteComentario, getComentariosByCpf } from "../../../../_services/teleEntrevistaExterna.service";

const CardComentariosTele = ({ cpf }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [comentarios, setComentarios] = useState([])
    const [comentario, setComentario] = useState('')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSendComentario = async (e) => {
        e.preventDefault()

        if (comentario === '') {
            return
        }

        await createComentario({
            cpfTitular: cpf,
            text: comentario
        })

        setComentario('')
        handleClose()
        fetchData()
    }



    const handleDeleteComentario = async (id) => {
        await deleteComentario(id)
        fetchData()
    }

    const fetchData = async () => {
        const result = await getComentariosByCpf(cpf)
        setComentarios(result)
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getComentariosByCpf(cpf)
            setComentarios(result)
        }
        fetchData()
    }, [cpf])



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
                            <TextField value={comentario} onChange={e => setComentario(e.target.value)} size="small" fullWidth />
                            <Button onClick={handleSendComentario} type="submit">Enviar</Button>
                        </Box>
                    </form>

                </Popover>
            </Typography>
            {
                comentarios.map(comentario => {
                    return (
                        <Box key={comentario._id}>
                            <Typography variant="subtitle2">
                                {comentario.user} {comentario.data}
                            </Typography>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography>
                                    {comentario.text}
                                </Typography>
                                <IconButton size="small" onClick={() => handleDeleteComentario(comentario._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default CardComentariosTele