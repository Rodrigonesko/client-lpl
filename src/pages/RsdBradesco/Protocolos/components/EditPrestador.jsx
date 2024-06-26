import { Edit } from "@mui/icons-material"
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, CircularProgress } from "@mui/material"
import { useState } from "react"
import { getPrestadorById, updatePrestador } from "../../../../_services/rsdBradesco.service"
import { useForm } from "react-hook-form"
import Toast from "../../../../components/Toast/Toast"

const EditInfo = ({ multirow, register, label }) => {

    return (
        <TextField
            label={label}
            fullWidth
            multiline={multirow}
            rows={multirow ? 4 : 1}
            {...register}
        />
    )
}

const EditPrestador = ({ prestador, setFlushHook }) => {

    const { register, getValues, setValue } = useForm()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')

    const handleOpen = async () => {
        setOpen(true)
        try {
            setLoading(true)
            const response = await getPrestadorById(prestador)
            setValue('nome', response.nome)
            setValue('cpfCnpj', response.cpfCnpj)
            setValue('uf', response.uf)
            setValue('observacoes', response.observacoes)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setToast(true)
            setSeverity('error')
            setMessage('Erro ao buscar prestador')
        }
    }

    const onSubmit = async () => {
        try {
            setLoading(true)
            const data = getValues()
            await updatePrestador(prestador, data)
            setLoading(false)
            setOpen(false)
            setToast(true)
            setSeverity('success')
            setMessage('Prestador editado com sucesso')
            setFlushHook(prev => !prev)
        } catch (error) {
            setToast(true)
            setSeverity('error')
            setMessage('Erro ao editar prestador')
        }
    }

    return (
        <>
            <IconButton
                size="small"
                onClick={handleOpen}
            >
                <Edit fontSize="5px" />
            </IconButton>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Editar Prestador</DialogTitle>
                <DialogContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        mt={2}
                    >
                        {!loading ? <>
                            <EditInfo
                                label="Nome"
                                register={register('nome')}
                            />
                            <EditInfo
                                label="CPF/CNPJ"
                                register={register('cpfCnpj')}
                            />
                            <EditInfo
                                label="UF"
                                register={register('uf')}
                            />
                            <EditInfo
                                label="Observações"
                                multirow
                                register={register('observacoes')}
                            />
                        </> : (
                            <CircularProgress />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="inherit"
                        variant="contained"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={onSubmit}
                        color="primary"
                        variant="contained"
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={toast}
                onClose={() => setToast(false)}
                severity={severity}
                message={message}
            />
        </>
    )
}

export default EditPrestador;