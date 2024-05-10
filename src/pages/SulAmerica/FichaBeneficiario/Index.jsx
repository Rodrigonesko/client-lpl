import { useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getBeneficiarioById, getBeneficiarioComPedidosEmAberto, updateBeneficiario } from "../../../_services/sulAmerica.service"
import { Alert, Box, Button, Container, Divider, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from "@mui/material"
import Title from "../../../components/Title/Title"
import { blue, orange } from "@mui/material/colors"
import moment from "moment"
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddressComponent from "./Components/AddressComponent"
import { useForm } from "react-hook-form"

const FichaBeneficiarioSulAmerica = () => {

    const { id } = useParams()
    const [flushHook, setFlushHook] = useState(false)
    const [severitySnack, setSeveritySnack] = useState('')
    const [msg, setMsg] = useState('')
    const [openSnack, setOpenSnack] = useState(false)

    const { register, handleSubmit, setValue } = useForm();

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

    const onSubmit = async (formData) => {
        try {
            const update = await updateBeneficiario(id, formData)
            setData(update)
            setOpenSnack(true)
            setSeveritySnack('success')
            setMsg('Dados Atualizados com sucesso!')
            setFlushHook(true)
            console.log(update);
        } catch (error) {
            console.log(error);
            setOpenSnack(true)
            setSeveritySnack('error')
            setMsg(`Erro! ${error}`)
        }
    }

    const handleCloseSnack = () => {
        setOpenSnack(false)
    }

    useEffect(() => {
        if (data) {
            // Set the form values when data is available
            setValue('nome', data.nome);
            setValue('cpf', data.cpf);
            setValue('melhorCelular', data.melhorCelular);
            setValue('codSistemicoBeneficiario', data.codSistemicoBeneficiario);
            setValue('carteiraEmpresa', data.carteiraEmpresa);
            setValue('plano', data.plano);
            setValue('empresa', data.empresa);
            setValue('entidade', data.entidade);
            setValue('numero', data.numero);
        }
        setFlushHook(false)
    }, [data, setValue, flushHook]);

    return (
        <Sidebar>
            <Container maxWidth>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // mt: 1,
                        }}
                    >
                        <Title size={'medium'} fontColor={blue[900]} lineColor={orange[900]}>Ficha Beneficiario - {data?.nome}</Title>
                        <Button variant='contained' type='submit' sx={{ borderRadius: '10px' }} >Atualizar</Button>
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
                        <TextField type='text' label='Nome' size='small' {...register('nome')} sx={{ width: '350px' }} InputProps={{
                            style: {
                                borderRadius: '10px'
                            }
                        }}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <TextField type='text' label='CPF' size='small' {...register('cpf')} sx={{ width: '350px' }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <TextField type='text' label='Celular' size='small' {...register('melhorCelular')} sx={{ width: '350px' }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <TextField type='text' label='Código Sistemico Beneficiario' size='small' {...register('codSistemicoBeneficiario')} sx={{ width: '350px' }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }} />
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
                        <TextField type='text' label='Carteira Empresa' size='small' {...register('carteiraEmpresa')} sx={{ width: '350px' }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField type='text' label='Plano' size='small' {...register('plano')} sx={{ width: '350px' }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField type='text' label='Empresa' size='small' {...register('empresa')} sx={{ width: '350px' }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField type='text' label='Entidade' size='small' {...register('entidade')} sx={{ width: '350px' }}
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: 3,
                    }}
                    >
                        <TextField type='text' label='CEP' size='small' value={data?.cep} sx={{ width: '350px' }}
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
                        />
                        <TextField type='text' label='Entidade' size='small' {...register('numero')} sx={{ width: '350px' }}
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
                </form>
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                    <Alert variant="filled" onClose={handleCloseSnack} severity={severitySnack} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Container>
        </Sidebar >
    )
}

export default FichaBeneficiarioSulAmerica