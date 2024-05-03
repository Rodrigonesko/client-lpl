import { Box, Container, Table, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { blue } from "@mui/material/colors"

const Pedidos = () => {
    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 2,
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
                            Pedidos
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            mt: 1,
                        }}>
                        <TextField type='text' label='Prestador' size='small' />
                        <TextField type='text' label='Beneficiario' size='small' />
                        <TextField type='text' label='Responsavel' size='small' />
                        <TextField type='text' label='Status' size='small' />
                    </Box>
                    <Box

                        sx={{
                            mt: 6
                        }}>

                        <Table>
                            <TableHead sx={{ backgroundColor: blue[500] }}>
                                <TableRow>
                                    <TableCell sx={{ color: 'white' }}>Serviços</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Menor Data Execução</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Maior Data Execução</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Quantidade Serviços Pagos</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Valor Pago</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Prestador</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Beneficiario</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Responsável</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Data Agendamento</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Data Criação</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default Pedidos