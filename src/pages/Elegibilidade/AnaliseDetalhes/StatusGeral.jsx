import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Modal, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { getPropostasCorretor } from "../../../_services/elegibilidade.service";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const StatusGeral = ({ statusProposta, status1Analise, status2Analise, status3Analise, corretor }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [propostas, setPropostas] = useState([])

    const buscarPropostas = async () => {
        try {

            const result = await getPropostasCorretor(corretor)

            setPropostas(result)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} elevation={3} p={2} mt={2}>
            <Typography variant="h6">
                Status Geral
            </Typography>
            <Box mt={2}>
                <TextField label='Status Proposta' value={statusProposta} focused InputProps={{
                    readOnly: true,
                }} size="small" style={{ marginRight: '10px' }} />
                <TextField label='1° Análise' value={status1Analise} focused InputProps={{
                    readOnly: true,
                }} size="small" style={{ marginRight: '10px' }} />
                <TextField label='2° Análise' value={status2Analise} focused InputProps={{
                    readOnly: true,
                }} size="small" style={{ marginRight: '10px' }} />
                <TextField label='3° Análise' value={status3Analise} focused InputProps={{
                    readOnly: true,
                }} size="small" style={{ marginRight: '10px' }} />
                <Button variant="contained" onClick={() => {
                    buscarPropostas()
                    handleOpen()
                }} >Propostas</Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Proposta do corretor
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <List>
                            {
                                propostas.map(proposta => {
                                    return (
                                        <ListItem key={proposta._id}>
                                            <ListItemButton component="a" href={`/elegibilidade/analise/detalhes/${proposta._id}`} target="_blank" style={{ background: proposta.status === 'Cancelada' ? '#b71c1c' : '', color: proposta.status === 'Cancelada' ? 'white' : '' }}>
                                                <ListItemText primary={`${proposta.proposta} - ${proposta.status}`} />
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Typography>
                </Box>
            </Modal>
        </Box>
    )
}

export default StatusGeral