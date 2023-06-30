import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { buscarClinica, criarPedido, getMoPorProtocolo } from "../../../_services/rsd.service";
import { Container, Box, Paper, TextField, Button, Typography, Divider, Select, MenuItem, FormControl, InputLabel, Alert, Snackbar } from "@mui/material";


const CriarPedido = () => {

    const { protocolo } = useParams()
    const navigate = useNavigate()

    const [pedido, setPedido] = useState('')
    const [valorApresentado, setValorApresentado] = useState('')
    const [valorReembolsado, setValorReembolsado] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [clinica, setClinica] = useState('')
    const [nf, setNf] = useState('')
    const [mo, setMo] = useState('')
    const [fila, setFila] = useState('')

    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handlerBuscarClinica = async (valueCnpj) => {
        try {

            const result = await buscarClinica({ cnpj: valueCnpj })

            setClinica(result.clinica.descricao)

        } catch (error) {
            console.log(error);
        }
    }

    const handlerCriarPedido = async e => {
        try {
            e.preventDefault()

            await criarPedido({
                pedido,
                protocolo,
                valorApresentado,
                valorReembolsado,
                cnpj,
                clinica,
                nf,
                mo,
                fila
            })

            handleOpen()

            setTimeout(() => {
                navigate(`/rsd/FichaBeneficiario/${mo}`)
            }, '1000')


       

        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {

        const buscaMo = async () => {
            try {
                const result = await getMoPorProtocolo(protocolo)

                setMo(result.pedido.mo)

            } catch (error) {
                console.log(error);
            }
        }

        buscaMo()
    }, [protocolo])

    return (
        <>
            <Sidebar />
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box component={Paper} p={2} elevation={3} minWidth='600px' >
                    <Typography variant="h6" m={1}>
                        Criar pedido
                    </Typography>
                    <Divider />
                    <Box display='flex' justifyContent='center' flexDirection='column'  >
                        <TextField size="small" style={{ margin: '10px' }} value={pedido} label='Pedido' helperText='Numero do pedido' onChange={e => setPedido(e.target.value)} />
                        <TextField size="small" style={{ margin: '10px' }} value={valorApresentado} label='Valor apresentado' onChange={e => setValorApresentado(e.target.value)} />
                        <TextField size="small" style={{ margin: '10px' }} value={valorReembolsado} label='Valor reembolsado' onChange={e => setValorReembolsado(e.target.value)} />
                        <TextField size="small" style={{ margin: '10px' }} value={cnpj} label='CNPJ' onChange={e => {
                            setCnpj(e.target.value)
                            handlerBuscarClinica(e.target.value)
                        }} />
                        <TextField size="small" style={{ margin: '10px' }} value={clinica} label='Clinica' onChange={e => setClinica(e.target.value)} />
                        <TextField size="small" style={{ margin: '10px' }} value={nf} label='NF' onChange={e => setNf(e.target.value)} />
                        <FormControl style={{ margin: '10px' }} size="small">
                            <InputLabel>Fila</InputLabel>
                            <Select
                                label='Fila'
                                value={fila}
                                onChange={(e) => {
                                    setFila(e.target.value)
                                    console.log(e.target.value);
                                }}
                            >
                                <MenuItem>
                                    <em>
                                        Fila
                                    </em>
                                </MenuItem>
                                <MenuItem value='RSD' >RSD</MenuItem>
                                <MenuItem value='Quarentena' >Quarentena</MenuItem>
                                <MenuItem value='Alta Frequência Consulta' >Alta Frequência Consulta</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    <Box m={1}>
                        <Button variant="contained" onClick={handlerCriarPedido} >Criar</Button>
                    </Box>

                </Box>
                <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose} >
                    <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Pedido criado com sucesso
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}

export default CriarPedido