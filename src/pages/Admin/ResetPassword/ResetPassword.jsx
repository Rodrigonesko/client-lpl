import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import { Container, TextField, Typography, Button, Snackbar, Alert, Autocomplete } from '@mui/material'
import { restaurarSenha } from '../../../_services/user.service'

const ResetPassword = () => {

    const inputEmail = useRef()

    const [emails, setEmails] = useState([]);
    const [email, setEmail] = useState('');
    const [snackOpen, setSnackOpen] = useState(false)

    const resetPassword = async () => {
        await restaurarSenha({ email })

        setSnackOpen(true)
    }


    useEffect(() => {

        const buscarEmails = async () => {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users`, { withCredentials: true })
            setEmails(result.data)
        }

        buscarEmails()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <Container style={{ padding: '1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <Typography variant="h4" component="h2">
                        Restaurar senha
                    </Typography>
                </div>
                <Autocomplete
                    ref={inputEmail}
                    id='email-users'
                    options={emails}
                    getOptionLabel={(item) => item.email}
                    style={{ width: '300px' }}
                    renderInput={(params) => <TextField {...params} label='Email' variant="outlined" />}
                    onChange={e => {
                        setEmail(e.target.textContent);
                    }}
                />
                <Button onClick={resetPassword} style={{ marginTop: '1rem' }} variant="contained" color="primary">
                    Restaurar
                </Button>
            </Container>
            <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => { setSnackOpen(false) }}>
                <Alert onClose={() => { setSnackOpen(false) }} variant="filled" severity="success">
                    Senha restaurada com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}

export default ResetPassword