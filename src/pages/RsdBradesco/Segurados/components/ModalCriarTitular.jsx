import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { criarPacote, findByCodigoTitular } from "../../../../_services/rsdBradesco.service";
import Toast from "../../../../components/Toast/Toast";

const ModalCriarTitular = () => {

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
        try {
            const getTitular = await findByCodigoTitular(carteirinhaTitular)
            if (getTitular) {
                setOpenSnack(true)
                setSeverity('error')
                setMessage('Titular ja existe!')
                return
            }

            if ((!carteirinhaTitular) || (!nomeTitular)) {
                setOpenSnack(true)
                setSeverity('warning')
                setMessage('Insira o Código da Carteirinha e o nome do Titular!')
                return
            }

            // const create = await criarPacote(
            //     carteirinhaTitular,
            //     nomeTitular,
            //     cpfTitular,
            //     celularTitular,
            //     emailTitular
            // )
            // console.log(create);
            setOpenSnack(true)
            setSeverity('success')
            setMessage('Titular adicionado com sucesso!')
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }

    const handleFilter = async () => {
        try {
            if (carteirinhaTitular.length > 13) {
                const getTitular = await findByCodigoTitular(carteirinhaTitular)
                setNomeTitular(getTitular.nome)
                setCelularTitular(getTitular.celular)
                setEmailTitular(getTitular.email)
            } else {
                setNomeTitular('')
                setCpfTitular('')
                setCelularTitular('')
                setEmailTitular('')
            }
        } catch (error) {
            console.log(error);
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
                            <TextField
                                type='text'
                                label='Celular Titular'
                                value={celularTitular}
                                size='small'
                                onChange={(e) => setCelularTitular(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
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

export default ModalCriarTitular;
