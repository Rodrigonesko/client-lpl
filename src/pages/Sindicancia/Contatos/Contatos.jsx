import { Box, Container, FormControl, InputLabel, LinearProgress, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import ModalCriarContato from "./components/ModalCriarContato"
import { grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { getContactsBradesco } from "../../../_services/whatsapp.service"
import moment from "moment"

const Contatos = () => {

    const [contatos, setContatos] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {

        const fetch = async () => {
            try {
                setLoading(true)
                const response = await getContactsBradesco(pesquisa, page, limit)
                setContatos(response.numeros)
                setTotal(response.total)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setContatos([])
                setTotal(0)
                setLoading(false)
            }
        }

        fetch()

    }, [pesquisa, page, limit, refresh])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title size={'medium'}>Contatos</Title>
                        <ModalCriarContato setRefresh={setRefresh} />
                    </Box>
                    <Box>
                        <TextField type='text' fullWidth label='Pesquisar' size='small' InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                            value={pesquisa}
                            onChange={e => setPesquisa(e.target.value)}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 3
                        }}
                    >
                        <FormControl
                            sx={{
                                minWidth: 120
                            }}
                        >
                            <InputLabel>Limit</InputLabel>
                            <Select
                                label='Limit'
                                value={limit}
                                onChange={e => setLimit(e.target.value)}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                        <Pagination
                            count={Math.ceil(total / limit)}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                        />
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <Table size='small'>
                            <TableHead
                                sx={{
                                    bgcolor: grey[200],
                                }}
                            >
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>DDD</TableCell>
                                    <TableCell>Celular</TableCell>
                                    <TableCell>Whatsapp</TableCell>
                                    <TableCell>Visualizado</TableCell>
                                    <TableCell>Ultima Mensagem</TableCell>
                                    <TableCell>Horario Ultima Mensagem</TableCell>
                                    <TableCell>Remetente</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <LinearProgress />
                                    </TableCell>
                                </TableRow>
                                {
                                    contatos.map(contato => (
                                        <TableRow key={contato.id}>
                                            <TableCell>{contato.nome}</TableCell>
                                            <TableCell>{contato.ddd}</TableCell>
                                            <TableCell>{contato.celular}</TableCell>
                                            <TableCell>{contato.whatsapp}</TableCell>
                                            <TableCell>{contato.visualizado ? 'Sim' : 'Não'}</TableCell>
                                            <TableCell>{contato.ultimaMensagem}</TableCell>
                                            <TableCell>{moment(contato.horarioUltimaMensagem).format('DD/MM/YYYY HH:mm')}</TableCell>
                                            <TableCell>{contato.remetente}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default Contatos