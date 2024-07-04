import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"
import { set, useForm } from "react-hook-form"
import Toast from "../../../../components/Toast/Toast"
import { createNumeroBradesco } from "../../../../_services/whatsapp.service"

const ModalCriarContato = ({ setRefresh }) => {

    const { register, getValues, setValue } = useForm()

    const [openModal, setOpenModal] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleOpen = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleSubmit = async () => {
        try {

            const contato = getValues()

            if (contato.ddd.length !== 2 || contato.celular.length !== 9) {
                setOpenToast(true)
                setMessageToast('Telefone inválido')
                setSeverity('error')
                return
            }

            await createNumeroBradesco(contato)
            setOpenModal(false)
            setOpenToast(true)
            setMessageToast('Contato adicionado com sucesso')
            setSeverity('success')
            setValue('nome', '')
            setValue('ddd', '')
            setValue('celular', '')
            setRefresh(prev => !prev)
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessageToast('Erro ao adicionar contato')
            setSeverity('error')
        }
    }

    return (
        <>
            <Button type='button' variant='contained' size='small' onClick={handleOpen} sx={{ borderRadius: '10px' }}>Adicionar Contato</Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>Adicionar Contato</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField {...register('nome')} type='text' size='small' margin='normal' label='Nome' />
                    <TextField {...register('ddd')} type='text' size='small' margin='normal' label='DDD' />
                    <TextField {...register('celular')} type='text' size='small' margin='normal' label='Telefone' />
                    <TextField type='text' disabled size='small' margin='normal' label='Whatsapp' />
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Fechar</Button>
                    <Button color='success' onClick={handleSubmit}>Enviar</Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={messageToast}
                severity={severity}
            />
        </>
    )
}

export default ModalCriarContato