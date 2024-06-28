import { ThemeProvider } from "@emotion/react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { themeBradesco } from "../components/theme"
import { Box, Button, Container, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Title from "../../../components/Title/Title"
import { useParams } from "react-router-dom"
import { indigo, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { getPedidosByPrestador, getPrestadorById, updatePrestador } from "../../../_services/rsdBradesco.service"
import { Save } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import Toast from "../../../components/Toast/Toast"

const Input = ({ label, type = 'text', register, multiline }) => {
    return (
        <TextField
            type={type}
            label={label}
            {...register}
            fullWidth
            margin="normal"
            size="small"
            multiline={multiline}
            InputProps={{
                style: {
                    borderRadius: '10px'
                }
            }}
            InputLabelProps={{
                shrink: true
            }}
        />
    );
}

const FichaPrestador = () => {

    const { id } = useParams();
    const { register, handleSubmit, setValue } = useForm();

    const [pedidos, setPedidos] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const [data, setData] = useState()

    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    useEffect(() => {
        const fetch = async () => {
            try {
                const getPedidos = await getPedidosByPrestador(id)
                setPedidos(getPedidos)
                const getPrestadores = await getPrestadorById(id)
                setData(getPrestadores)
            } catch (error) {
                console.log(error);
            }
        }
        fetch()
    }, [id, flushHook])

    const onSubmit = async (formData) => {
        try {
            const update = await updatePrestador(id, formData)
            setData(update)
            setOpenToast(true)
            setMessage('Dados do Prestador atualizados com sucesso!')
            setSeverity('success')
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao atualizar Dados do Prestador')
            setSeverity('error')
        }
    }

    useEffect(() => {
        if (data) {
            setValue('nome', data.nome)
            setValue('cpfCnpj', data.cpfCnpj)
            setValue('uf', data.uf)
            setValue('observacao', data.observacao)
        }
        setFlushHook(false)
    }, [data, setValue])

    return (
        <>
            <Sidebar>
                <ThemeProvider theme={themeBradesco}>
                    <Container maxWidth>
                        <Title size={'medium'} fontColor={indigo[800]} lineColor={red[700]} >Dados do Prestador - {data?.nome}</Title>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 3,
                                    gap: '10px',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <Grid
                                    container
                                >
                                    <Input label='Nome' register={register('nome')} />
                                    <Input label='CNPJ' register={register('cpfCnpj')} />
                                    <Input label='UF' register={register('uf')} />
                                </Grid>
                                <Input label='Observações' multiline={true} register={register('observacao')} />
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                >
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        sx={{
                                            bgcolor: red[900],
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: red[800]
                                            }
                                        }}
                                        endIcon={<Save />}
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Salvar
                                    </Button>
                                </Grid>
                            </Box>
                        </form>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Title size={'small'} fontColor={indigo[800]} lineColor={red[600]} >Pedidos</Title>
                        <Box sx={{ mt: 2 }}>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead sx={{ bgcolor: indigo[800] }}>
                                        <TableRow>
                                            <TableCell sx={{ color: 'white' }} >Sinistro</TableCell>
                                            <TableCell sx={{ color: 'white' }} >Segurado</TableCell>
                                            <TableCell sx={{ color: 'white' }} >Titular</TableCell>
                                            <TableCell sx={{ color: 'white' }} >Status</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            pedidos.map((pedido) => (
                                                <TableRow>
                                                    <TableCell>{pedido.sinistro}</TableCell>
                                                    <TableCell>{pedido.segurado.nome}
                                                        <Typography
                                                            variant='body2'
                                                            color='textSecondary'
                                                        >
                                                            {pedido.segurado.codigo}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{pedido.segurado.titular.nome}
                                                        <Typography
                                                            variant='body2'
                                                            color='textSecondary'
                                                        >
                                                            {pedido.segurado.titular.codigo}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{pedido.status}</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Toast
                            message={message}
                            severity={severity}
                            onClose={() => { setOpenToast(false) }}
                            open={openToast}
                        />
                    </Container>
                </ThemeProvider>
            </Sidebar >
        </>
    )
}

export default FichaPrestador