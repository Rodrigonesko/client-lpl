import React, { useState } from "react";
import { Modal, Button, Box, Typography, TextField, Select, FormControl, InputLabel, MenuItem, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { enviarFaseCancelamento } from "../../../../_services/elegibilidade.service";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalEnviarCancelamento = ({ atualizarDados }) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [motivoCancelamento, setMotivoCancelamento] = useState('')
    const [categoriaCancelamento, setCategoriaCancelamento] = useState('')
    const [evidencia, setEvidencia] = useState('')
    const [anexado, setAnexado] = useState(false)

    const enviarCancelamento = async () => {
        try {

            await enviarFaseCancelamento({
                motivoCancelamento,
                categoriaCancelamento,
                evidencia,
                id
            })

            navigate('/elegibilidade/analise')
            handleClose()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button color="error" variant="contained" onClick={handleOpen} style={{ marginRight: '10px' }}>Enviar Cancelamento</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enviar para cancelamento
                    </Typography>
                    <Box>
                        <Box m={2}>
                            <TextField
                                label='Motivo cancelamento'
                                style={{ marginTop: '20px', width: '80%' }}
                                multiline
                                rows={3}
                                value={motivoCancelamento}
                                onChange={e => {
                                    setMotivoCancelamento(e.target.value)
                                }}
                            />
                        </Box>
                        <Box m={2}>
                            <FormControl style={{ width: '80%' }} size="small">
                                <InputLabel>Categoria</InputLabel>
                                <Select
                                    value={categoriaCancelamento}
                                    onChange={e => {
                                        setCategoriaCancelamento(e.target.value)
                                    }}
                                    label='Categoria'
                                >
                                    <MenuItem>
                                        <em>
                                            Categoria
                                        </em>
                                    </MenuItem>
                                    <MenuItem value='À pedido da Adm'>
                                        À pedido da Adm
                                    </MenuItem>
                                    <MenuItem value='Erro sistema'>
                                        Erro sistema
                                    </MenuItem>
                                    <MenuItem value='Fraude'>
                                        Fraude
                                    </MenuItem>
                                    <MenuItem value='Prazo expirado'>
                                        Prazo expirado
                                    </MenuItem>
                                    <MenuItem value='Situação Especial'>
                                        Situação Especial
                                    </MenuItem>
                                    <MenuItem value='Under'>
                                        Under
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box m={2}>
                            <FormControl style={{ width: '80%' }} size="small">
                                <InputLabel>Evidência</InputLabel>
                                <Select
                                    value={evidencia}
                                    onChange={e => {
                                        setEvidencia(e.target.value)
                                    }}
                                    label='Evidência'
                                >
                                    <MenuItem>
                                        <em>
                                            Evidência
                                        </em>
                                    </MenuItem>
                                    <MenuItem value='EMAIL'>
                                        EMAIL
                                    </MenuItem>
                                    <MenuItem value='LIGAÇÃO'>
                                        LIGAÇÃO
                                    </MenuItem>
                                    <MenuItem value='CONSULTA SITE'>
                                        CONSULTA SITE
                                    </MenuItem>
                                    <MenuItem value='ESTADO DIVERGENTE'>
                                        ESTADO DIVERGENTE
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box m={2}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Foi anexado no sisAmil?" onChange={e => {
                                    e.target.checked ? setAnexado(true) : setAnexado(false)
                                }} />
                            </FormGroup>
                        </Box>
                    </Box>
                    {
                        anexado ? (
                            <Box mt={2}>
                                <Button variant="contained" color='inherit' style={{ marginRight: '10px' }} onClick={handleClose}>Fechar</Button>
                                <Button variant="contained" color='error' onClick={enviarCancelamento}>Enviar Cancelamento</Button>
                            </Box>
                        ) : null
                    }
                </Box>
            </Modal>
        </>

    )
}

export default ModalEnviarCancelamento