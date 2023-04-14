import React, { useState } from "react";
import Axios from 'axios'
import { Modal, Button, Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
};

const ModalDevolucao = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button color="warning" variant="contained" onClick={handleOpen} style={{ marginRight: '10px' }}>1° Devolucao</Button>
            <Button color="warning" variant="contained" onClick={handleOpen} style={{ marginRight: '10px' }}>2° Devolucao</Button>
            <Button color="warning" variant="contained" onClick={handleOpen} style={{ marginRight: '10px' }}>3° Devolucao</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Devolução de proposta
                    </Typography>
                    <Box component={Paper} p={2} display='flex'>
                        <Box>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value={1} />} label="1 - Documento elegivel" />
                                <FormControlLabel control={<Checkbox value={2} />} label="2 - Falta Documento" />
                                <FormControlLabel control={<Checkbox value={3} />} label="3 - Falta Declaração/Carteirinha Associado" />
                                <FormControlLabel control={<Checkbox value={4} />} label="4 - Ficha de Associação Solicitada à Entidade" />
                                <FormControlLabel control={<Checkbox value={5} />} label="5 - Falta de Assinatura na Declaração de Associado" />
                                <FormControlLabel control={<Checkbox value={6} />} label="6 - Dependentes Elegíveis - cônjuge e filhos" />
                            </FormGroup>
                        </Box>
                        <Box>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value={7} />} label="7 - Ausência de Verso do Diploma" />
                                <FormControlLabel control={<Checkbox value={8} />} label="8 - Ausência de Assinatura no Diploma" />
                                <FormControlLabel control={<Checkbox value={10} />} label="10 - Enviar frente e versodo Diploma ou Declaração de Conclusão do Curso" />
                                <FormControlLabel control={<Checkbox value={11} />} label="11 - Enviar Declaração de Matricula na Instituição de Ensino" />
                                <FormControlLabel control={<Checkbox value={13} />} label="13 - Falta Comprovante de Mens da Instituição" />
                                <FormControlLabel control={<Checkbox value={14} />} label="14 - Carta de Permanência Com Prazo Superior a 60 Dias" />
                            </FormGroup>
                        </Box>
                        <Box>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value={1} />} label="18 - Ausência de Carteirinha do Plano Anterior" />
                                <FormControlLabel control={<Checkbox value={2} />} label="19 - Ausência de Declaração do Plano Anterior" />
                                <FormControlLabel control={<Checkbox value={3} />} label="20 - Falta 3 Últimos Comprovantes de Pagamento do Plano Anterior" />
                                <FormControlLabel control={<Checkbox value={4} />} label="21 - Outros" />
                                <FormControlLabel control={<Checkbox value={5} />} label="30 - Assinatura Digital Inválida" />
                            </FormGroup>
                        </Box>
                    </Box>
                    <Box mt={3}>
                        <Button style={{ marginRight: '20px' }} variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                        <Button variant="contained" color="warning">Devolver</Button>
                    </Box>
                </Box>
            </Modal>
        </>

    )
}

export default ModalDevolucao