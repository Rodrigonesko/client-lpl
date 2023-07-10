import { useEffect, useState } from "react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { Box, Container, Typography, Divider, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Button, Snackbar, Alert } from "@mui/material"
import ModalAdicionarPlano from "./ModalAdicionarPlano"
import { getPlanosBlacklist, removerPlanoBlacklist } from "../../../_services/elegibilidade.service"
import { BsTrashFill } from 'react-icons/bs'

const PlanosBlacklist = () => {

    const [flushHook, setFlushHook] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [planos, setPlanos] = useState([])

    const fetchData = async () => {

        const result = await getPlanosBlacklist()

        setPlanos(result)
    }

    const handleRemovePlano = async (id) => {

        //console.log(id);

        await removerPlanoBlacklist(id)
        setOpenSnack(true)
        setFlushHook(true)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()

    }, [flushHook])

    return (
        <>
            <Sidebar />
            <Box width='100vw' >
                <Container>
                    <Typography m={2} variant="h6">
                        Planos
                    </Typography>
                    <Divider />
                    <Box m={1}>
                        <ModalAdicionarPlano flushHook={setFlushHook} />
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Plano</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    planos.map(plano => {
                                        return (
                                            <TableRow key={plano.plano}>
                                                <TableCell>{plano.plano}</TableCell>
                                                <TableCell><Button color='error' variant='contained' onClick={() => handleRemovePlano(plano._id)} ><BsTrashFill /> </Button></TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                    <Alert variant='filled' onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                        Plano removido com sucesso!
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )
}

export default PlanosBlacklist