import React, { useState } from "react";
import Axios from 'axios'
import { Modal, Button, Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

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

    const { id } = useParams()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setMotivos([])
    };
    const [outros, setOutros] = useState(false)
    const [observacoes, setObservacoes] = useState('')
    const [motivos, setMotivos] = useState([])

    const addMotivos = (e) => {

        if (e.target.checked) {
            setMotivos(elemento => [...elemento, e.target.value])
        } else {
            removeItem(e.target.value)
        }

    }

    const removeItem = (elementToRemove) => {
        const newArray = motivos.filter(element => element !== elementToRemove)
        setMotivos(newArray)
    }

    const devolver = async () => {
        try {

            await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/devolver`, {
                id,
                motivos,
                observacoes
            }, {
                withCredentials: true
            })

            handleClose()

        } catch (error) {
            console.log(error);
        }
    }

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
                                <FormControlLabel control={<Checkbox value={1} />} label="1 - Documento elegivel" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={2} />} label="2 - Falta Documento" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={3} />} label="3 - Falta Declaração/Carteirinha Associado" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={4} />} label="4 - Ficha de Associação Solicitada à Entidade" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={5} />} label="5 - Falta de Assinatura na Declaração de Associado" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={6} />} label="6 - Dependentes Elegíveis - cônjuge e filhos" onChange={addMotivos} />
                            </FormGroup>
                        </Box>
                        <Box>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value={7} />} label="7 - Ausência de Verso do Diploma" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={8} />} label="8 - Ausência de Assinatura no Diploma" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={10} />} label="10 - Enviar frente e versodo Diploma ou Declaração de Conclusão do Curso" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={11} />} label="11 - Enviar Declaração de Matricula na Instituição de Ensino" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={13} />} label="13 - Falta Comprovante de Mens da Instituição" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={14} />} label="14 - Carta de Permanência Com Prazo Superior a 60 Dias" onChange={addMotivos} />
                            </FormGroup>
                        </Box>
                        <Box>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value={18} />} label="18 - Ausência de Carteirinha do Plano Anterior" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={19} />} label="19 - Ausência de Declaração do Plano Anterior" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={20} />} label="20 - Falta 3 Últimos Comprovantes de Pagamento do Plano Anterior" onChange={addMotivos} />
                                <FormControlLabel control={<Checkbox value={21} />} label="21 - Outros" onChange={e => {
                                    e.target.checked ? setOutros(true) : setOutros(false)
                                    addMotivos(e)
                                }} />
                                {
                                    outros ? (
                                        <TextField size="small" label='Outros' multiline value={observacoes} onChange={e => {
                                            setObservacoes(e.target.value)
                                        }} />
                                    ) : null
                                }
                                <FormControlLabel control={<Checkbox value={30} />} label="30 - Assinatura Digital Inválida" onChange={addMotivos} />
                            </FormGroup>
                        </Box>
                    </Box>
                    <Box mt={3}>
                        <Button style={{ marginRight: '20px' }} variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                        <Button variant="contained" color="warning" onClick={devolver}>Devolver</Button>
                    </Box>
                </Box>
            </Modal>
        </>

    )
}

export default ModalDevolucao