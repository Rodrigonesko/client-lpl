import { useEffect, useState } from "react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { Container, Divider, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Select, MenuItem, FormControl, InputLabel, Alert, Snackbar, CircularProgress, Box } from "@mui/material"
import { getSemDocumentos, atribuirAnalista, doumentoRecebido } from "../../../_services/elegibilidade.service"
import { getAnalistasElegibilidade } from "../../../_services/user.service"
import moment from "moment"

const SemDocumentos = () => {

    const [propostas, setPropostas] = useState([])
    const [analistas, setAnalistas] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleDocumentoRecebido = async (id) => {

        await doumentoRecebido({ id })

        setMsg('Documento recebido')
        setOpen(true)
        setFlushHook(true)

    }

    const fetchData = async () => {

        setLoading(true)
        const data = await getSemDocumentos()

        setPropostas(data)

        const result = await getAnalistasElegibilidade()

        setAnalistas(result.analistas)

        setLoading(false)

    }

    const atribuir = async (analista, id) => {
        try {

            await atribuirAnalista({ analista, id })

            setMsg('Analista atribuido com sucesso!')
            setOpen(true);
            setFlushHook(true)

        } catch (error) {
            console.log(error);
        }
    }

    const handleReport = () => {

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Proposta</th>"
        xls += "<th>Data Importação</th>"
        xls += "<th>Inicio Vigencia</th>"
        xls += "<th>Nome Titular</th>"
        xls += "<th>Administradora</th>"
        xls += "</tr>"

        for (const proposta of propostas) {
            xls += "<tr>"
            xls += `<td>${proposta.proposta}</td>`
            xls += `<td>${proposta.dataImportacao}</td>`
            xls += `<td>${proposta.vigencia}</td>`
            xls += `<td>${proposta.nome}</td>`
            xls += `<td>${proposta.administradora}</td>`
            xls += "</tr>"
        }

        xls += "</tbody></table>"

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'relatorio sem documentos.xls'
        a.click()

    }

    useEffect(() => {

        setFlushHook(false)
        fetchData()

    }, [flushHook])

    return (
        <>
            <Sidebar />
            <Container>
                <Box display='flex' justifyContent='space-between' >
                    <Typography variant="h6" m={2} >
                        Propostas sem documento
                    </Typography>
                    <Box mt={2}>
                        <Button onClick={handleReport} variant='contained' size="small" >Report</Button>
                    </Box>
                </Box>
                <Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
                <TableContainer>
                    <Table className="table">
                        <TableHead className="table-header">
                            <TableRow>
                                <TableCell>Proposta</TableCell>
                                <TableCell>Data Importação</TableCell>
                                <TableCell>Inicio Vigência</TableCell>
                                <TableCell>Nome Titular</TableCell>
                                <TableCell>Entidade</TableCell>
                                <TableCell>Analista</TableCell>
                                <TableCell>Status Proposta</TableCell>
                                <TableCell>Voltar para analise</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !loading ? propostas.map(proposta => {
                                    return (
                                        <TableRow>
                                            <TableCell>{proposta.proposta}</TableCell>
                                            <TableCell>{moment(proposta.dataImportacao).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{moment(proposta.vigencia).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{proposta.nome}</TableCell>
                                            <TableCell>{proposta.entidade}</TableCell>
                                            <TableCell>
                                                <FormControl size="small" style={{ minWidth: '100px' }}>
                                                    <InputLabel>Analista</InputLabel>
                                                    <Select
                                                        label='Analista'
                                                        value={proposta.analista}
                                                        onChange={item => {
                                                            atribuir(item.target.value, proposta._id)
                                                        }}
                                                    >
                                                        <MenuItem>
                                                            <em>Analista</em>
                                                        </MenuItem>
                                                        <MenuItem value='A definir'>A definir</MenuItem>
                                                        {
                                                            analistas.map(analista => {
                                                                return (
                                                                    <MenuItem value={analista.name}>{analista.name}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell>{proposta.status}</TableCell>
                                            <TableCell><Button onClick={() => handleDocumentoRecebido(proposta._id)} color='primary' variant='outlined'>Recebido</Button></TableCell>
                                        </TableRow>
                                    )
                                }) : (
                                    <CircularProgress style={{ position: 'absolute', right: '50%' }} />
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert variant='filled' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}

export default SemDocumentos