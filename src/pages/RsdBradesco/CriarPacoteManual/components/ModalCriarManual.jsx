import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { criarPacote, findByCodigoSegurado, findByCodigoTitular, getTitularById } from "../../../../_services/rsdBradesco.service";

const ModalCriarManual = () => {

    const [openModal, setOpenModal] = useState(false);
    const [nomeTitular, setNomeTitular] = useState('');
    const [carteirinhaTitular, setCarteirinhaTitular] = useState('');
    const [nomeSegurado, setNomeSegurado] = useState('');
    const [carteirinhaSegurado, setCarteirinhaSegurado] = useState('');

    const handleClose = () => {
        setOpenModal(false);
        setNomeTitular('');
        setCarteirinhaTitular('');
        setNomeSegurado('');
        setCarteirinhaSegurado('');
    };

    const handleCreate = async () => {
        try {
            const create = await criarPacote(
                carteirinhaTitular,
                nomeTitular,
                carteirinhaSegurado,
                nomeSegurado
            )
            console.log(create);
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }

    const handleFilter = async () => {
        try {
            if (carteirinhaSegurado.length > 14) {
                const getSegurado = await findByCodigoSegurado(carteirinhaSegurado)
                setNomeSegurado(getSegurado.nome)
                const getTitular = await getTitularById(getSegurado.titular)
                setNomeTitular(getTitular.nome)
                setCarteirinhaTitular(getTitular.codigo)
            } else {
                setNomeTitular('')
                setNomeSegurado('')
                setCarteirinhaTitular('')
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleFilter()
    }, [carteirinhaTitular, carteirinhaSegurado])

    return (
        <>
            <Button variant='contained' onClick={() => setOpenModal(true)} sx={{ borderRadius: '10px' }}>Criar Pacote</Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Adicionar Pacote"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                            <Divider ><Chip label='Dados Segurado' /></Divider>
                            <TextField type='text' label='Carteirinha Segurado' value={carteirinhaSegurado} size='small' onChange={(e) => setCarteirinhaSegurado(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                            <TextField type='text' label='Nome Segurado' value={nomeSegurado} size='small' onChange={(e) => setNomeSegurado(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                            <Divider ><Chip label='Dados Titular' /></Divider>
                            <TextField type='text' label='Carteirinha Titular' value={carteirinhaTitular} size='small' onChange={(e) => setCarteirinhaTitular(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                            <TextField type='text' label='Nome Titular' value={nomeTitular} size='small' onChange={(e) => setNomeTitular(e.target.value)}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px'
                                    }
                                }}
                                margin="normal"
                            />
                        </Box>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleClose} color='error'>Fechar</Button>
                        <Button onClick={handleCreate} color='success' autoFocus>Finalizar</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default ModalCriarManual;
