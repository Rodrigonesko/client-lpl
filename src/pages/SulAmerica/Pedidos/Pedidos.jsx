import { Box, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { blue } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { getPedidos } from "../../../_services/sulAmerica.service"
import { ArrowForward } from "@mui/icons-material"
import Title from "../../../components/Title/Title"

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getPedidos()
                setPedidos(result)
            } catch (error) {
                console.log(error);
            }
        }

        fetch()
    }, [])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'}>Pedidos</Title>
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

                        <Table
                            size="small"
                        >
                            <TableHead sx={{ backgroundColor: blue[500] }}>
                                <TableRow>
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
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    pedidos.map((pedido) => (
                                        <TableRow key={pedido.id}>
                                            <TableCell>{pedido.menorDataExecucao}</TableCell>
                                            <TableCell>{pedido.maiorDataExecucao}</TableCell>
                                            <TableCell>{pedido.quantidadeServicosPagos}</TableCell>
                                            <TableCell>{
                                                new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                }).format(pedido.valorPago)
                                            }</TableCell>
                                            <TableCell>{pedido.prestador.nome}</TableCell>
                                            <TableCell>{pedido.beneficiario.nome}</TableCell>
                                            <TableCell>{pedido.responsavel}</TableCell>
                                            <TableCell>{pedido.dataAgendamento}</TableCell>
                                            <TableCell>{pedido.dataCriacao}</TableCell>
                                            <TableCell>{pedido.status}</TableCell>
                                            <TableCell>
                                                <IconButton>
                                                    <ArrowForward />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default Pedidos