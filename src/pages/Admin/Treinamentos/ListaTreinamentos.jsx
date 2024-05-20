import { Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material"
import ModalAdicionarTreinamento from "./Modais/ModalAdicionarTreinamento"
import { useEffect, useState } from "react"
import { getAllTreinamentos } from "../../../_services/treinamento.service"
import ModalDetalhesTreinamento from "./Modais/ModalDetalhesTreinamento"
import ModalDeletarTreinamento from "./Modais/ModalDeletarTreinamento"
import moment from "moment"
import ModalEditarTreinamento from "./Modais/ModalEditarTreinamentos"
import { blue } from "@mui/material/colors"

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
                <Table size='small' >
                    <TableHead sx={{ bgcolor: blue[600] }} >
                        <TableRow>
                            <TableCell sx={{ color: 'white' }} >Nome</TableCell>
                            <TableCell sx={{ color: 'white' }} >Plataforma</TableCell>
                            <TableCell sx={{ color: 'white' }} >Link</TableCell>
                            <TableCell sx={{ color: 'white' }} >Prazo</TableCell>
                            <TableCell></TableCell>
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
                                        <TableCell>
                                            <ModalDeletarTreinamento
                                                nome={treinamento.nome}
                                                id={treinamento._id}
                                                setFlushHook={setFlushHook}
                                            />
                                            <ModalDetalhesTreinamento
                                                nome={treinamento.nome}
                                                id={treinamento._id}
                                            />
                                            <ModalEditarTreinamento
                                                id={treinamento._id}
                                                nomeDoCurso={treinamento.nome}
                                                nomePlataforma={treinamento.plataforma}
                                                nomeLink={treinamento.link}
                                                nomePrazo={treinamento.prazo}
                                                nomeObservacoes={treinamento.observacoes}
                                                setFlushHook={setFlushHook}
                                            />
                                        </TableCell>

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