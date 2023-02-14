import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { Button, TextField, Box, FormGroup, FormControlLabel, Checkbox, Select, FormControl, MenuItem, InputLabel, Menu, } from "@mui/material";
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

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [admin, setAdmin] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')


    const toggleAdmin = () => {
        setAdmin(!admin)
    }

    const cadastrar = async e => {
        e.preventDefault()

        try {
            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/users`, { email, name, password, confirmPassword, accessLevel: admin }, { withCredentials: true })

            if (result.status === 201) {
                setResponseMessage('Usuario Criado com Sucesso!')
            }

        } catch (error) {
            setResponseMessage(error.response.data.message)

        }

    }

    return (
        <>
            <Sidebar></Sidebar>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%'>

                {responseMessage && (
                    <div className="warning">
                        {responseMessage}
                    </div>
                )}


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
                            <TextField variant="filled" type="password" label='Senha' name="password" id="password" onChange={e => setPassword(e.target.value)} />
                        </Box>
                        <Box m={2}>
                            <TextField variant="filled" type="password" label='Confirmar senha' name="confirmPassword" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />
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

                    </Box>
                </Box>
            </Box>
        </>
    )

}

export default Create