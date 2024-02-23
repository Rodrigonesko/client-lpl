import { Add, Delete, ExpandMoreOutlined } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import { createAgenda, deleteAgenda, getAgenda } from "../../../_services/sindicancia.service"
import moment from "moment"

const Agenda = ({ id }) => {

    const [observacao, setObservacao] = useState('')
    const [agendas, setAgendas] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)

    useEffect(() => {

        const fetch = async () => {
            setLoading(true)
            const result = await getAgenda(id)
            setAgendas(result)
            setLoading(false)
        }

        fetch()

    }, [])

    const handleSubmit = async () => {
        setLoadingButton(true)
        const data = {
            observacao,
            id_demanda: id
        }
        if (!observacao) {
            setLoadingButton(false)
            return
        }
        const result = await createAgenda(data)
        setObservacao('')
        setAgendas([...agendas, result.result])
        setLoadingButton(false)
    }

    const handleDelete = async (id) => {
        setLoadingButton(true)
        const result = await deleteAgenda(id)
        setAgendas(agendas.filter(agenda => agenda.id !== id))
        setLoadingButton(false)
    }

    return (
        <Accordion
            disabled={loading}
        >
            <AccordionSummary
                expandIcon={loading ? <CircularProgress size={20} /> : <ExpandMoreOutlined />}
            >
                Agenda
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2
                    }}
                >
                    <TextField
                        placeholder="Observação"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                        disabled={loadingButton}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <IconButton
                            color="primary"
                            onClick={handleSubmit}
                            disabled={loadingButton}
                        >
                            {
                                loadingButton ? <CircularProgress size={20} /> : <Add />
                            }
                        </IconButton>
                    </Box>
                </Box>
                <TableContainer
                    sx={{
                        marginTop: 2
                    }}
                >
                    <Table
                        size="small"
                        aria-label="a dense table"
                    >
                        <TableHead
                            sx={{
                                backgroundColor: '#f5f5f5'
                            }}
                        >
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Obs</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                agendas.map((agenda, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{agenda.analista}</TableCell>
                                        <TableCell>{agenda.observacao}</TableCell>
                                        <TableCell>{moment(agenda.data).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(agenda.id)}
                                                disabled={loadingButton}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    )
}

export default Agenda