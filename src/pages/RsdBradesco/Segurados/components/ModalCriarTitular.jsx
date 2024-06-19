import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { createTitular, findByCodigoTitular } from "../../../../_services/rsdBradesco.service";
import Toast from "../../../../components/Toast/Toast";
import InputMask from 'react-input-mask';
import { numberToWhatsapp } from "../../../../functions/functions";

const ModalCriarTitular = ({ setFlushHook }) => {

    const [openModal, setOpenModal] = useState(false);

    /*Titular*/
    const [nomeTitular, setNomeTitular] = useState('');
    const [carteirinhaTitular, setCarteirinhaTitular] = useState('');
    const [cpfTitular, setCpfTitular] = useState('')
    const [celularTitular, setCelularTitular] = useState('')
    const [emailTitular, setEmailTitular] = useState('')

    const [openSnack, setOpenSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')
    const [loading, setLoading] = useState(false)


    const handleClose = () => {
        setOpenModal(false);
        setNomeTitular('');
        setCarteirinhaTitular('');
        setCpfTitular('');
        setCelularTitular('');
        setEmailTitular('');
    };

    const handleCloseSnack = () => {
        setOpenSnack(false)
    }

    const handleCreate = async () => {
        setLoading(true)
        try {
            const getTitular = await findByCodigoTitular(carteirinhaTitular)
            if (getTitular) {
                setOpenSnack(true)
                setSeverity('error')
                setMessage('Titular ja existe!')
                return
            }

            if ((!carteirinhaTitular) || (!nomeTitular) || (carteirinhaTitular.trim().length < 13)) {
                setOpenSnack(true)
                setSeverity('warning')
                setMessage('Insira o Código da Carteirinha e o nome do Titular corretamente!')
                return
            }

            const create = await createTitular({
                codigo: carteirinhaTitular.trim(),
                nome: nomeTitular.trim(),
                cpf: cpfTitular.trim(),
                celular: celularTitular.trim(),
                email: emailTitular.trim(),
                whatsapp: numberToWhatsapp(celularTitular.trim())
            })
            console.log(create);
            setOpenSnack(true)
            setSeverity('success')
            setMessage('Titular adicionado com sucesso!')
            handleClose()
            setFlushHook(true)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setOpenSnack(true)
            setSeverity('error')
            setMessage('Erro ao adicionar Titular!')
            setLoading(false)
        }
    }

    const handleFilter = async () => {
        try {
            if (carteirinhaTitular.length > 13) {
                const getTitular = await findByCodigoTitular(carteirinhaTitular.trim())
                if (!getTitular) return
                setNomeTitular(getTitular.nome || '')
                setCelularTitular(getTitular.celular || '')
                setEmailTitular(getTitular.email || '')
                setCpfTitular(getTitular.cpf || '')
            }
        } catch (error) {
            console.log(error);
            setOpenSnack(true)
            setSeverity('error')
            setMessage('Erro ao buscar titular')
        }
    }

    useEffect(() => {
        handleFilter()
    }, [carteirinhaTitular])

    return (
        <>
            <Button variant='contained' onClick={() => setOpenModal(true)} sx={{ borderRadius: '10px' }}>Criar Titular</Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Adicionar Titular"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container direction="column" justifyContent="center" alignItems="stretch">
                            <TextField
                                type='text'
                                required
                                label='Carteirinha Titular'
                                value={carteirinhaTitular}
                                size='small'
                                onChange={(e) => setCarteirinhaTitular(e.target.value)}
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
                                label='Nome Titular'
                                value={nomeTitular}
                                size='small'
                                onChange={(e) => setNomeTitular(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                            <TextField
                                type='text'
                                label='CPF Titular'
                                value={cpfTitular}
                                size='small'
                                onChange={(e) => setCpfTitular(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                            <InputMask
                                mask="(99) 99999-9999"
                                value={celularTitular}
                                onChange={(e) => setCelularTitular(e.target.value)}
                            >
                                {() => <TextField
                                    type='text'
                                    label='Celular Titular'
                                    size='small'
                                    InputProps={{
                                        style: {
                                            borderRadius: '10px'
                                        }
                                    }}
                                    margin="normal"
                                />}
                            </InputMask>

                            <TextField
                                type='text'
                                label='E-mail Titular'
                                value={emailTitular}
                                size='small'
                                onChange={(e) => setEmailTitular(e.target.value)}
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
                        <Button onClick={handleClose} disabled={loading} color='error'>Fechar</Button>
                        <Button disabled={loading} endIcon={loading && <CircularProgress size={20} />} onClick={handleCreate} color='success' autoFocus>Criar</Button>
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

export default ModalCriarTitular;
