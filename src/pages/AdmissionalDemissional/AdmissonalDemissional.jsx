import { Autocomplete, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getUsers } from "../../_services/user.service"
import moment from "moment"
import axios from "axios"

const AdmissionalDemissional = () => {

    const [flushHook, setFlushHook] = useState(false)
    const [solicitacoes, setSolicitacoes] = useState([])
    const [email, setEmail] = useState('')
    const [emails, setEmails] = useState([])

    const handleChangeSelect = async (id, status) => {
        const resultado = await axios.put(`${process.env.REACT_APP_API_KEY}/vacation/status`, {
            statusRh: status, _id: id
        })
        setFlushHook(true)
        console.log(resultado)
        console.log(id, status)
    }

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/vacation/findAll`, { withCredentials: true })
        setSolicitacoes(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    useEffect(() => {
        const buscarEmails = async () => {
            try {
                const result = await getUsers()

                setEmails(result)

            } catch (error) {
                console.log(error);
            }
        }

        buscarEmails()
    }, [])

    const handleFilter = async () => {
        console.log('Funcionou')
    }

    return (
        <>
            <Sidebar />
            <Container>
                <div className="title">
                    <h2>Admissional / Demissional</h2>
                </div>
                <br />
                <Box display='flex' m={2}>
                    <Autocomplete
                        size="small"
                        disablePortal
                        id="email-auto-complete"
                        options={emails}
                        onChange={(event, item) => {
                            setEmail(item.email);
                        }}
                        getOptionLabel={emails => emails.email}
                        sx={{ width: 350 }}
                        renderInput={(params) => <TextField {...params} label='Email' />}
                    />
                    <Button type='submit' onClick={handleFilter} variant='contained' sx={{ marginLeft: '3px' }}>Buscar</Button>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="table-header">
                                    <TableCell>RESPONSAVEL</TableCell>
                                    <TableCell>AÇÃO</TableCell>
                                    <TableCell>FORNECEDOR</TableCell>
                                    <TableCell>OBSERVAÇÃO</TableCell>
                                    <TableCell>STATUS</TableCell>
                                    <TableCell>REALIZADO</TableCell>
                                    <TableCell>DATA</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {solicitacoes.map((item) => {
                                    return (
                                        <TableRow key={item._id}>
                                            <TableCell>{moment(item.dataInicio).format('MM/YYYY')}</TableCell>
                                            <TableCell>{moment(item.vencimento).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.colaborador}</TableCell>
                                            <TableCell>{moment(item.dataInicio).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{item.dataRetorno}</TableCell>
                                            <TableCell>{item.totalDias}</TableCell>
                                            <TableCell>
                                                <FormControl sx={{ minWidth: 135 }}>
                                                    <InputLabel id='StatusRh'>Status do RH</InputLabel>
                                                    <Select defaultValue={item.statusRh} labelId="StatusRh" id='StatusRh' label='Status do RH' onChange={(elemento) => handleChangeSelect(item._id, elemento.target.value)} >
                                                        <MenuItem value={'solicitado'}>SOLICITADO</MenuItem>
                                                        <MenuItem value={'assinado'}>ASSINADO</MenuItem>
                                                        <MenuItem value={'retirada'}>RETIRADA</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>)
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </Container>
        </>
    )
}

export default AdmissionalDemissional