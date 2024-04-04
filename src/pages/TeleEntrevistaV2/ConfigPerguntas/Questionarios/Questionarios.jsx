import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import ModalCriarQuestionarios from "./ModalCriarQuestionarios"
import ModalAlterarQuestionario from "./ModalAlterarQuestionario"
import { useEffect, useState } from "react"
import { getQuestionarios } from "../../../../_services/teleEntrevistaV2.service"

const Questionarios = () => {

    const [questionarios, setQuestionarios] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    useEffect(() => {
        const fetchQuestionarios = async () => {
            const response = await getQuestionarios()
            setQuestionarios(response)
        }
        fetchQuestionarios()
    }, [flushHook])

    return (
        <Box>
            <Box
                sx={{
                    m: 2
                }}
            >
                <ModalCriarQuestionarios />
            </Box>
            <TableContainer>
                <Table
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            questionarios.map(questionario => (
                                <TableRow
                                    key={questionario._id}
                                >
                                    <TableCell>
                                        {questionario.nome}
                                    </TableCell>
                                    <TableCell>
                                        <ModalAlterarQuestionario
                                            questionario={questionario}
                                            setFlushHook={setFlushHook}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Questionarios