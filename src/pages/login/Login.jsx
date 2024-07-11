import React, { useState, useContext } from "react";
import { TextField, Button, Box, Tooltip, IconButton, InputAdornment, Paper, Grid, CircularProgress } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import Axios from 'axios'
import logo from '../../imgs/logo.png'
import Toast from "../../components/Toast/Toast";
import { RemoveRedEyeOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const [seeSenha, setSeeSenha] = useState(false);
    const [changeVisualizarSenha, setChangeVisualizarSenha] = useState('password');

    const { setAuthToken } = useContext(AuthContext)


    const login = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/login`, {
                email,
                password,
            }, { withCredentials: true })
            console.log(result);
            if (result.status === 200) {
                const authToken = result.data.token
                setAuthToken(authToken)
                const cookie = result.data.token
                document.cookie = `token=${cookie}`
                localStorage.setItem('token', cookie)
                setOpen(true)
                setMessage('Login efetuado com sucesso!')
                setSeverity('success')
                setLoading(false)
                await Axios.post(`${process.env.REACT_APP_API_KEY}/controleAtividade/iniciarPadrao`, {
                    name: result.data.user
                }, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${cookie}`
                    }
                })
                window.location.replace('/')
            }
        } catch (error) {
            console.log(error);
            setOpen(true)
            setMessage('Erro ao efetuar login!')
            setSeverity('error')
            setLoading(false)
        }

    }

    const handleToggleSenhaVisibility = () => {
        setSeeSenha(!seeSenha);
        setChangeVisualizarSenha(seeSenha ? 'password' : 'text');
    };

    return (
        // <Container maxWidth
        //     sx={{
        //         background: `linear-gradient(45deg, white 25%, ${blue[900]} 70%)`,
        //         height: '100vh',
        //         display: 'flex',
        //         justifyContent: 'space-between',
        //         alignItems: 'center',
        //     }}
        //     flexWrap={"wrap"}
        // >
        <Grid container
            sx={{
                background: `linear-gradient(45deg, white 25%, ${blue[900]} 70%)`,
                height: '100vh',
            }}
            flexWrap={"wrap"}
        >
            <Grid
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1
                }}>
                <img src={logo} alt='logo lpl' width={'45%'} minWidth={'600px'} ></img>
                <Box
                    item
                    color={'white'}
                    component={Paper}
                    elevation={7}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'white',
                        borderRadius: '25px',
                        height: '98%',
                        width: '27%',
                        p: 2
                    }}
                    width={'30%'}
                    minWidth={'300px'}
                >
                    <form>
                        <TextField
                            type='email'
                            placeholder='E-mail'
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                style: { borderRadius: '10px' }
                            }}
                            disabled={loading}
                        />
                        <TextField
                            placeholder='Senha'
                            sx={{ width: '100%', mt: 2 }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={changeVisualizarSenha}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size='small' onClick={handleToggleSenhaVisibility}>
                                            {
                                                changeVisualizarSenha === 'password' ? (
                                                    <Tooltip title='Verificar senha' >
                                                        <RemoveRedEyeOutlined />
                                                    </Tooltip>
                                                ) : (
                                                    <Tooltip title='Esconder senha' >
                                                        <VisibilityOffOutlined />
                                                    </Tooltip>
                                                )
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                style: { borderRadius: '10px' }
                            }}
                            disabled={loading}
                        />
                        <Button disabled={loading} endIcon={loading && <CircularProgress size={20} />} type='submit' variant='contained' fullWidth onClick={login} sx={{ borderRadius: '10px', mt: 2 }} >Entrar</Button>
                    </form>
                </Box>
            </Grid>
            <Toast
                message={message}
                severity={severity}
                open={open}
                onClose={() => { setOpen(false) }}
            />
        </Grid>
        // </Container >
    )
}

export default Login