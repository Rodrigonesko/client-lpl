import { Alert, Box, CircularProgress, Container, IconButton, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import SearchIcon from '@mui/icons-material/Search';
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { encontrarPessoas } from "../../../_services/rsd.service";
import ModalConcluidos from "./Modais/ModalConcluidos";

const Beneficiarios = () => {

    const [pessoas, setPessoas] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [message, setMessage] = useState('')
    const [openSnack, setOpenSnack] = useState(false)
    const [severity, setSeverity] = useState('')

    const pessoasEncontrar = async (event) => {
        try {
            event.preventDefault()
            if (pesquisa.length < 3) {
                setOpenSnack(true)
                setMessage('Digite no minimo 3 caracteres!')
                setSeverity('warning')
                return
            }
            setLoading(true)
            const find = await encontrarPessoas(pesquisa)
            console.log(find);
            setPessoas(find)
            setLoading(false)
            setOpenSnack(true)
            setMessage('Dados encontrados com sucesso!')
            setSeverity('success')

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook])


    return (
        <>
            <Sidebar>
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
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
                            Beneficiários
                        </Typography>
                    </Box>
                    <Box
                        sx={{ mt: 10 }}
                    >
                        <form action="">
                            <TextField type='text' size='small' label='Pesquisar' onChange={(e) => { setPesquisa(e.target.value) }} fullWidth InputProps={{
                                startAdornment: (
                                    <IconButton position="start" type='submit' onClick={pessoasEncontrar} ><SearchIcon /></IconButton>
                                ),
                                style: {
                                    borderRadius: '10px',

                                }
                            }}
                            />
                        </form>
                    </Box>
                    <Box
                        sx={{ mt: 2, textAlign: 'center' }}
                    >
                        {
                            loading ? (
                                <CircularProgress size={50} />
                            ) : (
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: blue[600] }} >
                                            <TableCell sx={{ color: "white" }} >
                                                NOME BENEFICIÁRIO
                                            </TableCell>
                                            <TableCell sx={{ color: "white" }}>
                                                MARCA ÓTICA
                                            </TableCell>
                                            <TableCell sx={{ color: "white" }}>
                                                CPF
                                            </TableCell>
                                            <TableCell sx={{ color: "white" }}>
                                                DETALHES
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            (pessoas || []).map((item) => {
                                                return (
                                                    <TableRow key={item._id}>
                                                        <TableCell>{item.nome}</TableCell>
                                                        <TableCell>{item.mo}</TableCell>
                                                        <TableCell>{item.cpf}</TableCell>
                                                        <TableCell>
                                                            <ModalConcluidos 
                                                            item={item}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            )
                        }
                    </Box>
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                        <Alert variant="filled" onClose={() => setOpenSnack(false)} severity={severity} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </Container>
            </Sidebar>
        </>
    )
}

export default Beneficiarios