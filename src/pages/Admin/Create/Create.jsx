import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { Button, TextField, Box, FormGroup, FormControlLabel, Checkbox, Select, FormControl, MenuItem, InputLabel, Snackbar, Alert } from "@mui/material";
import './Create.css'

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
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [admin, setAdmin] = useState(false)
    const [atividade, setAtividade] = useState('')


    const toggleAdmin = () => {
        setAdmin(!admin)
    }

    const cadastrar = async e => {
        e.preventDefault()




        try {


            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/users`, { email, name, accessLevel: admin, atividade }, { withCredentials: true })

            if (result.status === 201) {
                setSnack(true)
            }

        } catch (error) {
            setMessage(error.response.data.message)
            setError(true)
            console.log(error);
        }

    }

    return (
        <>
            <Sidebar></Sidebar>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%'>
                <Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <h3>Criar usuario</h3>
                    </Box>
                    <Box>
                        <Box m={2} >
                            <TextField variant="filled" label="E-mail" type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
                        </Box>
                        <Box m={2}>
                            <TextField variant="filled" type="text" label='Nome' name="name" id="name" onChange={e => setName(e.target.value)} />
                        </Box>
                        <Box m={2}>
                            <FormControl variant='filled'>
                                <InputLabel id="label-atividade">Atividade Principal</InputLabel>
                                <Select
                                    labelId="label-atividade"
                                    id='select-atividade'
                                    style={{ minWidth: '200px' }}
                                    label='Atividade Principal'
                                    defaultValue=''
                                    onChange={e => {
                                        console.log(e.target.value);
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
                            <Alert onClose={() => setSnack(false)} variant='filled' severity="success" sx={{ width: '100%' }}>
                                Usuário criado com sucesso!
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
            </Box>
        </>
    )

}

export default Create