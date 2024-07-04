import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import ModalCriarContato from "./components/ModalCriarContato"
import { grey } from "@mui/material/colors"

const Contatos = () => {
    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title size={'medium'}>Contatos</Title>
                        <ModalCriarContato />
                    </Box>
                    <Box>
                        <TextField type='text' fullWidth label='Pesquisar' size='small' InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }} />
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <Table size='small'>
                            <TableHead
                                sx={{
                                    bgcolor: grey[200],
                                }}
                            >
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>DDD</TableCell>
                                    <TableCell>Celular</TableCell>
                                    <TableCell>Whatsapp</TableCell>
                                    <TableCell>Visualizado</TableCell>
                                    <TableCell>Ultima Mensagem</TableCell>
                                    <TableCell>Horario Ultima Mensagem</TableCell>
                                    <TableCell>Remetente</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default Contatos