import { useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getBeneficiarioById, getBeneficiarioComPedidosEmAberto, updateBeneficiario, updatePedido } from "../../../_services/sulAmerica.service"
import { Alert, Box, Button, Container, Divider, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import Title from "../../../components/Title/Title"
import { blue, orange } from "@mui/material/colors"
import moment from "moment"
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { set, useForm } from "react-hook-form"
import ModalAgendamento from "./Components/ModalAgendamento"
import { BsFilePdf } from "react-icons/bs"
import { Cancel, Edit } from "@mui/icons-material"
import { RiArrowGoBackFill } from "react-icons/ri"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import Toast from "../../../components/Toast/Toast"
import ModalComponent from "../../../components/ModalComponent/ModalComponent"
import { red } from "@mui/material/colors"

const Input = ({ label, register }) => {
    return (
        <TextField
            type='text'
            label={label}
            size='small'
            {...register}
            sx={{
                width: '350px',
                borderRadius: '10px'
            }}
            InputLabelProps={{
                shrink: true,
            }}
            placeholder={label}
        />
    )
}

const FichaBeneficiarioSulAmerica = () => {

    const { id } = useParams()
    const { register, handleSubmit, setValue } = useForm();

    const [flushHook, setFlushHook] = useState(false)
    const [severitySnack, setSeveritySnack] = useState('')
    const [msg, setMsg] = useState('')
    const [openSnack, setOpenSnack] = useState(false)

    const [data, setData] = useState()
    const [pedido, setPedido] = useState([])
    const [justificativa, setJustificativa] = useState('')

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
            setValue('cep', data.cep);
            setValue('logradouro', data.logradouro);
            setValue('bairro', data.bairro);
            setValue('municipio', data.municipio);
            setValue('numero', data.numero);
        }
        setFlushHook(false)
    }, [data, setValue]);

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
                        <Input label='Nome' register={register('nome')} />
                        <Input label='CPF' register={register('cpf')} />
                        <Input label='Melhor Celular' register={register('melhorCelular')} />
                        <Input label='Cod Sistemico Beneficiario' register={register('codSistemicoBeneficiario')} />
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
                        <Input label='Carteira Empresa' register={register('carteiraEmpresa')} />
                        <Input label='Plano' register={register('plano')} />
                        <Input label='Empresa' register={register('empresa')} />
                        <Input label='Entidade' register={register('entidade')} />
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
                        <Input label='CEP' register={register('cep')} />
                        <Input label='Logradouro' register={register('logradouro')} />
                        <Input label='Bairro' register={register('bairro')} />
                        <Input label='Município' register={register('municipio')} />
                        <Input label='Número' register={register('numero')} />
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
                                                    item.status === 'A INICIAR' && <ModalAgendamento pedido={item._id} />
                                                }
                                                {
                                                    item.status === 'AGENDADO' && <Tooltip title='Reagendar'>
                                                        <IconButton size='small' color='warning' >
                                                            <FaRegArrowAltCircleLeft />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                {
                                                    (item.status === 'A INICIAR' || item.status === 'AGENDADO') && <Tooltip title='Formulário'>
                                                        <IconButton size='small' color='primary' href={`/sulAmerica/formulario/${item._id}`} >
                                                            <FeedOutlinedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                {
                                                    item.status === 'CONCLUÍDO' && <Tooltip title='PDF'>
                                                        <IconButton sie='small' color='error' >
                                                            <BsFilePdf />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                {
                                                    item.status === 'CONCLUÍDO' && <Tooltip title='Editar'>
                                                        <IconButton size='small' color='primary' >
                                                            <Edit />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                {
                                                    (item.status === 'A INICIAR' || item.status === 'AGENDADO') && (
                                                        <ModalComponent
                                                            buttonIcon={<Cancel />}
                                                            buttonText='Cancelar'
                                                            buttonColorScheme='error'
                                                            headerText='Cancelar Pedido'
                                                            onAction={async () => {
                                                                try {
                                                                    await updatePedido(item._id, { justificativa, status: 'CANCELADO' })
                                                                } catch (error) {
                                                                    console.log(error);
                                                                    setOpenSnack(true)
                                                                    setSeveritySnack('error')
                                                                    setMsg(`Erro! ${error}`)
                                                                }
                                                            }}
                                                            size={'sm'}
                                                            saveButtonColorScheme={red[900]}
                                                        >
                                                            <Typography>
                                                                Tem certeza que deseja cancelar o pedido do prestador {item.prestador.nome}?
                                                            </Typography>
                                                            <TextField
                                                                placeholder='Justificativa'
                                                                fullWidth
                                                                multiline
                                                                rows={2}
                                                                sx={{ mt: 2 }}
                                                                value={justificativa}
                                                                onChange={(e) => setJustificativa(e.target.value)}
                                                            />
                                                        </ModalComponent>
                                                    )
                                                }
                                                {
                                                    (item.status === 'CONCLUÍDO' || item.status === 'CANCELADO') && <Tooltip title='Retroceder'>
                                                        <IconButton size='small' color='primary' >
                                                            <RiArrowGoBackFill />
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
                <Toast
                    open={openSnack}
                    onClose={handleCloseSnack}
                    severity={severitySnack}
                    message={msg}
                />
            </Container>
        </Sidebar >
    )
}

export default FichaBeneficiarioSulAmerica