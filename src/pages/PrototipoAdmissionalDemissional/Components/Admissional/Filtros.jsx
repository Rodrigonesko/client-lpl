import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { useState } from 'react'
import { filterTable } from '../../../../_services/admissaoDemissao.service'

const Filtros = () => {

    const [responsaveis, setResponsaveis] = useState({
        samanthaMacielGiazzon: true,
        rodrigoDias: false,
        administrador: false,
        gersonDouglas: false,
    })

    const handleChangeResponsaveis = (event) => {
        if (event.target.name === 'samanthaMacielGiazzon') {
            setResponsaveis({ ...responsaveis, samanthaMacielGiazzon: event.target.checked });
        } else if (event.target.name === 'administrador') {
            setResponsaveis({ ...responsaveis, administrador: event.target.checked });
        } else if (event.target.name === 'rodrigoDias') {
            setResponsaveis({ ...responsaveis, rodrigoDias: event.target.checked });
        } else if (event.target.name === 'gersonDouglas') {
            setResponsaveis({ ...responsaveis, gersonDouglas: event.target.checked });
        }
    }

    const [status, setStatus] = useState({
        naoSeAplica: false,
        pendente: false,
        emAndamento: false,
        concluido: false,
    })

    const handleChangeStatus = (event) => {
        setStatus({ ...status, [event.target.name]: event.target.checked });
    }

    const handleClickFilter = () => {
        const filter = filterTable()
        console.log(filter)
    }

    const handleClear = () => {
        setResponsaveis({
            samanthaMacielGiazzon: false,
            administrador: false,
            rodrigoDias: false,
            gersonDouglas: false,
        })
        
        setStatus({
            pendente: false,
            naoSeAplica: false,
            emAndamento: false,
            concluido: false,
        })
    }

    return (
        <>
            <Box m={2}>
                <h3>Filtros</h3>
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant='contained' onClick={handleClickFilter}>Filtrar</Button>
                    <Button variant='contained' onClick={handleClear}>Limpar</Button>
                </Box>
                <br />
                <Divider />
                <Typography>
                    <strong>Responsáveis</strong>
                </Typography>
                <FormGroup >
                    <FormControlLabel control={<Checkbox checked={responsaveis.samanthaMacielGiazzon} onChange={handleChangeResponsaveis} name='samanthaMacielGiazzon' />} label='Samantha Maciel Giazzon' />
                    <FormControlLabel control={<Checkbox checked={responsaveis.administrador} onChange={handleChangeResponsaveis} name='administrador' />} label='Administrador' />
                    <FormControlLabel control={<Checkbox checked={responsaveis.rodrigoDias} onChange={handleChangeResponsaveis} name='rodrigoDias' />} label='Rodrigo Dias' />
                    <FormControlLabel control={<Checkbox checked={responsaveis.gersonDouglas} onChange={handleChangeResponsaveis} name='gersonDouglas' />} label='Gerson Douglas' />
                </FormGroup>
                <Divider />
                <Typography>
                    <strong>Status</strong>
                </Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={status.naoSeAplica} onChange={handleChangeStatus} name='naoSeAplica' />} label='N/A' />
                    <FormControlLabel control={<Checkbox checked={status.pendente} onChange={handleChangeStatus} name='pendente' />} label='Pendente' />
                    <FormControlLabel control={<Checkbox checked={status.emAndamento} onChange={handleChangeStatus} name='emAndamento' />} label='Em Andamento' />
                    <FormControlLabel control={<Checkbox checked={status.concluido} onChange={handleChangeStatus} name='concluido' />} label='Concluído' />
                </FormGroup>
            </Box>
        </>
    )
}

export default Filtros