import { useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getBeneficiarioById, getBeneficiarioComPedidosEmAberto } from "../../../_services/sulAmerica.service"
import { Box, Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from "@mui/material"
import Title from "../../../components/Title/Title"
import { blue, orange } from "@mui/material/colors"
import moment from "moment"
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddressComponent from "./Components/AddressComponent"

const FichaBeneficiarioSulAmerica = () => {

    const { id } = useParams()

    const [data, setData] = useState()
    const [pedido, setPedido] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getBeneficiarioById(id)
                setData(result)
                const findPedidos = await getBeneficiarioComPedidosEmAberto(id)
                setPedido(findPedidos)
                console.log(findPedidos);
            } catch (error) {
                console.log(error);
            }
        }

        fetch()
    }, [id])

    return (
        <Sidebar>
            <Container maxWidth>
                <Title size={'medium'} fontColor={blue[900]} lineColor={orange[900]}>Ficha Beneficiario - {data?.nome}</Title>
                <Box
                    sx={{
                        mt: 3,
                    }}
                >
                    <Divider />
                </Box>
                <Box
                    sx={{
                        mt: 1,
                    }}
                >
                    <Title size={'small'} fontColor={blue[900]} lineColor={orange[900]}>Dados Beneficiario</Title>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 3,
                    }}
                >
                    <TextField type='text' label='Nome' size='small' value={data?.nome} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField type='text' label='CPF' size='small' value={data?.cpf} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField type='text' label='Celular' size='small' value={data?.melhorCelular} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField type='text' label='Código Sistemico Beneficiario' size='small' value={data?.codSistemicoBeneficiario} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        mt: 3,
                    }}
                >
                    <Divider />
                </Box>
                <Box
                    sx={{
                        mt: 1,
                    }}
                >
                    <Title size={'small'} fontColor={blue[900]} lineColor={orange[900]}>Dados Empresa</Title>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 3,
                }}
                >
                    <TextField type='text' label='Carteira Empresa' size='small' value={data?.carteiraEmpresa} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField type='text' label='Plano' size='small' value={data?.plano} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField type='text' label='Empresa' size='small' value={data?.empresa} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField type='text' label='Entidade' size='small' value={data?.entidade} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        mt: 3,
                    }}
                >
                    <Divider />
                </Box>
                <Box
                    sx={{
                        mt: 1,
                    }}
                >
                    <Title size={'small'} fontColor={blue[900]} lineColor={orange[900]}>Endereço Beneficiario</Title>
                </Box>
                <Box sx={{
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                    mt: 3,
                }}
                >
                    <AddressComponent id={data?.id} />
                    {/* <TextField type='text' label='CEP' size='small' value={data?.cep} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField type='text' label='Logradouro' size='small' value={data?.logradouro} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField type='text' label='Bairro' size='small' value={data?.bairro} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField type='text' label='Município' size='small' value={data?.municipio} sx={{ width: '350px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> */}
                </Box>
                <Box
                    sx={{
                        mt: 3,
                    }}
                >
                    <Divider />
                </Box>
                <Box
                    sx={{
                        mt: 1,
                    }}
                >
                    <Title size={'small'} fontColor={blue[900]} lineColor={orange[900]}>Pedidos Beneficiario</Title>
                </Box>
                <Box>
                    <Table size="small" component={Paper} elevation={7} sx={{ mb: 5, borderRadius: '15px', mt: 3 }}>
                        <TableHead sx={{ background: `linear-gradient(45deg, ${blue[900]} 30%, ${orange[900]} 75%)` }}>
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
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pedido.map((item) => (
                                    <TableRow>
                                        <TableCell>{moment(item.menorDataExecucao).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{moment(item.maiorDataExecucao).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.qtdServicosPagos}</TableCell>
                                        <TableCell>{
                                            new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(item.valorPago)
                                        }</TableCell>
                                        <TableCell>{item.prestador.nome}</TableCell>
                                        <TableCell>{item.beneficiario.nome}</TableCell>
                                        <TableCell>{item.responsavel}</TableCell>
                                        <TableCell>{item.dataAgendamento}</TableCell>
                                        <TableCell>{moment(item.dataCriacao).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>
                                            {
                                                <Tooltip title='Formulário' href={`/sulAmerica/formulario/${item._id}`} >
                                                    <IconButton size='small' color='primary' >
                                                        <FeedOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Box>
            </Container>
        </Sidebar>
    )
}

export default FichaBeneficiarioSulAmerica