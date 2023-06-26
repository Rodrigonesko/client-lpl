import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios'
import { Modal, Button, Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { enviarUnder } from "../../../../_services/elegibilidade.service";

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

const ModalEnviarUnder = ({ atualizarDados }) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [anexado, setAnexado] = useState(false)
    const [erroSistema, setErroSistema] = useState(false)

    const enviar = async () => {
        try {

            await enviarUnder({
                id,
                erroSistema
            })

            handleClose()
            navigate('/elegibilidade/analise')
            atualizarDados()


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button color="success" variant="contained" onClick={handleOpen} style={{ marginRight: '10px' }}>Enviar Under</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enviar para Under
                    </Typography>
                    <Box>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Foi anexado no sisAmil?" onChange={e => {
                                e.target.checked ? setAnexado(true) : setAnexado(false)
                            }} />
                            <FormControlLabel control={<Checkbox />} label="Erro sistema?" onChange={e => {
                                e.target.checked ? setErroSistema(true) : setErroSistema(false)
                            }} />
                        </FormGroup>
                    </Box>
                    {
                        anexado ? (
                            <Box mt={2}>
                                <Button variant="contained" color='inherit' style={{ marginRight: '10px' }} onClick={handleClose}>Fechar</Button>
                                <Button variant="contained" color='success' onClick={enviar}>Enviar Under</Button>
                            </Box>
                        ) : null
                    }
                </Box>
            </Modal>
        </>

    )
}

export default ModalEnviarUnder