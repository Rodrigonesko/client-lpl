import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { createSegurado, findByCodigoSegurado } from "../../../../_services/rsdBradesco.service";
import Toast from "../../../../components/Toast/Toast";
import InputMask from "react-input-mask";

const ModalCriarSegurado = ({ id, setFlushHook }) => {

    const [openModal, setOpenModal] = useState(false);

    /*Segurado*/
    const [nomeSegurado, setNomeSegurado] = useState('');
    const [carteirinhaSegurado, setCarteirinhaSegurado] = useState('');
    const [cpfSegurado, setCpfSegurado] = useState('')
    const [celularSegurado, setCelularSegurado] = useState('')
    const [emailSegurado, setEmailSegurado] = useState('')

    const [openSnack, setOpenSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const handleClose = () => {
        setOpenModal(false);
        setNomeSegurado('');
        setCarteirinhaSegurado('');
        setCpfSegurado('');
        setCelularSegurado('');
        setEmailSegurado('');
    };

    const handleCloseSnack = () => {
        setOpenSnack(false)
    }

    const handleCreate = async () => {
        try {
            const getSegurado = await findByCodigoSegurado(carteirinhaSegurado)
            if (getSegurado) {
                setOpenSnack(true)
                setSeverity('error')
                setMessage('Segurado ja existe!')
                return
            }

            if ((!carteirinhaSegurado) || (!nomeSegurado) || (!cpfSegurado) || (!celularSegurado) || (!emailSegurado)) {
                setOpenSnack(true)
                setSeverity('warning')
                setMessage('Todos os Dados são obrigatórios!')
                return
            }

            const celular = celularSegurado.replace(/\D/g, '');

            const create = await createSegurado({
                codigo: carteirinhaSegurado,
                nome: nomeSegurado,
                cpf: cpfSegurado,
                celular: celularSegurado,
                email: emailSegurado,
                titular: id,
                whatsapp: celularSegurado ? `whatsapp:+55${celular}` : ''
            })
            console.log(create);
            setOpenSnack(true)
            setSeverity('success')
            setMessage('Segurado adicionado com sucesso!')
            setFlushHook(true)
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }

    const handleFilter = async () => {
        try {
            if (carteirinhaSegurado.length > 14) {
                const getSegurado = await findByCodigoSegurado(carteirinhaSegurado.trim())
                if (!getSegurado) return
                setNomeSegurado(getSegurado.nome || '')
                setCpfSegurado(getSegurado.cpf || '')
                setCelularSegurado(getSegurado.celular || '')
                setEmailSegurado(getSegurado.email || '')
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleFilter()
    }, [carteirinhaSegurado])

    return (
        <>
            <Button variant='contained' onClick={() => setOpenModal(true)} sx={{ borderRadius: '10px' }}>Criar Segurado</Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Adicionar Segurado"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container direction="column" justifyContent="center" alignItems="stretch">
                            <TextField
                                type='text'
                                required
                                label='Carteirinha Segurado'
                                value={carteirinhaSegurado}
                                size='small'
                                onChange={(e) => setCarteirinhaSegurado(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                            <TextField
                                type='text'
                                required
                                label='Nome Segurado'
                                value={nomeSegurado}
                                size='small'
                                onChange={(e) => setNomeSegurado(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                            <TextField
                                type='text'
                                required
                                label='CPF Segurado'
                                value={cpfSegurado}
                                size='small'
                                onChange={(e) => setCpfSegurado(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                            <div>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={celularSegurado}
                                    onChange={(e) => setCelularSegurado(e.target.value)}
                                >
                                    {() => <TextField
                                        type='text'
                                        required
                                        label='Celular Segurado'
                                        fullWidth
                                        size='small'
                                        InputProps={{
                                            style: {
                                                borderRadius: '10px'
                                            }
                                        }}
                                        margin="normal"
                                    />}
                                </InputMask>
                            </div>
                            <TextField
                                type='text'
                                required
                                label='E-mail Segurado'
                                value={emailSegurado}
                                size='small'
                                onChange={(e) => setEmailSegurado(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                        </Grid>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose} color='error'>Fechar</Button>
                        <Button onClick={handleCreate} color='success' autoFocus>Criar</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog >
            <Toast
                message={message}
                open={openSnack}
                onClose={handleCloseSnack}
                severity={severity}
                duration={5000}
            />
        </>
    )
}

export default ModalCriarSegurado;
