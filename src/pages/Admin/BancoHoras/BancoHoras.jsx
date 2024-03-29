import { Box, Container, Divider, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import ModalUploadBancoHoras from "./Modais/ModalUpload"
import { useEffect, useState } from "react"
import { getUsers } from "../../../_services/user.service"
import moment from "moment"
import ModalHorarioPonto from "./Modais/ModalHorarioPonto"

const BancoHoras = () => {

    const [colaboradores, setColaboradores] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [dataBancoHoras, setDataBancoHoras] = useState('')

    const fetchData = async () => {
        const result = await getUsers()
        result.sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
        result.forEach(colaborador => {
            if (colaborador.dataBancoHoras) {
                setDataBancoHoras(colaborador.dataBancoHoras)
                return
            }
        })
        setColaboradores(result)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    return (
        <>
            <Sidebar>
                <Box width='100%' height='100vh' overflow='auto' >
                    <Container>
                        <Box m={2}>
                            <ModalUploadBancoHoras setFlushHook={setFlushHook} />
                            <ModalHorarioPonto setFlushHook={setFlushHook} />
                        </Box>
                        <Divider />
                        <Box>
                            <Typography variant='h5' m={2}>
                                Banco de Horas
                            </Typography>
                            <Typography variant="body2" color='gray' m={2} >
                                Atualizado dia - {moment(dataBancoHoras).format('DD/MM/YYYY')}
                            </Typography>
                            <TableContainer>
                                <Table className="name">
                                    <TableHead className="table-header">
                                        <TableRow>
                                            <TableCell>
                                                Colaborador
                                            </TableCell>
                                            <TableCell>
                                                Banco De Horas
                                            </TableCell>
                                            <TableCell>
                                                Horario Saida
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            colaboradores.map(colaborador => {
                                                if ((colaborador.nomeCompleto) && (colaborador.inativo !== true)) {
                                                    return (
                                                        <TableRow key={colaborador.nomeCompleto}>
                                                            <TableCell>
                                                                {colaborador.nomeCompleto}
                                                            </TableCell>
                                                            <TableCell>
                                                                {colaborador.bancoHoras}
                                                            </TableCell>
                                                            <TableCell>
                                                                {colaborador.horarioSaida && moment(colaborador.horarioSaida).format('DD/MM/YYYY HH:mm')}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                } else {
                                                    return null
                                                }
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Container>
                </Box>
            </Sidebar>
        </>
    )
}

export default BancoHoras