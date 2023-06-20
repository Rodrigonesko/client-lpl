import React, { useState } from "react";
import Axios from 'axios'
import { Modal, Button, Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

const ModalCancelamento = ({ atualizarDados }) => {

    const { id } = useParams()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const cancelar = async () => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/cancelar`, {
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                atualizarDados()
                handleClose()
                navigate('/elegibilidade/cancelar')
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button color="error" variant="contained" onClick={handleOpen} style={{ marginRight: '10px' }}>Cancelar</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography textAlign='center' id="modal-modal-title" variant="h6" component="h2" m={2}>
                        Deseja cancelar?
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

export default ModalCancelamento