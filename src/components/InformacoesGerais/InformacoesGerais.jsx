import React, { useState, useEffect } from "react";
import { atualizarInformacoesMo, buscarInformacoesMo } from "../../_services/rsd.service";
import { Box, Paper, TextField, Button, Alert, Snackbar } from "@mui/material";
import { ImFloppyDisk } from 'react-icons/im'
import InputMask from "react-input-mask";

const InformacoesGerais = ({ mo }) => {

    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [email, setEmail] = useState('')
    const [fone1, setFone1] = useState('')
    const [fone2, setFone2] = useState('')
    const [fone3, setFone3] = useState('')
    const [contratoEmpresa, setContratoEmpresa] = useState('')
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleChangeFone1 = (e) => {
        setFone1(e.target.value)
    }

    const buscarInformacoes = async () => {
        try {
            const result = await buscarInformacoesMo(mo)

            setNome(result.pessoa.nome)
            setCpf(result.pessoa.cpf)
            setDataNascimento(result.pessoa.dataNascimento)
            setEmail(result.pessoa.email)
            setFone1(result.pessoa.fone1)
            setFone2(result.pessoa.fone2)
            setFone3(result.pessoa.fone3)
            setContratoEmpresa(result.pessoa.contratoEmpresa)
        } catch (error) {
            console.log(error);
        }
    }

    const atualizarInformacoes = async () => {

        await atualizarInformacoesMo({
            cpf,
            dataNascimento,
            email,
            fone1,
            fone2,
            fone3,
            contratoEmpresa,
            mo
        })

        setOpen(true)

    }

    useEffect(() => {
        buscarInformacoes()
    }, [])

    return (
        <Box p={2} component={Paper} display='flex' flexDirection='column'>
            <Box display='flex' m={1} flexWrap='wrap'>
                <TextField size="small" label='Marca Ótica' style={{ marginRight: '10px', marginBottom: '5px' }} value={mo} />
                <TextField size="small" label='Nome' style={{ marginRight: '10px', marginBottom: '5px', width: '430px' }} value={nome} />
                <TextField size="small" label='CPF' style={{ marginRight: '10px', marginBottom: '5px' }} value={cpf} onChange={e => setCpf(e.target.value)} />
                <TextField type="date" size="small" label='Data Nascimento' style={{ marginRight: '10px', marginBottom: '5px', width: '210px' }} focused value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
            </Box>
            <Box display='flex' m={1} flexWrap='wrap'>
                <InputMask
                    mask="(99) 99999-9999"
                    disabled={false}
                    maskChar=" "
                    value={fone1}
                    onChange={handleChangeFone1}
                >
                    {() => <TextField size="small" label='Fone 1' style={{ marginRight: '10px', marginBottom: '5px' }} />}
                </InputMask>
                <InputMask
                    mask="(99) 99999-9999"
                    disabled={false}
                    maskChar=" "
                    value={fone2}
                    onChange={e => setFone2(e.target.value)}
                >
                    {() => <TextField size="small" label='Fone 2' style={{ marginRight: '10px', marginBottom: '5px' }} />}
                </InputMask>
                <InputMask
                    mask="(99) 99999-9999"
                    disabled={false}
                    maskChar=" "
                    value={fone3}
                    onChange={e => setFone3(e.target.value)}
                >
                    {() => <TextField size="small" label='Fone 3' style={{ marginRight: '10px', marginBottom: '5px' }} />}
                </InputMask>
                <TextField size="small" label='Contrato/Empresa' style={{ marginRight: '10px', marginBottom: '5px' }} value={contratoEmpresa} onChange={e => setContratoEmpresa(e.target.value)} />
                <TextField size="small" label='Email' style={{ marginRight: '10px', marginBottom: '5px' }} value={email} onChange={e => setEmail(e.target.value)} />
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant='filled' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Informações atualizadas com sucesso!
                </Alert>
            </Snackbar>
            {/* <table>
                    <tbody>
                        <tr>
                            <td>Marca Ótica: {mo}</td>
                            <td>Nome: {nome}</td>
                            <td>CPF: {cpf}</td>
                            <td>Data Nascimento: <input type="date" defaultValue={dataNascimento} onChange={e => setDataNascimento(e.target.value)} /></td>
                            <td>E-mail: <input type="email" name="email" id="email" defaultValue={email} onChange={e => setEmail(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Fone 1: <input type="text" defaultValue={fone1} onChange={e => setFone1(e.target.value)} /></td>
                            <td>Fone 2: <input type="text" defaultValue={fone2} onChange={e => setFone2(e.target.value)} /></td>
                            <td>Fone 3: <input type="text" defaultValue={fone3} onChange={e => setFone3(e.target.value)} /></td>
                            <td>Contrato/Empresa <input type="text" defaultValue={contratoEmpresa} onChange={e => setContratoEmpresa(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><button onClick={atualizarInformacoes} id="atualizar-informacoes-beneficiario" >Salvar</button></td>
                        </tr>
                    </tbody>
                </table> */}

            <Box mt={2}>
                <Button onClick={atualizarInformacoes} startIcon={<ImFloppyDisk />} size="small" variant='contained' >Salvar</Button>
            </Box>
        </ Box>

    )
}

export default InformacoesGerais