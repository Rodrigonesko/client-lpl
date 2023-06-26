import React, { useState } from "react";
import moment from "moment/moment";
import { Box, Paper, Typography, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Alert, Snackbar, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { deleteComentario, sendComentario } from "../../../_services/elegibilidade.service";

const AgendaElegibilidade = ({ agenda, id, buscarAgenda }) => {

    const [comentario, setComentario] = useState('')
    const [openSnack, setOpenSnack] = useState(false)
    const [open, setOpen] = useState(true)

    const handleClick = () => {
        setOpen(!open);
    };

    const enviarComentario = async () => {
        try {

            await sendComentario({ comentario, id })

            setOpenSnack(true)
            setComentario('')
            buscarAgenda()

        } catch (error) {
            console.log(error);
        }
    }

    const excluirComentario = async (id) => {
        try {
            await deleteComentario(id)
            buscarAgenda()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} p={2} elevation={3} mt={3}>
            <Box display='flex' alignContent='center' justifyContent='space-between' bgcolor='lightgray' borderRadius='5px' p={1}>
                <Typography>
                    Agenda
                </Typography>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                        setOpen(!open)
                        handleClick()
                    }}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </Box>
            {
                open ? (
                    <>
                        <Box display='flex' alignItems='center' justifyContent='space-around'>
                            <TextField
                                style={{ marginTop: '20px', width: '80%' }}
                                id="comentario"
                                label="Agenda"
                                multiline
                                rows={2}
                                placeholder="Comentario..."
                                value={comentario}
                                onChange={e => {
                                    setComentario(e.target.value)
                                }}
                            />
                            <Button onClick={enviarComentario} variant="contained">Enviar</Button>
                        </Box>
                        <TableContainer style={{ marginTop: '20px' }}>
                            <Table style={{ width: '100%' }} className="table">
                                <TableHead className="table-header">
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Analista</TableCell>
                                        <TableCell>Comentário</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        agenda.map(e => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{moment(e.data).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                                                    <TableCell>{e.analista}</TableCell>
                                                    <TableCell>{e.comentario}</TableCell>
                                                    <TableCell><Button color="error" variant="contained" onClick={() => excluirComentario(e._id)} >Excluir</Button></TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : null
            }
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Comentario adicionado
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AgendaElegibilidade