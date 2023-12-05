import { Box, Button, Checkbox, CircularProgress, Collapse, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Paper, Radio, RadioGroup, Tooltip, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useState } from 'react';
import { quantidadePropostasNaoRealizadas } from '../../../../_services/teleEntrevistaExterna.service';
import { Refresh, Menu, Close } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

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
        naoLidas: 0,
        erroWhatsapp: 0,
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
    const [open, setOpen] = useState(true)

    const handleToggle = () => {
        setOpen(!open)
    }

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

        <Box>
            <Collapse
                in={open}
                orientation='horizontal'
                collapsedSize={50}
            >
                <Box component={Paper} display={'flex'} flexDirection={'column'} width={'250px'} bgcolor={grey[100]}>
                    <Typography
                        variant="h6"
                        component="div"
                    >
                        {
                            open ? (
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    Filtros
                                    <Tooltip title='Fechar filtros' arrow>
                                        <IconButton
                                            onClick={handleToggle}
                                        >
                                            <Close />
                                        </IconButton>
                                    </Tooltip>

                                </Box>

                            ) : (
                                <Tooltip title='Abrir filtros' arrow>
                                    <IconButton
                                        onClick={handleToggle}
                                    >
                                        <Menu />
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                    </Typography>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Tooltip title='Filtrar'>
                            <Button variant='contained' sx={{ m: 1, width: open ? '200px' : '30px', minWidth: '30px' }} onClick={handleFilter}>
                                {
                                    open ? 'Filtrar' : 'F'
                                }
                            </Button>
                        </Tooltip>
                        <Tooltip title='Limpar filtros'>
                            <Button
                                onClick={handleClear}
                                sx={{ m: 1, width: open ? '200px' : '30px', minWidth: '30px' }}
                                variant='contained'
                            >
                                {
                                    open ? 'Limpar' : 'L'
                                }
                            </Button>
                        </Tooltip>
                    </Box>
                    <Box>
                        {
                            loading ? (
                                <CircularProgress size={'20px'} sx={{ m: 1 }} />
                            ) : (
                                <Tooltip title='Atualizar quantidade' arrow>
                                    <IconButton
                                        onClick={fetchTotalPropostas}
                                        sx={{ m: 1 }}
                                    >
                                        <Refresh />
                                    </IconButton>
                                </Tooltip>
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
                            sx={{
                                ":hover": {
                                    zIndex: 99999,
                                    backgroundColor: 'transparent',
                                    color: 'black',
                                    cursor: 'pointer',
                                    position: 'relative',
                                }
                            }}
                        >
                            Status
                        </FormLabel>
                        <FormGroup
                        >
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={status.agendar}
                                            onChange={handleChangeAgendado}
                                            name="agendar"
                                        />) : (
                                        <Tooltip title='Agendar' arrow>
                                            <Checkbox
                                                checked={status.agendar}
                                                onChange={handleChangeAgendado}
                                                name="agendar"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Agendar (${totalPropostas.agendar})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={status.agendado}
                                            onChange={handleChangeAgendado}
                                            name="agendado"
                                        />) : (
                                        <Tooltip title='Agendado' arrow>
                                            <Checkbox
                                                checked={status.agendado}
                                                onChange={handleChangeAgendado}
                                                name="agendado"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Agendado (${totalPropostas.agendado})`}
                            />
                            <Divider />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={status.humanizado}
                                            onChange={handleChangeStatus}
                                            name="humanizado"
                                        />) : (
                                        <Tooltip title='Humanizado' arrow>
                                            <Checkbox
                                                checked={status.humanizado}
                                                onChange={handleChangeStatus}
                                                name="humanizado"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Humanizado (${totalPropostas.humanizado})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={status.naoLidas}
                                            onChange={handleChangeStatus}
                                            name="naoLidas"
                                        />) : (
                                        <Tooltip title='Não lidas' arrow>
                                            <Checkbox
                                                checked={status.naoLidas}
                                                onChange={handleChangeStatus}
                                                name="naoLidas"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Não lidas (${totalPropostas.naoLidas})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={status.janelas}
                                            onChange={handleChangeStatus}
                                            name="janelas"

                                        />) : (
                                        <Tooltip title='Janelas' arrow>
                                            <Checkbox
                                                checked={status.janelas}
                                                onChange={handleChangeStatus}
                                                name="janelas"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Janelas (${totalPropostas.janelas})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={status.ajustar}
                                            onChange={handleChangeStatus}
                                            name="ajustar"
                                        />) : (
                                        <Tooltip title='Ajustar' arrow>
                                            <Checkbox
                                                checked={status.ajustar}
                                                onChange={handleChangeStatus}
                                                name="ajustar"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Ajustar (${totalPropostas.ajustar})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (<Checkbox
                                        checked={status.semWhats}
                                        onChange={handleChangeStatus}
                                        name="semWhats"
                                    />) : (
                                        <Tooltip title='Sem Whatsapp' arrow>
                                            <Checkbox
                                                checked={status.semWhats}
                                                onChange={handleChangeStatus}
                                                name="semWhats"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Sem Whatsapp (${totalPropostas.semWhats})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={status.erroWhatsapp}
                                            onChange={handleChangeStatus}
                                            name="erroWhatsapp"
                                        />) : (
                                        <Tooltip title='Erro Whatsapp' arrow>
                                            <Checkbox
                                                checked={status.erroWhatsapp}
                                                onChange={handleChangeStatus}
                                                name="erroWhatsapp"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Erro Whatsapp (${totalPropostas.erroWhatsapp})`}
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
                            sx={{
                                ":hover": {
                                    zIndex: 999999,
                                    backgroundColor: 'transparent',
                                    color: 'black',
                                    cursor: 'pointer',
                                    position: 'relative',
                                }
                            }}
                        >
                            Tipo Contrato
                        </FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={tipoContrato.pme}
                                            onChange={handleChangeTipoContrato}
                                            name="pme"
                                        />) : (
                                        <Tooltip title='PME' arrow>
                                            <Checkbox
                                                checked={tipoContrato.pme}
                                                onChange={handleChangeTipoContrato}
                                                name="pme"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `PME (${totalPropostas.pme})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={tipoContrato.pf}
                                            onChange={handleChangeTipoContrato}
                                            name="pf"

                                        />) : (
                                        <Tooltip title='PF' arrow>
                                            <Checkbox
                                                checked={tipoContrato.pf}
                                                onChange={handleChangeTipoContrato}
                                                name="pf"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `PF (${totalPropostas.pf})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={tipoContrato.adesao}
                                            onChange={handleChangeTipoContrato}
                                            name="adesao"

                                        />) : (
                                        <Tooltip title='Adesão' arrow>
                                            <Checkbox
                                                checked={tipoContrato.adesao}
                                                onChange={handleChangeTipoContrato}
                                                name="adesao"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Adesão (${totalPropostas.adesao})`}
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
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={vigencia.noPrazo}
                                            onChange={handleChangeVigencia}
                                            name="noPrazo"

                                        />
                                    ) : (
                                        <Tooltip title='No Prazo' arrow>
                                            <Checkbox
                                                checked={vigencia.noPrazo}
                                                onChange={handleChangeVigencia}
                                                name="noPrazo"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `No Prazo (${totalPropostas.noPrazo})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={vigencia.foraDoPrazo}
                                            onChange={handleChangeVigencia}
                                            name="foraDoPrazo"

                                        />) : (
                                        <Tooltip title='Fora do Prazo' arrow>
                                            <Checkbox
                                                checked={vigencia.foraDoPrazo}
                                                onChange={handleChangeVigencia}
                                                name="foraDoPrazo"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Fora do Prazo (${totalPropostas.foraDoPrazo})`}
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
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={altoRisco.baixo}
                                            onChange={handleChangeAltoRisco}
                                            name="baixo"
                                        />
                                    ) : (
                                        <Tooltip title='Baixo' arrow>
                                            <Checkbox
                                                checked={altoRisco.baixo}
                                                onChange={handleChangeAltoRisco}
                                                name="baixo"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Baixo (${totalPropostas.baixo})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (<Checkbox
                                        checked={altoRisco.medio}
                                        onChange={handleChangeAltoRisco}
                                        name="medio"
                                    />) : (
                                        <Tooltip title='Médio' arrow>
                                            <Checkbox
                                                checked={altoRisco.medio}
                                                onChange={handleChangeAltoRisco}
                                                name="medio"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Médio (${totalPropostas.medio})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={altoRisco.alto}
                                            onChange={handleChangeAltoRisco}
                                            name="alto"
                                        />) : (
                                        <Tooltip title='Alto' arrow>
                                            <Checkbox
                                                checked={altoRisco.alto}
                                                onChange={handleChangeAltoRisco}
                                                name="alto"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Alto (${totalPropostas.alto})`}
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
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={idade.maior60}
                                            onChange={handleChangeIdade}
                                            name="maior60"
                                        />) : (
                                        <Tooltip title='Maior que 60' arrow>
                                            <Checkbox
                                                checked={idade.maior60}
                                                onChange={handleChangeIdade}
                                                name="maior60"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Maior que 60 (${totalPropostas.maior60})`}
                            />
                            <FormControlLabel
                                control={
                                    open ? (
                                        <Checkbox
                                            checked={idade.menor60}
                                            onChange={handleChangeIdade}
                                            name="menor60"
                                        />) : (
                                        <Tooltip
                                            title='Menor que 60' arrow
                                        >
                                            <Checkbox
                                                checked={idade.menor60}
                                                onChange={handleChangeIdade}
                                                name="menor60"
                                            />
                                        </Tooltip>
                                    )
                                }
                                label={open && `Menor que 60 (${totalPropostas.menor60})`}
                            />
                        </FormGroup>
                    </FormControl>
                </Box>
            </Collapse>


        </Box>
    )
}

export default Filtros