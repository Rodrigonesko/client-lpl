import React, { useState } from "react";
import Axios from 'axios'
import { Modal, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { cancelarCpf } from "../../../../_services/elegibilidade.service";

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

const ModalCancelarCpf = ({ atualizarDados, proposta }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const cancelar = async () => {
        try {

            await cancelarCpf({ dados: proposta })

            atualizarDados()
            handleClose()
            navigate('/elegibilidade/cancelar')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button color="error" variant="contained" onClick={handleOpen} style={{ marginRight: '10px' }}>Cancelar CPF Corretor</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography textAlign='center' id="modal-modal-title" variant="h6" component="h2" m={2}>
                        Deseja cancelar o cpf ({proposta.cpfCorretor}) do corretor {proposta.nomeCorretor} ?
                    </Typography>
                    <Box m={2} display='flex' justifyContent='space-around'>
                        <Button variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                        <Button variant="contained" color="error" onClick={cancelar}>Cancelar</Button>
                    </Box>
                </Box>
            </Modal>
        </>

    )
}

export default ModalCancelarCpf