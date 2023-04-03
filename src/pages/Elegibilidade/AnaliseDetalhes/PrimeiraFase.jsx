import React, { useState } from "react";
import { Box, Paper, TextField, Typography, IconButton, FormControl, RadioGroup, FormControlLabel, FormLabel, Radio, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const PrimeiraFase = ({ entidade, planoAmil, dataInicio, dataFim, custo, cpfCorretor, nomeCorretor, telefoneCorretor, cpfSupervisor, nomeSupervisor, telefoneSupervisor, fase1 }) => {

    const [open, setOpen] = useState(false)

    const [showFase1, setShowFase1] = useState(!fase1);
    const [showPlanoAmil, setShowPlanoAmil] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({
        entidade,
        planoAmil,
        dataInicio,
        dataFim,
        custo,
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

    const salvar = () => {
        console.log(dataUpdate);
    }

    const concluir = () => {

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
                                    value={planoAmil}
                                >
                                    <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                                    <FormControlLabel value="Não" control={<Radio />} label="Não" />
                                </RadioGroup>
                            </FormControl>
                            {
                                showPlanoAmil ? (
                                    <Box p={1} className='slide-down'>
                                        <TextField label='Data Inicio' size="small" type='date' focused style={{ marginRight: '14px' }} value={dataInicio} onChange={(e) => { setDataUpdate({ ...dataUpdate, dataInicio: e.target.value }) }} />
                                        <TextField label='Data Fim' size="small" type='date' focused style={{ marginRight: '14px' }} value={dataFim} onChange={(e) => { setDataUpdate({ ...dataUpdate, dataFim: e.target.value }) }} />
                                        <TextField label='Custo' size='small' style={{ marginRight: '14px' }} value={custo} onChange={(e) => { setDataUpdate({ ...dataUpdate, custo: e.target.value }) }} />
                                    </Box>
                                ) : null
                            }
                        </Box>
                        <Box component={Paper} p={1} elevation={2} mt={2}>
                            <Typography variant="h6">
                                Dados Angariador
                            </Typography>
                            <Box p={1}>
                                <TextField label='CPF Corretor' style={{ marginRight: '10px' }} size='small' value={cpfCorretor} onChange={e => { setDataUpdate({ ...dataUpdate, cpfCorretor: e.target.value }) }} />
                                <TextField label='Nome Corretor' style={{ marginRight: '10px' }} size='small' value={nomeCorretor} onChange={e => { setDataUpdate({ ...dataUpdate, nomeCorretor: e.target.value }) }} />
                                <TextField label='Telefone Corretor' style={{ marginRight: '10px' }} size='small' value={telefoneCorretor} onChange={e => { setDataUpdate({ ...dataUpdate, telefoneCorretor: e.target.value }) }} />
                            </Box>
                            <Box p={1}>
                                <TextField label='CPF Supervisor' style={{ marginRight: '10px' }} size='small' value={cpfSupervisor} onChange={e => { setDataUpdate({ ...dataUpdate, cpfSupervisor: e.target.value }) }} />
                                <TextField label='Nome Supervisor' style={{ marginRight: '10px' }} size='small' value={nomeSupervisor} onChange={e => { setDataUpdate({ ...dataUpdate, nomeSupervisor: e.target.value }) }} />
                                <TextField label='Telefone Supervisor' style={{ marginRight: '10px' }} size='small' value={telefoneSupervisor} onChange={e => { setDataUpdate({ ...dataUpdate, telefoneSupervisor: e.target.value }) }} />
                            </Box>
                        </Box>
                        <Box m={2}>
                            <Button style={{ marginRight: '20px' }} variant="contained" onClick={salvar}>Salvar</Button>
                            <Button variant="contained" color="success" onClick={concluir}>Concluir</Button>
                        </Box>
                    </Box>
                ) : null
            }
        </Box>
    )
}

export default PrimeiraFase