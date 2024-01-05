import { Divider, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { getPropostasAAnexar } from "../../../../../_services/teleEntrevista.service"
import moment from "moment"
import Anexar from "./Anexar"
import MandarImplantacao from "./MandarImplantacao"
import RelatorioAnexos from "./RelatorioAnexos"

const Anexos = () => {

    const [loading, setLoading] = useState(false)
    const [flushHook, setFlushHook] = useState(false)
    const [divergencia, setDivergencia] = useState('Todos')
    const [propostas, setPropostas] = useState([])

    const fetchData = async () => {
        setLoading(true)
        let { propostas } = await getPropostasAAnexar()
        if (divergencia === 'Todos') {
            setPropostas(propostas)
        } else if (divergencia === 'sim') {
            setPropostas(propostas.filter(proposta => proposta.houveDivergencia === 'Sim'))
        } else if (divergencia === 'nao') {
            setPropostas(propostas.filter(proposta => proposta.houveDivergencia === 'Não'))
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [divergencia, flushHook])

    return (
        <Box>
            <Box display={'flex'} mb={2}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '30%',
                            height: '2px',
                            bottom: 0,
                            left: '0%',
                            backgroundColor: 'currentColor',
                            transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                            width: '100%',
                            left: '0%',
                        },
                    }}
                >
                    Anexar
                </Typography>
            </Box>
            <Divider />
            <Grid
                container
                sx={{
                    mt: 2,
                }}
            >
                <Grid
                    item
                    sx={{
                        mr: 3,
                    }}
                >
                    <FormControl
                        size="small"

                    >
                        <InputLabel>Divergência</InputLabel>
                        <Select
                            value={divergencia}
                            onChange={event => setDivergencia(event.target.value)}
                            sx={{
                                minWidth: 200,
                            }}
                            label="Divergência"
                        >
                            <MenuItem value={'Todos'}>Todos</MenuItem>
                            <MenuItem value={'sim'}>Sim</MenuItem>
                            <MenuItem value={'nao'}>Não</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                >
                    <RelatorioAnexos />
                </Grid>
            </Grid>
            <Box>
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        mt: 2,
                    }}
                >
                    Propostas: {propostas.length}
                </Typography>
            </Box>
            <TableContainer
                sx={{
                    mt: 2,
                }}
            >
                <Table
                    size="small"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: '#F5F5F5'
                            }}
                        >
                            <TableCell>
                                Vigência
                            </TableCell>
                            <TableCell>
                                Proposta
                            </TableCell>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Contrato
                            </TableCell>
                            <TableCell>
                                Divergência?
                            </TableCell>
                            <TableCell>
                                Cids
                            </TableCell>
                            <TableCell>
                                Divergência
                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !loading ? (propostas.map((proposta, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell>
                                        {moment(proposta.vigencia).format('DD/MM/YYYY')}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.proposta}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.nome}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.tipoContrato}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.houveDivergencia}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.cids}
                                    </TableCell>
                                    <TableCell>
                                        {proposta.divergencia}
                                    </TableCell>
                                    <TableCell>
                                        <Anexar proposta={proposta} setFlushHook={setFlushHook} />
                                    </TableCell>
                                    <TableCell>
                                        <MandarImplantacao proposta={proposta} setFlushHook={setFlushHook} />
                                    </TableCell>
                                </TableRow>
                            ))) : (
                                <TableRow>
                                    <TableCell colSpan={9}>
                                        <LinearProgress color="secondary" />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Anexos