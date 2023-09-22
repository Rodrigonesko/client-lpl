import { Box, Container, Divider, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import ModalUploadBancoHoras from "./ModalUpload"
import { useEffect, useState } from "react"
import { getUsers } from "../../../_services/user.service"

const BancoHoras = () => {

    const [colaboradores, setColaboradores] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {
        const result = await getUsers()
        result.sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
        setColaboradores(result)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    return (
        <>
            <Sidebar />
            <Box width='100%' height='100vh' overflow='auto' >
                <Container>
                    <Box m={2}>
                        <ModalUploadBancoHoras setFlushHook={setFlushHook} />
                    </Box>
                    <Divider />
                    <Box>
                        <Typography variant='h5' m={2}>
                            Banco de Horas
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        colaboradores.map(colaborador => {
                                            if (colaborador.nomeCompleto) {
                                                return (
                                                    <TableRow key={colaborador.nomeCompleto}>
                                                        <TableCell>
                                                            {colaborador.nomeCompleto}
                                                        </TableCell>
                                                        <TableCell>
                                                            {colaborador.bancoHoras}
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
        </>
    )
}

export default BancoHoras