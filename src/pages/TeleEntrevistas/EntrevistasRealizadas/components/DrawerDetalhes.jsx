import { ArrowForward } from "@mui/icons-material"
import { IconButton, Drawer, Typography, Box, Button, Dialog, DialogActions, DialogContent, Input } from "@mui/material"
import { useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import { uploadArquivoPropostaEntrevista } from "../../../../_services/teleEntrevistaV2.service"
import axios from "axios"
import { PropostaService } from "../../../../_services/teleEntrevistaV2.service"

const propostaService = new PropostaService()

const DrawerDetalhes = ({ proposta }) => {

    const [data, setData] = useState(proposta)

    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [file, setFile] = useState()

    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const send = async () => {
        const formData = new FormData()
        formData.append('file', file, file.name)
        try {
            const response = await uploadArquivoPropostaEntrevista(data._id, formData)
            setOpenToast(true)
            setMessage('Upload feito com sucesso')
            setSeverity('success')
            setOpenDialog(false)
            console.log(response);
            const res = await propostaService.findById(data._id)
            setData(res)
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao fazer upload')
            setSeverity('error')
        }
    }

    const fileDownload = async (arquivo) => {
        try {
            console.log(`${process.env.REACT_APP_API_TELE_ENTREVISTA}/file/download/${arquivo}`);
            const res = await axios.get(`${process.env.REACT_APP_API_TELE_ENTREVISTA}/file/download/${arquivo}`, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')} `
                }
            })
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', arquivo)
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao fazer download')
            setSeverity('error')

        }
    }

    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}
            >
                <ArrowForward />
            </IconButton>
            <Drawer
                anchor='right'
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    width: 400,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 400,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box
                    p={2}
                >
                    <Typography
                        variant='h5'
                    >
                        Arquivos
                    </Typography>
                    {data?.nome} - {data?.proposta}
                    <Box
                        display='flex'
                        flexDirection='column'
                        gap={2}
                        m={2}
                    >
                        {
                            data?.arquivos?.map((arquivo, index) => (
                                <Typography
                                    key={index}
                                    variant='body1'
                                    onClick={() => fileDownload(arquivo)}
                                    sx={{
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        color: 'blue'
                                    }}
                                >
                                    {arquivo}
                                </Typography>
                            ))
                        }
                    </Box>
                    <Box>
                        <Button
                            onClick={() => setOpenDialog(true)}
                            variant='contained'
                            color='primary'
                            sx={{
                                mt: 2
                            }}
                        >
                            upload
                        </Button>
                        <Dialog
                            open={openDialog}
                            onClose={() => setOpenDialog(false)}
                        >
                            <DialogActions>
                                Upload de Arquivo
                            </DialogActions>
                            <DialogContent>
                                <Input type="file" onChange={e => setFile(e.target.files[0])} />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => setOpenDialog(false)}
                                    color="inherit"
                                    variant="contained"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={send}
                                    color="success"
                                    variant="contained"
                                >
                                    Enviar
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
                <Toast
                    open={openToast}
                    onClose={() => setOpenToast(false)}
                    message={message}
                    severity={severity}
                />
            </Drawer>
        </>
    )
}

export default DrawerDetalhes