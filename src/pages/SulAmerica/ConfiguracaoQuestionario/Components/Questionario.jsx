import { Box, Divider, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import ModalCriarQuestionarios from "../Modais/ModalCriarQuestionario"
import { useEffect, useState } from "react"
import { buscarQuestionarios } from "../../../../_services/sulAmerica.service"
import { Edit } from "@mui/icons-material"
import ModalEditarQuestionario from "../Modais/ModalEditarQuestionario"

const Questionario = () => {

    const [questionarios, setQuestionarios] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await buscarQuestionarios()
                setQuestionarios(result)
            } catch (error) {
                console.log(error);
            }
        }
        fetch()
    }, [flushHook])

    return (
        <>
            <ModalCriarQuestionarios />
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                    mb: 2
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold'
                                }}
                            >
                                Nome
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            questionarios.map((questionario, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {questionario.nome}
                                    </TableCell>
                                    <TableCell>
                                        <ModalEditarQuestionario questionario={questionario} setFlushHook={setFlushHook} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </>
    )
}

export default Questionario