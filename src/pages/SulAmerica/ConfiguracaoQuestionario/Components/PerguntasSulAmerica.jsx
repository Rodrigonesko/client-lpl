import { Box, Divider, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import ModalCriarPergunta from "../Modais/ModalCriarPergunta"
import { buscarPerguntas, deletarPergunta } from "../../../../_services/sulAmerica.service"
import { Delete } from "@mui/icons-material"
import { useEffect, useState } from "react"
import ModalComponent from "../../../../components/ModalComponent/ModalComponent"
import { red } from "@mui/material/colors"
import ModalEditarPergunta from "../Modais/ModalEditarPegunta"

const PerguntasSulAmerica = () => {

    const [loading, setLoading] = useState(false)
    const [perguntas, setPerguntas] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const response = await buscarPerguntas()
                setPerguntas(response)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setPerguntas([])
                setLoading(false)
            }
        }
        fetch()
    }, [flushHook])

    const handleDelete = async (id) => {
        try {
            await deletarPergunta(id)
            setFlushHook(!flushHook)
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ModalCriarPergunta setFlushHook={setFlushHook} />
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
                <Table
                    size="small"
                >
                    <TableBody>
                        {
                            !loading ? perguntas.map((pergunta) => (
                                <TableRow key={pergunta._id}>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                        >
                                            {pergunta.pergunta}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color='textSecondary'
                                        >
                                            {pergunta.tipo} | {pergunta.categoria}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <ModalComponent
                                            buttonColorScheme={"error"}
                                            buttonIcon={<Delete color="error" />}
                                            headerText={"Deletar Pergunta"}
                                            onAction={() => {
                                                handleDelete(pergunta._id)
                                            }}
                                            saveButtonColorScheme={red[500]}
                                            size={'sm'}

                                        >
                                            Deseja deletar a pergunta?
                                        </ModalComponent>
                                        <ModalEditarPergunta pergunta={pergunta} />
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                        >
                                            Carregando...
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </Box>

        </>
    )
}

export default PerguntasSulAmerica