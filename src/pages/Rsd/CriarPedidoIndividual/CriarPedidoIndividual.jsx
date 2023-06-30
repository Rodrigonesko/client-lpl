import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Box, Paper, TextField, Typography, Divider, FormControl, InputLabel, Select, MenuItem, Button, Alert, Snackbar } from "@mui/material";
import { buscarInformacoesMo, criarPedidoIndividual, getOperadoras } from "../../../_services/rsd.service";

const CriarPedidoIndividual = () => {

    const navigate = useNavigate()

    const [mo, setMo] = useState('')
    const [nome, setNome] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [fone1, setFone1] = useState('')
    const [fone2, setFone2] = useState('')
    const [fone3, setFone3] = useState('')
    const [cpf, setCpf] = useState('')
    const [operadoraBeneficiario, setOperadoraBeneficiario] = useState('')
    const [operadoresBeneficiario, setOperadorasBeneficiario] = useState([])
    const [protocolo, setProtocolo] = useState('')
    const [dataSolicitacao, setDataSolicitacao] = useState('')
    const [dataPagamento, setDataPagamento] = useState('')
    const [pedido, setPedido] = useState('')
    const [fila, setFila] = useState('')

    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const buscarMo = async (marcaOtica) => {
        try {

            if (marcaOtica) {
                //const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pessoas/${marcaOtica}`, { withCredentials: true })

                const result = await buscarInformacoesMo(marcaOtica)

                if (result.pessoa) {
                    setNome(result.pessoa.nome)
                    setDataNascimento(result.pessoa.dataNascimento)
                    setEmail(result.pessoa.email)
                    setFone1(result.pessoa.fone1)
                    setFone2(result.pessoa.fone2)
                    setFone3(result.pessoa.fone3)
                    setCpf(result.pessoa.cpf)
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const criarPedido = async e => {
        try {

            if (protocolo.length === 0 || mo.length === 0) {

                setError(true)
                setMsg('Marca ótica e Protocolo são obrigatórios')
                setOpen(true)
                return
            }

            await criarPedidoIndividual({
                mo,
                nome,
                dataNascimento,
                email,
                fone1,
                fone2,
                fone3,
                cpf,
                operadoraBeneficiario,
                protocolo,
                dataSolicitacao,
                dataPagamento,
                pedido,
                fila
            })

            setOpen(true)
            setError(false)
            setMsg('Protocolo/pedido criado com sucesso!')

            setTimeout(() => {
                navigate(`/rsd/FichaBeneficiario/${mo}`)
                handleClose()
            }, '1000')

        } catch (error) {
            console.log(error);
        }
    }

    const buscarOperadoras = async () => {
        try {

            const result = await getOperadoras()

            setOperadorasBeneficiario(result.operadoras)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarOperadoras()
    }, [])

    return (
        <>
            <Sidebar />
            <Container style={{ overflow: 'auto', height: '100vh' }} >
                <Box mt={1} component={Paper} p={2} elevation={3}>
                    <Typography variant="h6">
                        Novo Protocolo/Pedido
                    </Typography>
                    <Box m={1}>
                        <TextField helperText='Informe a marca ótica' label='Marca Ótica' value={mo} size="small" onChange={e => {
                            setMo(e.target.value)
                            buscarMo(e.target.value)
                        }} />
                        <Divider style={{ margin: '10px' }} />
                    </Box>

                    <Box display='flex' justifyContent='space-between'>
                        <Box display='flex' flexDirection='column' width='100%' maxWidth='400px' >
                            <TextField style={{ margin: '10px' }} size="small" label='Nome' value={nome} onChange={e => setNome(e.target.value)} />
                            <TextField style={{ margin: '10px' }} size="small" focused type='date' label='Data Nascimento' value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
                            <TextField style={{ margin: '10px' }} size="small" label='Email' value={email} onChange={e => setEmail(e.target.value)} />
                            <TextField style={{ margin: '10px' }} size="small" label='Fone 2' value={fone2} onChange={e => setFone2(e.target.value)} />
                        </Box>
                        <Box display='flex' flexDirection='column' width='100%' maxWidth='400px'>
                            <TextField style={{ margin: '10px' }} size="small" label='CPF' value={cpf} onChange={e => setCpf(e.target.value)} />
                            <FormControl style={{ margin: '10px' }} size="small" >
                                <InputLabel>Operadora Beneficiario</InputLabel>
                                <Select
                                    label='Operadora Beneficiario'
                                    value={operadoraBeneficiario}
                                    onChange={e => {
                                        setOperadoraBeneficiario(e.target.value)
                                    }}
                                >
                                    <MenuItem>
                                        <em>Operadora Beneficiario</em>
                                    </MenuItem>
                                    {
                                        operadoresBeneficiario.map(e => {
                                            return (
                                                <MenuItem key={e._id} value={e.descricao} >{e.descricao}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <TextField style={{ margin: '10px' }} size="small" label='Fone 1' value={fone1} onChange={e => setFone1(e.target.value)} />
                            <TextField style={{ margin: '10px' }} size="small" label='Fone 3' value={fone3} onChange={e => setFone3(e.target.value)} />
                        </Box>
                    </Box>
                    <Divider style={{ margin: '10px' }} />
                    <Box display='flex' flexDirection='column' width='100%' maxWidth='400px' >
                        <TextField size="small" label='Protocolo' style={{ margin: '10px' }} value={protocolo} helperText='Número do protocolo' onChange={e => setProtocolo(e.target.value)} />
                        <TextField size="small" label='Data Solicitação' type="date" focused style={{ margin: '10px' }} value={dataSolicitacao} onChange={e => setDataSolicitacao(e.target.value)} />
                        <TextField size="small" label='Data Pagamento' type="date" focused style={{ margin: '10px' }} value={dataPagamento} onChange={e => setDataPagamento(e.target.value)} />
                        <TextField size="small" label='Pedido' style={{ margin: '10px' }} value={pedido} helperText='Número do pedido' onChange={e => setPedido(e.target.value)} />

                        <FormControl size="small" style={{ margin: '10px' }} >
                            <InputLabel>Fila</InputLabel>
                            <Select
                                label='Fila'
                                value={fila}
                                onChange={e => {
                                    setFila(e.target.value)
                                }}
                            >
                                <MenuItem>
                                    <em>Fila</em>
                                </MenuItem>
                                <MenuItem value="RSD">RSD</MenuItem>
                                <MenuItem value="Quarentena">Quarentena</MenuItem>
                                <MenuItem value="Alta Frequência Consulta">Alta Frequência Consulta</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box m={1}>
                        <Button variant="contained" onClick={criarPedido}>Criar</Button>
                    </Box>
                </Box>
                <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert variant='filled' onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}

export default CriarPedidoIndividual