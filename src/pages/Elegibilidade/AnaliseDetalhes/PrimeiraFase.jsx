import React, { useState } from "react";
import { Box, Paper, TextField, Typography, IconButton, FormControl, RadioGroup, FormControlLabel, FormLabel, Radio, Button, Modal, CircularProgress, Snackbar, Alert } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};

const PrimeiraFase = ({ entidade, planoAmil, dataInicio, dataFim, custo, cpfCorretor, nomeCorretor, telefoneCorretor, cpfSupervisor, nomeSupervisor, telefoneSupervisor, fase1, id, atualizarDados }) => {

    const [open, setOpen] = useState(false)
    const [modalConcluir, setModalConcluir] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [showFase1, setShowFase1] = useState(!fase1);
    const [showPlanoAmil, setShowPlanoAmil] = useState(planoAmil === 'Sim')
    const [dataUpdate, setDataUpdate] = useState({
        entidade,
        planoAmil,
        dataInicioPlanoAmil: dataInicio,
        dataFimPlanoAmil: dataFim,
        custoPlanoAmil: custo,
        cpfCorretor,
        nomeCorretor,
        telefoneCorretor,
        cpfSupervisor,
        nomeSupervisor,
        telefoneSupervisor
    })

    const handleClick = () => {
        setShowFase1(!showFase1);
    };

    const salvar = async () => {

        try {
            setLoading(true)

            await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/proposta/fase1`, {
                dataUpdate,
                id
            }, {
                withCredentials: true
            })

            setOpenSnack(true)
            setLoading(false)
            atualizarDados()

        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }

    const concluir = async () => {
        try {
            setLoading(true)

            await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/proposta/fase1`, {
                dataUpdate,
                id,
                concluir: true
            }, {
                withCredentials: true
            })

            setOpenSnack(true)
            setLoading(false)
            setModalConcluir(false)
            atualizarDados()


        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <Box component={Paper} p={2} mt={3} elevation={3}>
            <Box display='flex' alignContent='center' justifyContent='space-between' bgcolor='lightgray' borderRadius='5px' p={1}>
                <Typography>
                    1° Fase
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
                showFase1 ? (
                    <Box className='fase-1'>
                        <Box component={Paper} p={1} elevation={2} mt={2}>
                            <TextField label='Entidade' fullWidth size="small" value={dataUpdate.entidade} style={{ marginBottom: '20px' }} onChange={(e) => {
                                setDataUpdate({ ...dataUpdate, entidade: e.target.value })
                            }} />
                            <FormControl >
                                <FormLabel id="demo-row-radio-buttons-group-label">Plano Amil</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={e => {
                                        e.target.value === 'Sim' ? setShowPlanoAmil(true) : setShowPlanoAmil(false)
                                        setDataUpdate({ ...dataUpdate, planoAmil: e.target.value })
                                    }}
                                    value={dataUpdate.planoAmil}
                                >
                                    <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="Não" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>
                            {
                                showPlanoAmil ? (
                                    <Box p={1} className='slide-down'>
                                        <TextField label='Data Inicio' size="small" type='date' focused style={{ marginRight: '14px' }} value={dataUpdate.dataInicioPlanoAmil} onChange={(e) => { setDataUpdate({ ...dataUpdate, dataInicioPlanoAmil: e.target.value }) }} />
                                        <TextField label='Data Fim' size="small" type='date' focused style={{ marginRight: '14px' }} value={dataUpdate.dataFimPlanoAmil} onChange={(e) => { setDataUpdate({ ...dataUpdate, dataFimPlanoAmil: e.target.value }) }} />
                                        <TextField label='Custo' size='small' style={{ marginRight: '14px' }} value={dataUpdate.custoPlanoAmil} onChange={(e) => { setDataUpdate({ ...dataUpdate, custoPlanoAmil: e.target.value }) }} />
                                    </Box>
                                ) : null
                            }
                        </Box>
                        <Box component={Paper} p={1} elevation={2} mt={2}>
                            <Typography variant="h6">
                                Dados Angariador
                            </Typography>
                            <Box p={1}>
                                <TextField label='CPF Corretor' style={{ marginRight: '10px' }} size='small' value={dataUpdate.cpfCorretor} onChange={e => { setDataUpdate({ ...dataUpdate, cpfCorretor: e.target.value }) }} />
                                <TextField label='Nome Corretor' style={{ marginRight: '10px' }} size='small' value={dataUpdate.nomeCorretor} onChange={e => { setDataUpdate({ ...dataUpdate, nomeCorretor: e.target.value }) }} />
                                <TextField label='Telefone Corretor' style={{ marginRight: '10px' }} size='small' value={dataUpdate.telefoneCorretor} onChange={e => { setDataUpdate({ ...dataUpdate, telefoneCorretor: e.target.value }) }} />
                            </Box>
                            <Box p={1}>
                                <TextField label='CPF Supervisor' style={{ marginRight: '10px' }} size='small' value={dataUpdate.cpfSupervisor} onChange={e => { setDataUpdate({ ...dataUpdate, cpfSupervisor: e.target.value }) }} />
                                <TextField label='Nome Supervisor' style={{ marginRight: '10px' }} size='small' value={dataUpdate.nomeSupervisor} onChange={e => { setDataUpdate({ ...dataUpdate, nomeSupervisor: e.target.value }) }} />
                                <TextField label='Telefone Supervisor' style={{ marginRight: '10px' }} size='small' value={dataUpdate.telefoneSupervisor} onChange={e => { setDataUpdate({ ...dataUpdate, telefoneSupervisor: e.target.value }) }} />
                            </Box>
                        </Box>
                        <Box m={2}>
                            <Button style={{ marginRight: '20px' }} variant="contained" onClick={salvar} disabled={loading}>Salvar {loading ? <CircularProgress style={{ width: '10px', height: '10px', marginLeft: '10px' }} /> : null}</Button>
                            {
                                !fase1 ? (
                                    <Button variant="contained" color="success" onClick={() => { setModalConcluir(true) }}>Concluir</Button>
                                ) : null
                            }
                        </Box>
                    </Box>
                ) : null
            }
            <Modal
                open={modalConcluir}
                onClose={() => setModalConcluir(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                        <Typography variant="h6" component="div">
                            Anexado no Sisamil?
                        </Typography>
                        <Typography variant="body2" display='flex' justifyContent='space-around' width='100%' margin='1rem'>
                            <Button variant='contained' onClick={() => setModalConcluir(false)}>Fechar</Button>
                            <Button color="success" variant='contained' onClick={concluir} disabled={loading} >Concluir {loading ? <CircularProgress style={{ width: '10px', height: '10px', marginLeft: '10px', color: 'darkgreen' }} /> : null} </Button>
                        </Typography>
                    </Box>
                </Box>
            </Modal>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Atualizado com sucesso!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default PrimeiraFase