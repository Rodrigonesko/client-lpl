import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from '@mui/material'

const Filtros = ({
    status,
    tipoContrato,
    vigencia,
    altoRisco,
    handleChangeStatus,
    handleChangeTipoContrato,
    handleChangeVigencia,
    handleChangeAltoRisco,
    handleFilter,
    handleClear,
    handleAll
}) => {
    return (
        <Box display={'flex'} flexDirection={'column'}>
                    <Typography
                        variant="h6"
                        component="div"
                    >
                        Filtros
                    </Typography>
                    <Box>
                        <Button onClick={handleFilter}>
                            Filtrar
                        </Button>
                        <Button
                            onClick={handleClear}
                        >
                            Limpar
                        </Button>
                        <Button
                            onClick={handleAll}
                        >
                            Todos
                        </Button>
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
                                    onChange={handleChangeStatus}
                                    name="agendar"
                                />}
                                label="Agendar"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={status.humanizado}
                                    onChange={handleChangeStatus}
                                    name="humanizado"
                                />}
                                label="Humanizado"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={status.janelas}
                                    onChange={handleChangeStatus}
                                    name="janelas"

                                />}
                                label="Janelas"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={status.ajustar}
                                    onChange={handleChangeStatus}
                                    name="ajustar"
                                />}
                                label="Ajustar"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={status.semWhats}
                                    onChange={handleChangeStatus}
                                    name="semWhats"
                                />}
                                label="Sem Whats"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={status.agendado}
                                    onChange={handleChangeStatus}
                                    name="agendado"

                                />}
                                label="Agendado"
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
                                label="PME"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={tipoContrato.pf}
                                    onChange={handleChangeTipoContrato}
                                    name="pf"

                                />}
                                label="PF"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={tipoContrato.adesao}
                                    onChange={handleChangeTipoContrato}
                                    name="adesao"

                                />}
                                label="Adesão"
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
                                label="No prazo"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={vigencia.foraDoPrazo}
                                    onChange={handleChangeVigencia}
                                    name="foraDoPrazo"

                                />}
                                label="Fora do Prazo"
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
                                label="Baixo"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={altoRisco.medio}
                                    onChange={handleChangeAltoRisco}
                                    name="medio"
                                />}
                                label="Médio"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    checked={altoRisco.alto}
                                    onChange={handleChangeAltoRisco}
                                    name="alto"
                                />}
                                label="Alto"
                            />
                        </FormGroup>
                    </FormControl>
                </Box>
    )
}

export default Filtros