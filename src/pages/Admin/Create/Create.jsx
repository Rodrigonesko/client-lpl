import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Button, TextField, Container, Box, FormGroup, FormControlLabel, Checkbox, Select, FormControl, MenuItem, InputLabel, Snackbar, Alert, Typography } from "@mui/material";
import { createUser } from "../../../_services/user.service";
import { createAdmissao } from "../../../_services/admissaoDemissao.service";

const atividades = [
    'Gerência',
    'Sistemas',
    'Elegibilidade',
    'Liminares',
    'RSD',
    'Sindicância',
    'Tele Entrevista',
    'Callback',
    'Ti/Infra'
]

const Create = () => {

    const [snack, setSnack] = useState(false);
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const [matricula, setMatricula] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [atividade, setAtividade] = useState('')
    const [nomeCompleto, setNomeCompleto] = useState('')
    const [dataAdmissao, setDataAdmissao] = useState('')
    const [admin, setAdmin] = useState(false)

    const toggleAdmin = () => {
        setAdmin(!admin)
    }

    const cadastrar = async e => {
        e.preventDefault()

        try {
            if (name.length < 4 || atividade === '' || nomeCompleto.length < 4) {
                setSnack(true)
                setMessage('É necessario que você insira o Nome / Atividade e Nome Completo do Colaborador!')
                setSeverity('warning')
            } else {
                const newUser = await createUser({ email, name, accessLevel: admin, atividade, nomeCompleto, dataAdmissao, matricula })
                await createAdmissao({ _id: newUser._id })
                setSnack(true)
                setMessage('Usuário criado com sucesso!')
                setSeverity('success')
                // setEmail('')
                // setName('')

            }

        } catch (error) {
            setMessage(error.response.data.message)
            setError(true)
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar>
                <Container>
                    <Box mt={2} display='flex' justifyContent='center' alignItems='center' width='100%' minWidth='500px' flexDirection='column'>
                        <Box width='400px'>
                            <Typography textAlign='center' variant="h5">
                                Criar usuario
                            </Typography>
                            <Box m={2}>
                                <TextField fullWidth variant="filled" label="E-mail" type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Box>
                            <Box m={2}>
                                <TextField fullWidth variant="filled" type="text" label='Nome' name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                            </Box>
                            <Box m={2}>
                                <FormControl fullWidth variant='filled'>
                                    <InputLabel id="label-atividade">Atividade Principal</InputLabel>
                                    <Select
                                        labelId="label-atividade"
                                        id='select-atividade'
                                        style={{ minWidth: '200px' }}
                                        label='Atividade Principal'
                                        defaultValue=''
                                        onChange={e => {
                                            setAtividade(e.target.value)
                                        }}
                                    >
                                        <MenuItem>
                                            <em>
                                                Atividade Principal
                                            </em>
                                        </MenuItem>
                                        {
                                            atividades.map(atividade => (<MenuItem key={atividade} value={atividade}>{atividade}</MenuItem>))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box m={2}>
                                <TextField fullWidth variant="filled" type="text" label="Nome Completo (Mesmo nome do Ponto)" value={nomeCompleto} onChange={e => setNomeCompleto(e.target.value)} />
                            </Box>
                            <Box m={2}>
                                <TextField fullWidth variant="filled" type="date" focused label="Data Admissão" value={dataAdmissao} onChange={e => setDataAdmissao(e.target.value)} />
                            </Box>
                            <Box m={2}>
                                <TextField fullWidth variant="filled" type="text" label="Matrícula" value={matricula} onChange={e => setMatricula(e.target.value)} />
                            </Box>
                            <Box m={2}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label='Admin' onClick={toggleAdmin} />
                                </FormGroup>
                            </Box>
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <Button variant='contained' onClick={cadastrar}>Cadastrar</Button>
                            </Box>
                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={snack}
                                onClose={() => setSnack(false)}
                            >
                                <Alert onClose={() => setSnack(false)} variant='filled' severity={severity} sx={{ width: '100%' }}>
                                    {message}
                                </Alert>
                            </Snackbar>
                            <Snackbar
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={error}
                                onClose={() => setError(false)}
                            >
                                <Alert onClose={() => setError(false)} variant='filled' severity="error" sx={{ width: '100%' }}>
                                    {message}
                                </Alert>
                            </Snackbar>
                        </Box>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )

}

export default Create