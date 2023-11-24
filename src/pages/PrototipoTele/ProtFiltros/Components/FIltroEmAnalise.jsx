import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const FiltroEmAnalise = () => {
    return (
        <Box>
            <Typography
                variant="h5"
                m={2}
            >
                Em análise
            </Typography>
            <Divider />
            <Box display={'flex'} m={2}>
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography
                        variant="h6"
                        component="div"
                    >
                        Filtros
                    </Typography>
                    <Box>
                        <Button>
                            Filtrar
                        </Button>
                        <Button>
                            Limpar
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
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Agendar"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Humanizado"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Janelas"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Ajustar"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Sem Whats"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
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
                                control={<Checkbox />}
                                label="PME"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="PF"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
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
                                control={<Checkbox />}
                                label="No prazo"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
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
                                control={<Checkbox />}
                                label="Baixo"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Médio"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Alto"
                            />
                        </FormGroup>
                    </FormControl>
                </Box>
                <Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Recebimento</TableCell>
                                    <TableCell>Vigência</TableCell>
                                    <TableCell>Proposta</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Associado</TableCell>
                                    <TableCell>Idade</TableCell>
                                    <TableCell>Sexo</TableCell>
                                    <TableCell>Tipo Contrato</TableCell>
                                    <TableCell>Janela Escolhida</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Risco</TableCell>
                                    <TableCell>Detalhes</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
}

export default FiltroEmAnalise;