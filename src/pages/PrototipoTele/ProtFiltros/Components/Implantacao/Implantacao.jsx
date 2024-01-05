import { Button, Divider, FormControl, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { yellow } from "@mui/material/colors"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { filterQueryDadosEntrevista } from "../../../../../_services/teleEntrevista.service"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import moment from "moment"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Upload from "./Upload"

const Implantacao = () => {

    const [flushHook, setFlushHook] = useState(false)
    const [loading, setLoading] = useState(false)
    const [propostas, setPropostas] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [contratos, setContratos] = useState([])
    const [contrato, setContrato] = useState('Todos')
    const [situacoesAmil, setSituacoesAmil] = useState([])
    const [situacaoAmil, setSituacaoAmil] = useState('Todos')

    const fetchContratos = async () => {
        const result = await filterQueryDadosEntrevista({
            query: {
                implantado: { $ne: 'Sim' },
                implantacao: 'Sim'
            },
        })
        setContratos(result.result.map(proposta => proposta.tipoContrato).filter((value, index, self) => self.indexOf(value) === index))
    }

    const fetchSituacoesAmil = async () => {
        const result = await filterQueryDadosEntrevista({
            query: {
                implantado: { $ne: 'Sim' },
                implantacao: 'Sim'
            },
        })
        setSituacoesAmil(result.result.map(proposta => proposta.situacaoAmil).filter((value, index, self) => self.indexOf(value) === index))
    }

    const fetchData = async () => {
        setLoading(true)
        const result = await filterQueryDadosEntrevista({
            query: {
                implantado: { $ne: 'Sim' },
                implantacao: 'Sim'
            },
            page,
            limit: 100,
        })

        setPropostas(result.result)
        setTotalPages(result.total)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
        fetchContratos()
        fetchSituacoesAmil()
        setFlushHook(false)
    }, [flushHook])

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
                            backgroundColor: yellow[700],
                            transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                            width: '100%',
                            left: '0%',
                        },
                    }}
                >
                    Implantação
                </Typography>
            </Box>
            <Divider />
            <Grid
                container
                sx={{
                    mt: 2,
                    mb: 2,
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={2}
                    sx={{
                        mr: 3,
                    }}
                >
                    <FormControl
                        fullWidth
                        size="small"

                    >
                        <InputLabel>Tipo Contrato</InputLabel>
                        <Select
                            size="small"
                            label="Tipo Contrato"
                            value={contrato}
                            onChange={event => setContrato(event.target.value)}
                        >
                            <MenuItem
                                value={'Todos'}
                            >
                                Todos
                            </MenuItem>
                            {
                                contratos.map((contrato, index) => (
                                    <MenuItem
                                        key={index}
                                        value={contrato}
                                    >
                                        {contrato}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={2}
                    sx={{
                        mr: 3,
                    }}
                >
                    <FormControl
                        fullWidth
                        size="small"
                    >
                        <InputLabel>Situação Amil</InputLabel>
                        <Select
                            size="small"
                            label="Tipo Contrato"
                            value={situacaoAmil}
                            onChange={event => setSituacaoAmil(event.target.value)}
                        >
                            <MenuItem
                                value={'Todos'}
                            >
                                Todos
                            </MenuItem>
                            {
                                situacoesAmil.map((situacao, index) => (
                                    <MenuItem
                                        key={index}
                                        value={situacao}
                                    >
                                        {situacao}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={2}
                    sx={{
                        mr: 3,
                    }}
                >
                    <Upload />
                </Grid>
            </Grid>
            <TableContainer>
                <Table
                    size="small"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: '#F5F5F5',
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
                                <Tooltip title='Downalod'>
                                    <IconButton>
                                        <FileDownloadIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !loading ? (
                                propostas.map((proposta, index) => (
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
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                size="small"
                                            >
                                                Implantar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <LinearProgress color="warning" />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    )
}

export default Implantacao