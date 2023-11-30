import { Box, Button, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Radio, RadioGroup, Tooltip, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useState } from 'react';
import { quantidadePropostasNaoRealizadas } from '../../../../_services/teleEntrevistaExterna.service';
import { Refresh } from '@mui/icons-material';

const Filtros = ({
    status,
    tipoContrato,
    vigencia,
    altoRisco,
    idade,
    handleChangeStatus,
    handleChangeAgendado,
    handleChangeTipoContrato,
    handleChangeVigencia,
    handleChangeAltoRisco,
    handleChangeIdade,
    handleFilter,
    handleClear
}) => {

    const [totalPropostas, setTotalPropostas] = useState({
        agendar: 0,
        humanizado: 0,
        janelas: 0,
        ajustar: 0,
        semWhats: 0,
        agendado: 0,
        pme: 0,
        pf: 0,
        adesao: 0,
        noPrazo: 0,
        foraDoPrazo: 0,
        baixo: 0,
        medio: 0,
        alto: 0,
    });
    const [loading, setLoading] = useState(false)

    const fetchTotalPropostas = async () => {
        try {
            setLoading(true)
            const result = await quantidadePropostasNaoRealizadas()
            setTotalPropostas(result)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTotalPropostas()
    }, [])

    return (
        <Box display={'flex'} flexDirection={'column'} width={'300px'}>
            <Typography
                variant="h6"
                component="div"
            >
                Filtros
            </Typography>
            <Box display={'flex'} flexDirection={'column'}>
                <Button variant='contained' sx={{ m: 1 }} onClick={handleFilter}>
                    Filtrar
                </Button>
                <Button
                    onClick={handleClear}
                    sx={{ m: 1 }}
                    variant='contained'
                >
                    Limpar
                </Button>
            </Box>
            <Box>
                <Tooltip title='Atualizar quantidade' arrow>
                    <IconButton
                        onClick={fetchTotalPropostas}
                        sx={{ m: 1 }}
                    >
                        <Refresh />
                    </IconButton>
                </Tooltip>
                {
                    loading && (
                        <CircularProgress />
                    )
                }
            </Box>
            <FormControl
                sx={{ m: 1 }}
                component={'fieldset'}
                variant="standard"
            >
                <FormLabel
                    component={'legend'}
                >
                    Status
                </FormLabel>
                <FormGroup
                >
                    <FormControlLabel
                        control={<Checkbox
                            checked={status.agendar}
                            onChange={handleChangeAgendado}
                            name="agendar"
                        />}
                        label={`Agendar (${totalPropostas.agendar})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={status.agendado}
                            onChange={handleChangeAgendado}
                            name="agendado"

                        />}
                        label={`Agendado (${totalPropostas.agendado})`}
                    />
                    <Divider />
                    <FormControlLabel
                        control={<Checkbox
                            checked={status.humanizado}
                            onChange={handleChangeStatus}
                            name="humanizado"
                        />}
                        label={`Humanizado (${totalPropostas.humanizado})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={status.janelas}
                            onChange={handleChangeStatus}
                            name="janelas"

                        />}
                        label={`Janelas (${totalPropostas.janelas})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={status.ajustar}
                            onChange={handleChangeStatus}
                            name="ajustar"
                        />}
                        label={`Ajustar (${totalPropostas.ajustar})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={status.semWhats}
                            onChange={handleChangeStatus}
                            name="semWhats"
                        />}
                        label={`Sem Whatsapp (${totalPropostas.semWhats})`}
                    />

                </FormGroup>
            </FormControl>
            <FormControl
                sx={{ m: 1 }}
                component={'fieldset'}
                variant="standard"
            >
                <FormLabel
                    component={'legend'}
                >
                    Tipo Contrato
                </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                            checked={tipoContrato.pme}
                            onChange={handleChangeTipoContrato}
                            name="pme"
                        />}
                        label={`PME (${totalPropostas.pme})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={tipoContrato.pf}
                            onChange={handleChangeTipoContrato}
                            name="pf"

                        />}
                        label={`PF (${totalPropostas.pf})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={tipoContrato.adesao}
                            onChange={handleChangeTipoContrato}
                            name="adesao"

                        />}
                        label={`Adesão (${totalPropostas.adesao})`}
                    />
                </FormGroup>
            </FormControl>
            <FormControl
                sx={{ m: 1 }}
                component={'fieldset'}
                variant="standard"
            >
                <FormLabel
                    component={'legend'}
                >
                    Vigência
                </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                            checked={vigencia.noPrazo}
                            onChange={handleChangeVigencia}
                            name="noPrazo"

                        />}
                        label={`No Prazo (${totalPropostas.noPrazo})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={vigencia.foraDoPrazo}
                            onChange={handleChangeVigencia}
                            name="foraDoPrazo"

                        />}
                        label={`Fora do Prazo (${totalPropostas.foraDoPrazo})`}
                    />
                </FormGroup>
            </FormControl>
            <FormControl
                sx={{ m: 1 }}
                component={'fieldset'}
                variant="standard"
            >
                <FormLabel
                    component={'legend'}
                >
                    Alto Risco
                </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                            checked={altoRisco.baixo}
                            onChange={handleChangeAltoRisco}
                            name="baixo"
                        />}
                        label={`Baixo (${totalPropostas.baixo})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={altoRisco.medio}
                            onChange={handleChangeAltoRisco}
                            name="medio"
                        />}
                        label={`Médio (${totalPropostas.medio})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={altoRisco.alto}
                            onChange={handleChangeAltoRisco}
                            name="alto"
                        />}
                        label={`Alto (${totalPropostas.alto})`}
                    />
                </FormGroup>
            </FormControl>
            <FormControl
                sx={{ m: 1 }}
                component={'fieldset'}
                variant="standard"
            >
                <FormLabel
                    component={'legend'}
                >
                    Idade
                </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox
                            checked={idade.maior60}
                            onChange={handleChangeIdade}
                            name="maior60"
                        />}
                        label={`Maior que 60 (${totalPropostas.maior60})`}
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={idade.menor60}
                            onChange={handleChangeIdade}
                            name="menor60"
                        />}
                        label={`Menor que 60 (${totalPropostas.menor60})`}
                    />
                </FormGroup>
            </FormControl>
        </Box>
    )
}

export default Filtros