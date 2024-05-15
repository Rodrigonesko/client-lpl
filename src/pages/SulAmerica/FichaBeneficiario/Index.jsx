import { useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getBeneficiarioById, getBeneficiarioComPedidosEmAberto, updateBeneficiario } from "../../../_services/sulAmerica.service"
import { Box, Button, Container, Divider, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import Title from "../../../components/Title/Title"
import { blue, orange } from "@mui/material/colors"
import { useForm } from "react-hook-form"
import Toast from "../../../components/Toast/Toast"
import Row from "./Components/Row"

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


    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getBeneficiarioById(id)
                setData(result)
                const findPedidos = await getBeneficiarioComPedidosEmAberto(id)
                setPedido(findPedidos)
            } catch (error) {
                console.log(error);
            }
        }

        fetch()
    }, [id, flushHook])

    const onSubmit = async (formData) => {
        try {
            const update = await updateBeneficiario(id, formData)
            setData(update)
            setOpenSnack(true)
            setSeveritySnack('success')
            setMsg('Dados Atualizados com sucesso!')
            setFlushHook(!flushHook)
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
            setValue('responsavelLegal', data.responsavelLegal);
            setValue('vinculoResponsavel', data.vinculoResponsavel);
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
                            mt: 3,
                            gap: '10px',
                            flexWrap: 'wrap'
                        }}
                    >
                        <Input label='Nome' register={register('nome')} />
                        <Input label='CPF' register={register('cpf')} />
                        <Input label='Melhor Celular' register={register('melhorCelular')} />
                        <Input label='Cod Sistemico Beneficiario' register={register('codSistemicoBeneficiario')} />
                        <Input label='Responsável' register={register('responsavelLegal')} />
                        <Input label='Vínculo Responsável' register={register('vinculoResponsavel')} />
                    </Box>
                    <Box
                        sx={{
                            mt: 3
                        }}
                    >
                        <Divider />
                    </Box>
                    <Box sx={{mt: 1}}>
                        <Title size={'small'} fontColor={blue[900]} lineColor={orange[900]}>Dados Empresa</Title>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 3,
                        gap: '10px',
                        flexWrap: 'wrap'
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
                          mt: 3,
                          gap: '10px',
                          flexWrap: 'wrap'
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
                                    <TableCell ></TableCell>
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
                                        <Row
                                            key={item}
                                            item={item}
                                            flushHook={flushHook}
                                            openSnack={openSnack}
                                            setOpenSnack={setOpenSnack}
                                            setFlushHook={setFlushHook}
                                            setMsg={setMsg}
                                            setSeveritySnack={setSeveritySnack}

                                        />
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
            </Container >
        </Sidebar >
    )
}

export default FichaBeneficiarioSulAmerica