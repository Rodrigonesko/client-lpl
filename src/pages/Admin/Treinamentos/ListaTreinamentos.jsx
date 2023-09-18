import { Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material"
import ModalAdicionarTreinamento from "./ModalAdicionarTreinamento"
import { useEffect, useState } from "react"
import { getAllTreinamentos } from "../../../_services/treinamento.service"

const ListaTreinamentos = () => {

    const [flushHook, setFlushHook] = useState(false)
    const [treinamentos, setTreinamentos] = useState([])

    const fetchData = async () => {

        const result = await getAllTreinamentos()
        setTreinamentos(result)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()

    }, [flushHook])

    return (
        <Box>
            <ModalAdicionarTreinamento setFlushHook={setFlushHook} />
            <TableContainer sx={{ mt: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Plataforma</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                            <TableCell>Detalhes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            treinamentos.map(treinamento => {
                                return (
                                    <TableRow key={treinamento._id}>
                                        <TableCell>{treinamento.nome}</TableCell>
                                        <TableCell>{treinamento.plataforma}</TableCell>
                                        <TableCell>{treinamento.link}</TableCell>
                                        <TableCell><Button size="small" variant="contained" >Editar</Button></TableCell>
                                        <TableCell><Button size="small" variant="contained" color="error" >Deletar</Button></TableCell>
                                        <TableCell><Button size="small" variant="contained"  >Detalhes</Button></TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ListaTreinamentos