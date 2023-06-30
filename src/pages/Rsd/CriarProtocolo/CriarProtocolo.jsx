import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, Paper, TextField, Button, Typography, Divider, Select, MenuItem, FormControl, InputLabel, Alert, Snackbar } from "@mui/material";
import { criarProtocolo, getOperadoras } from "../../../_services/rsd.service";

const CriarProtocolo = () => {
    const { mo } = useParams()

    const [protocolo, setProtocolo] = useState('')
    const [dataSolicitacao, setDataSolicitacao] = useState('')
    const [dataPagamento, setDataPagamento] = useState('')
    const [pedido, setPedido] = useState('')
    const [operadora, setOperadora] = useState('')
    const [operadoras, setOperadoras] = useState([])
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false)
    }

    const handlerCriarProtocolo = async () => {

        if (protocolo.length === 0) {
            setOpen(true)
            setError(true)
            setMsg('Protocolo é obrigatório')
            return
        }

        await criarProtocolo({
            protocolo,
            dataSolicitacao,
            dataPagamento,
            mo,
            pedido,
            operadora
        })

        setError(false)
        setMsg('Protocolo criado com sucesso!')
        setOpen(true)

        setTimeout(() => {
            navigate(`/rsd/FichaBeneficiario/${mo}`)
        }, '1000')

    }

    const handleBuscarOperadoras = async e => {
        try {

            const result = await getOperadoras()

            setOperadoras(result.operadoras)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleBuscarOperadoras()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box component={Paper} p={2} elevation={3} minWidth='600px' >
                    <Typography variant="h6" m={1}>
                        Criar Protocolo
                    </Typography>
                    <Divider />
                    <Box display='flex' justifyContent='center' flexDirection='column'  >

                        <TextField size="small" style={{ margin: '10px' }} value={protocolo} helperText='Número do protocolo' onChange={e => setProtocolo(e.target.value)} label='Protocolo' />
                        <TextField size="small" style={{ margin: '10px' }} focused value={mo} label='Marca Ótica' />
                        <TextField type="date" focused size="small" style={{ margin: '10px' }} value={dataSolicitacao} onChange={e => setDataSolicitacao(e.target.value)} label='Data solicitação' />
                        <TextField type="date" focused size="small" style={{ margin: '10px' }} value={dataPagamento} onChange={e => setDataPagamento(e.target.value)} label='Data Pagamento' />

                        <FormControl size="small" style={{ margin: '10px' }}>
                            <InputLabel>Operadora Beneficiário</InputLabel>
                            <Select
                                label='Operadora Beneficiário'
                                value={operadora}
                                onChange={e => {
                                    setOperadora(e.target.value)
                                }}
                            >
                                <MenuItem>
                                    <em>
                                        Operadora Beneficiario
                                    </em>
                                </MenuItem>
                                {
                                    operadoras.map(e => {
                                        return (
                                            <MenuItem value={e.descricao}>{e.descricao}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        <TextField size="small" style={{ margin: '10px' }} value={pedido} onChange={e => setPedido(e.target.value)} label='Pedido' helperText='Número do pedido' />
                        <Box m={1}>
                            <Button variant="contained" onClick={handlerCriarProtocolo}>Criar</Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose} >
                <Alert variant="filled" onClose={handleClose} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default CriarProtocolo