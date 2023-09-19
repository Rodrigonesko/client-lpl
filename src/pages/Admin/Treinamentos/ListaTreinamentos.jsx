import { Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material"
import ModalAdicionarTreinamento from "./Modais/ModalAdicionarTreinamento"
import { useEffect, useState } from "react"
import { getAllTreinamentos } from "../../../_services/treinamento.service"
import ModalDetalhesTreinamento from "./Modais/ModalDetalhesTreinamento"
import ModalDeletarTreinamento from "./Modais/ModalDeletarTreinamento"
import moment from "moment"

const ListaTreinamentos = () => {

    const [flushHook, setFlushHook] = useState(false)
    const [treinamentos, setTreinamentos] = useState([])
    const [edit, setEdit] = useState(false)

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
                            <TableCell>Prazo</TableCell>
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
                                        <TableCell>{moment(treinamento.prazo).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell><Button size="small" variant="contained" >Editar</Button></TableCell>
                                        <TableCell><ModalDeletarTreinamento nome={treinamento.nome} id={treinamento._id} setFlushHook={setFlushHook} /></TableCell>
                                        <TableCell><ModalDetalhesTreinamento nome={treinamento.nome} id={treinamento._id} /></TableCell>
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