import { Box, Container, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import SearchIcon from '@mui/icons-material/Search';
import { blue } from "@mui/material/colors";
import AdicionarAgenda from "./Components/AdicionarAgenda";
import { useEffect, useState } from "react";
import { getUsers } from "../../../_services/user.service";
import { createAgenda, getAgenda } from "../../../_services/agenda.service";
import moment from "moment";
import ModalExcluir from "./Components/ModalExcluir";

const Agenda = () => {

    const [user, setUser] = useState([])
    const [agendas, setAgendas] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [nome, setNome] = useState('')
    const [quantidadeRepeticao, setQuantidadeRepeticao] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [descricao, setDescricao] = useState('')
    const [open, setOpen] = useState(false)

    const handleOpen = async () => {
        setOpen(true)
    }

    const handleClose = async () => {
        setOpen(false)
    }

    const criarAgenda = async () => {
        try {
            const create = await createAgenda({
                nome,
                quantidadeRepeticao,
                dataInicio,
                descricao
            })
            setFlushHook(true)
            setOpen(false)
        } catch (error) {
            console.log(error);
        }
    }

    const pegarAgenda = async () => {
        try {
            const find = await getAgenda()
            console.log(find);
            setAgendas(find)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const result = await getUsers()
                setUser(result)
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        setFlushHook(false)
        pegarAgenda()
        getUsuarios()
    }, [flushHook])

    return (
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
                        Agenda
                    </Typography>
                    <AdicionarAgenda
                        user={user}
                        setNome={setNome}
                        setQuantidadeRepeticao={setQuantidadeRepeticao}
                        setDataInicio={setDataInicio}
                        setDescricao={setDescricao}
                        createAgenda={criarAgenda}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                    />
                </Box>
                <Box
                    sx={{ mt: 10 }}
                >
                    <TextField type='text' size='small' label='Pesquisar' fullWidth InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        style: {
                            borderRadius: '10px',

                        }
                    }}
                    />
                </Box>
                <Box
                    sx={{ mt: 3 }}
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ bgcolor: blue[600] }}>
                                <TableCell sx={{ color: "white" }} >
                                    NOME
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    REPETIÇÃO
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    DATA
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    DESCRIÇÃO
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    AÇÕES
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                agendas.map((item) => {
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell>{item.nome}</TableCell>
                                            <TableCell>{item.quantidadeRepeticao.toUpperCase()}</TableCell>
                                            <TableCell>{moment(item.dataInicio).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.descricao}</TableCell>
                                            <TableCell>
                                                <ModalExcluir 
                                                id={item._id} 
                                                setFlushHook={setFlushHook}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Box>
            </Container>
        </Sidebar>
    )
}

export default Agenda