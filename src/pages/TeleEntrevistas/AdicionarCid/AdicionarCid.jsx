import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { adicionaCid } from "../../../_services/teleEntrevista.service";
import { Alert, Box, Button, Container, Snackbar, TextField } from "@mui/material";

const AdicionarCid = () => {

    const [openSnack, setOpenSnack] = useState(false)
    const [textoSnack, setTextoSnack] = useState('Insira o Cid!')
    const [severitySnack, setSeveritySnack] = useState('')
    const [flushHook, setFlushHook] = useState(false)

    const [cid, setCid] = useState('')
    const [descricaoCid, setDescricaoCid] = useState('')

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const adicionarCid = async (e) => {
        try {
            e.preventDefault()

            if ((cid.length < 1) || (descricaoCid.length < 1)) {
                setOpenSnack(true)
                setTextoSnack('Cid ou Descrição precisa ser adicionada!')
                setSeveritySnack('warning')
                return
            }

            const resultado = await adicionaCid({ cid, descricao: descricaoCid })

            if (resultado.msg === 'Cid ja registrado!') {
                setOpenSnack(true);
                setSeveritySnack('warning');
                setTextoSnack(`Cid ja registrado!`);
                return
            }

            console.log(resultado)
            setOpenSnack(true)
            setTextoSnack('Cid adicionada com sucesso!')
            setSeveritySnack('success')
            setFlushHook(true)
            setCid('')
            setDescricaoCid('')
            return

        } catch (error) {
            console.log(error);
            setTextoSnack('Erro ao criar Cid.' + error.response.data.msg)
            setSeveritySnack('error')
            setOpenSnack(true)
        }
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <div className="title">
                        <h2>Adicionar Cid</h2>
                    </div>
                    <Box>
                        <Box>
                            <br />
                            <Box>
                                <TextField type='text' variant='outlined' label='Cid' size='small' value={cid} onChange={e => setCid(e.target.value)} />
                            </Box>
                            <br />
                            <Box>
                                <TextField type='text' variant='outlined' label='Descrição Cid' size='small' value={descricaoCid} onChange={e => setDescricaoCid(e.target.value)} />
                            </Box>
                            <br />
                            <Box>
                                <Button type='submit' onClick={adicionarCid} variant='contained' size='large' >Adicionar</Button>
                            </Box>
                        </Box>
                    </Box>
                    <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                        <Alert variant="filled" onClose={handleCloseSnack} severity={severitySnack} sx={{ width: '100%' }}>
                            {textoSnack}
                        </Alert>
                    </Snackbar>
                </Container>
            </Sidebar>
        </>
    )
}

export default AdicionarCid