import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { updatePacote } from "../../../../_services/rsdBradesco.service"
import AuthContext from "../../../../context/AuthContext"
import moment from "moment"

const ModalAdicionarObs = ({ id, setOpenToast, setMessage, setSeverity }) => {

    const [openModal, setOpenModal] = useState(false)
    const [observacao, setObservacao] = useState('')

    const { name } = useContext(AuthContext)

    const handleClose = () => {
        setOpenModal(false)
    }

    const handlePutObservacao = async () => {
        try {
            await updatePacote(
                id,
                {
                    $push: {
                        observacoes: {
                            responsavel: name,
                            observacao,
                            data: moment().format('YYYY-MM-DD HH:mm')
                        }
                    }
                }
            )
            setOpenToast(true)
            setMessage('Observação adicionada com sucesso')
            setSeverity('success')
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao adicionar Observação')
            setSeverity('error')
        }
    }

    return (
        <>
            <Button type='button' variant='contained' onClick={() => { setOpenModal(true) }} sx={{ mt: 2 }} >Adicionar Observação</Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                maxWidth
            >
                <DialogTitle>{'Observação'}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        type='text'
                        label='Observação'
                        size='small'
                        margin='normal'
                        fullWidth
                        multiline
                        value={observacao}
                        onChange={(e) => { setObservacao(e.target.value) }}
                        sx={{ width: 550 }}
                        InputProps={{
                            style: {
                                borderRadius: '10px',
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type='button' variant='text' onClick={handleClose} color='error' sx={{ mt: 2 }} >Fechar</Button>
                    <Button type='button' variant='text' onClick={handlePutObservacao} sx={{ mt: 2 }} >Adicionar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalAdicionarObs