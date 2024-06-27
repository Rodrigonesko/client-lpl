import { ThemeProvider } from "@emotion/react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { themeBradesco } from "../components/theme"
import { Box, Button, Container, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Title from "../../../components/Title/Title"
import { useParams } from "react-router-dom"
import { indigo, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { getPedidosByPrestador, getPrestadorById } from "../../../_services/rsdBradesco.service"
import { Save } from "@mui/icons-material"

const LabelChangeDadosPrestador = ({ label, type, value, onChange }) => {
    return (
        <TextField
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            margin="normal"
            size="small"
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

    const [pedidos, setPedidos] = useState([])
    const [prestadores, setPrestadores] = useState([])
    const [loading, setLoading] = useState(false)

    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [uf, setUf] = useState('')
    const [situacao, setSituacao] = useState('')


    const fetch = async () => {
        setLoading(true)
        try {
            const getPedidos = await getPedidosByPrestador(id)
            setPedidos(getPedidos)
            const getPrestadores = await getPrestadorById(id)
            setPrestadores(getPrestadores)
            setNome(prestadores?.nome)
            setUf(prestadores?.uf)
            setCnpj(prestadores?.cpfCnpj)
            setSituacao(prestadores?.status)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetch()
    }, [id])

    return (
        <>
            <Sidebar>
                <ThemeProvider theme={themeBradesco}>
                    <Container maxWidth>
                        <Title size={'medium'} fontColor={indigo[800]} lineColor={red[700]} >Dados do Prestador - {prestadores.nome}</Title>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <form>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <LabelChangeDadosPrestador label={'Nome'} type={'text'} value={nome} onChange={(e) => { setNome(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <LabelChangeDadosPrestador label={'UF'} type={'text'} value={uf} onChange={(e) => { setUf(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <LabelChangeDadosPrestador label={'CNPJ'} type={'text'} value={cnpj} onChange={(e) => { setCnpj(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <LabelChangeDadosPrestador label={'Situação'} type={'text'} value={situacao} onChange={(e) => { setSituacao(e.target.value) }} />
                                </Grid>
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
                                    // onClick={handleSubmit(onSubmit)}
                                    >
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>
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
                    </Container>
                </ThemeProvider>
            </Sidebar>
        </>
    )
}

export default FichaPrestador