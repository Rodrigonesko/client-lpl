import { SaveAs } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { indigo } from "@mui/material/colors"
import { useState } from "react"
import { finalizarSinistro } from "../../../../_services/rsdBradesco.service"

const ModalParecer = ({ id, setOpenToast, setMessage, setSeverity, setPacote }) => {

    const [openModal, setOpenModal] = useState(false)

    const [statusParecer, setStatusParecer] = useState('')
    const [messageParecer, setMessageParecer] = useState('')


    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
        setStatusParecer('')
    }

    const handleSendParecer = async () => {
        try {
            if (messageParecer.length <= 4 || statusParecer === '') {
                setOpenToast(true)
                setMessage('Insira o status e o motivo do parecer!')
                setSeverity('warning')
                return
            }
            let status = 'SUCESSO'
            if (statusParecer === 'NÃO FOI POSSÍVEL CONFIRMAR O ATENDIMENTO POR FALHA NA TENTATIVA DE CONTATO') {
                status = 'INSUCESSO'
            }

            const result = await finalizarSinistro(id, {
                status,
                parecer: statusParecer,
                observacaoFinal: messageParecer
            })
            setPacote(result)
            setMessageParecer('')
            setStatusParecer('')
            setOpenToast(true)
            setMessage('Parecer realizado com sucesso')
            setSeverity('success')
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    bgcolor: indigo[800],
                    color: 'white',
                    ':hover': {
                        bgcolor: indigo[900]
                    }
                }}
                endIcon={<SaveAs />}
                onClick={handleOpenModal}
            >
                Parecer
            </Button>
            <Dialog
                open={openModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Adicionar Parecer"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ display: 'flex', flexDirection: 'column' }} >
                        <FormControl size="small" margin="normal">
                            <InputLabel>Status LPL</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status LPL"
                                sx={{ width: 750, borderRadius: '10px' }}
                                onChange={(e) => { setStatusParecer(e.target.value) }}
                                value={statusParecer}
                            >
                                <MenuItem value={'CONFIRMADO O FRACIONAMENTO - NEGAR O SINISTRO'} >CONFIRMADO O FRACIONAMENTO - NEGAR O SINISTRO</MenuItem>
                                <MenuItem value={'REEMBOLSO SEM DESEMBOLSO'} >REEMBOLSO SEM DESEMBOLSO</MenuItem>
                                <MenuItem value={'COMPROVANTE DIVERGENTE'}>COMPROVANTE DIVERGENTE</MenuItem>
                                <MenuItem value={'NÃO EVIDENCIADA A IRREGULARIDADE - PROCEDER COM A ANÁLISE E PAGAMENTO'} >NÃO EVIDENCIADA A IRREGULARIDADE - PROCEDER COM A ANÁLISE E PAGAMENTO</MenuItem>
                                <MenuItem value={'NÃO FOI POSSÍVEL CONFIRMAR O ATENDIMENTO POR FALHA NA TENTATIVA DE CONTATO'} >NÃO FOI POSSÍVEL CONFIRMAR O ATENDIMENTO POR FALHA NA TENTATIVA DE CONTATO</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField type='text' placeholder="Parecer" size='small' multiline value={messageParecer} onChange={(e) => { setMessageParecer(e.target.value) }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                            sx={{ mt: 2 }}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error' >Fechar</Button>
                    <Button onClick={handleSendParecer} color='success' autoFocus>Enviar Parecer</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalParecer