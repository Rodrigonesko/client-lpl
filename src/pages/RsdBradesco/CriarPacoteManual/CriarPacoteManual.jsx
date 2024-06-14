import { Box, Button, Container, Table, TableCell, TableHead, TableRow } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { deepPurple, indigo, red } from "@mui/material/colors"

const CriarPacoteManual = () => {
    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                        <Title size={'medium'} fontColor={indigo[800]} lineColor={red[700]}>Criar Pacote Manual</Title>
                        <Button variant='contained' sx={{ borderRadius: '10px' }} >Criar Pacote</Button>
                    </Box>
                    <Box
                        sx={{ mt: 10 }}
                    >
                        <Table size='small' >
                            <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[800]} 95%)` }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'white' }}>Titular</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Código Carteirinha</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Código Segurado</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Código Carteirinha Segurado</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default CriarPacoteManual