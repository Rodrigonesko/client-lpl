import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import ModalAdicionarPerguntas from "./ModalAdicionarPergunta"
import { Delete, Search } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { deletePergunta, getPerguntas } from "../../../../_services/teleEntrevistaV2.service"
import ModalComponent from "../../../../components/ModalComponent/ModalComponent"
import { red } from "@mui/material/colors"

const Perguntas = () => {

    const [perguntas, setPerguntas] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const response = await getPerguntas()
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
            await deletePergunta(id)
            setFlushHook(!flushHook)
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <Box
                sx={{
                    m: 2
                }}
            >
                <ModalAdicionarPerguntas setFlushHook={setFlushHook} />
            </Box>
            <Box
                sx={{
                    m: 2
                }}
            >
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Pesquisar"
                    InputProps={{
                        startAdornment: (
                            <Search sx={{ mr: 1 }} />
                        )
                    }}
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />
            </Box>
            <TableContainer>
                <Table
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Pergunta</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !loading ? perguntas.filter(pergunta => {
                                return pergunta.texto.toLowerCase().includes(pesquisa.toLowerCase())
                            }).map((pergunta) => (
                                <TableRow key={pergunta._id}>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                        >
                                            {pergunta.texto}
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
            </TableContainer>
        </Box>
    )
}

export default Perguntas