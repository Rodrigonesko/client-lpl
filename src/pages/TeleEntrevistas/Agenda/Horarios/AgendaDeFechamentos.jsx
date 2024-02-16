import { Autocomplete, Box, Button, Chip, Drawer, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { createNextCloseSchedules, deleteNextCloseSchedules, getNextCloseSchedules } from "../../../../_services/teleEntrevista.service"
import { filterUsers } from "../../../../_services/user.service"
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment"

const AgendaDeFechamentos = () => {

    const [open, setOpen] = useState(false)
    const [analistas, setAnalistas] = useState([])
    const [data, setData] = useState('')
    const [analista, setAnalista] = useState('')
    const [agenda, setAgenda] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const handleOpen = async () => {
        setOpen(true)
        const result = await getNextCloseSchedules()
        const resultAnalistas = await filterUsers({
            inativo: { $ne: true },
            atividadePrincipal: 'Tele Entrevista'
        })
        setAnalistas(resultAnalistas.map(e => e.name))
        setAgenda(result)
    }

    const handleCreate = async () => {
        const result = await createNextCloseSchedules({
            data: data,
            analista: analista
        })
        setFlushHook(!flushHook)
    }

    const handleDelete = async (id) => {
        const result = await deleteNextCloseSchedules(id)
        setFlushHook(!flushHook)
    }

    useEffect(() => {
        const fetch = async () => {
            const result = await getNextCloseSchedules()
            setAgenda(result)
        }
        fetch()

    }, [flushHook])

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                    ml: 2,
                    bgcolor: 'black',
                    '&:hover': {
                        bgcolor: 'black',
                        opacity: 0.8
                    }
                }}
            >
                Agenda
            </Button>

            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: '30%',
                    }
                }}
            >
                <Typography variant="h6" sx={{
                    m: 2,
                }}>
                    Agenda de Fechamentos
                </Typography>
                <Box
                    sx={{
                        m: 2,
                    }}
                    display={'flex'}
                >
                    <TextField
                        label="Data"
                        type="date"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={data}
                        onChange={e => setData(e.target.value)}
                        sx={{
                            mr: 2,
                        }}
                    />
                    <Autocomplete
                        options={analistas}
                        renderInput={(params) => <TextField {...params} label="Analista" size="small" sx={{ minWidth: '200px' }} fullWidth />}
                        value={analista}
                        onChange={(e, value) => setAnalista(value)}
                    />
                    <Button
                        onClick={handleCreate}
                        variant="contained"
                        size="small"
                        sx={{
                            bgcolor: 'green',
                            '&:hover': {
                                bgcolor: 'green',
                                opacity: 0.8
                            },
                            ml: 2,
                        }}
                    >
                        Salvar
                    </Button>
                </Box>
                <TableContainer>
                    <Table
                        size="small"
                    >
                        <TableHead
                            sx={{
                                bgcolor: grey[200],
                            }}
                        >
                            <TableRow>
                                <TableCell>
                                    Data
                                </TableCell>
                                <TableCell>
                                    Analista
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                agenda.map(e => {
                                    return (
                                        <TableRow key={e._id}>
                                            <TableCell>
                                                {
                                                    e.data === moment().format('YYYY-MM-DD') ? <Chip label={moment(e.data).format('DD/MM/YYYY')} color="error" /> : e.data === moment().businessAdd(1, 'days').format('YYYY-MM-DD') ? <Chip label={moment(e.data).format('DD/MM/YYYY')} color="warning" /> : <Chip label={moment(e.data).format('DD/MM/YYYY')} />
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {e.analista}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() => handleDelete(e._id)}
                                                    size="small"
                                                    sx={{
                                                        color: 'red',
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Drawer>
        </>
    )
}

export default AgendaDeFechamentos