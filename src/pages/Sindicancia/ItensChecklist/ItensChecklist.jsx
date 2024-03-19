import { Box, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { deleteItemChecklist, getItemChecklist } from "../../../_services/sindicancia.service"
import ModalAdicionarItem from "./ModalAdicionarItem"
import ModalComponent from "../../../components/ModalComponent/ModalComponent"
import { Delete } from "@mui/icons-material"
import { red } from "@mui/material/colors"

const ItensChecklist = () => {

    const [itens, setItens] = useState([])
    const [loading, setLoading] = useState(true)
    const [pesquisa, setPesquisa] = useState('')
    const [flushHook, setFlushHook] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await getItemChecklist()
            setItens(result)
            setLoading(false)
        }
        fetch()
    }, [flushHook])

    const handleDelete = async (id) => {
        await deleteItemChecklist(id)
        setFlushHook(prev => !prev)
    }

    return (
        <Sidebar>
            <Box
                m={2}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                width: '30%',
                                height: '2px',
                                bottom: 0,
                                left: '0%',
                                backgroundColor: 'currentColor',
                                transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                            },
                            '&:hover::after': {
                                width: '100%',
                                left: '0%',
                            },
                        }}
                    >
                        Itens Checklist
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mb: 2,
                    }}
                >
                    <ModalAdicionarItem setFlushHook={setFlushHook} />
                </Box>
                <Box>
                    <TextField
                        label="Pesquisar"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                </Box>
                <TableContainer
                    sx={{
                        mt: 2,
                    }}
                >
                    <Table
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    ID
                                </TableCell>
                                <TableCell>
                                    Nome
                                </TableCell>
                                <TableCell>
                                    Descrição
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                !loading ? (itens.filter(item => {
                                    if (pesquisa === '') {
                                        return item
                                    } else if (item.item.toLowerCase().includes(pesquisa.toLowerCase())) {
                                        return item
                                    }
                                }).map((item) => (
                                    <TableRow
                                        key={item.id}
                                    >
                                        <TableCell>
                                            {item.id}
                                        </TableCell>
                                        <TableCell>
                                            {item.item}
                                        </TableCell>
                                        <TableCell>
                                            {item.descricao}
                                        </TableCell>
                                        <TableCell>
                                            <ModalComponent
                                                buttonIcon={<Delete color="error" />}
                                                buttonColorScheme="error"
                                                headerText="Excluir Item"
                                                onAction={() => handleDelete(item.id)}
                                                saveButtonColorScheme={red[500]}
                                            >
                                                <Typography>
                                                    Tem certeza que deseja excluir esse item?
                                                </Typography>
                                                <Typography>
                                                    {item.item}
                                                </Typography>
                                            </ModalComponent>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                        >
                                            <LinearProgress />
                                        </TableCell>
                                    </TableRow>

                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Sidebar>

    )
}

export default ItensChecklist