import React, { useState } from 'react'
import { Modal, Box, Typography, Button, CircularProgress, Alert, Snackbar } from '@mui/material';
import NestedList from '../NestedList/NestedList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import gerarPdf from '../../pages/TeleEntrevistas/Pdf/Pdf';
import { preencherFormulario } from '../../_services/teleEntrevista.service';
import { getDicionario } from '../../_services/dicionario.service';
import Toast from '../Toast/Toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '70vh',
    overflowY: 'auto'
};

const ModalFormulario = ({ respostas, subRespostas, simOuNao, pessoa, cids, divergencia, entrevistaQualidade }) => {

    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')
    const [progress, setProgress] = useState(0)
    const [palavrasIncorretas, setPalavrasIncorretas] = useState([])
    const [enviado, setEnviado] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const enviarDados = async () => {

        setPalavrasIncorretas([])

        await preencherFormulario({
            respostas,
            subRespostas,
            pessoa,
            simOuNao,
            cids,
            divergencia,
            entrevistaQualidade
        })

        gerarPdf(pessoa.proposta, pessoa.nome)

        setEnviado(true)
    }

    const corrigirOrtografia = async () => {
        try {

            if (!respostas.divergencia && divergencia) {
                setMessage('Campo de divergência não preenchido')
                setSeverity('error')
                setOpenSnack(true)
                return
            }

            if (cids.length === 0 && divergencia) {
                setMessage('Campo de CID não preenchido')
                setSeverity('error')
                setOpenSnack(true)
                return
            }

            setPalavrasIncorretas([])
            setProgress(0)
            handleOpen()

            const result = await getDicionario()

            let dicionario = result.map(e => {
                return e.palavra
            })

            const totalProgress = (Object.keys(respostas).length + Object.keys(subRespostas).length)

            if (totalProgress === 0) {
                setProgress(100)
            }

            let count = 0

            for await (const pergunta of Object.keys(respostas)) {
                count++
                setProgress((count / totalProgress) * 100)
            }

            for await (const pergunta of Object.keys(subRespostas)) {

                count++
                setProgress((count / totalProgress) * 100)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Box m={2}>
                <Button variant="contained" onClick={corrigirOrtografia} >Enviar</Button>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display='flex' justifyContent='center'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" display='flex' alignItems='center'>
                            {
                                progress >= 100 ? (
                                    <>
                                        Erros ortográficos verificados <CheckCircleIcon style={{ marginLeft: '10px' }} color='success' />
                                    </>

                                ) : (
                                    'Verificando erros ortográficos...'
                                )
                            }
                        </Typography>
                    </Box>
                    <Box display='flex' justifyContent='center' m={3}>
                        <CircularProgress variant='determinate' value={progress} color={progress >= 100 ? 'success' : 'info'} />
                    </Box>
                    <Box>
                        {
                            palavrasIncorretas.map(e => {
                                return (
                                    <NestedList onde={e.onde} pergunta={e.pergunta} palavra={e.palavra} sugestoes={e.sugestoes} plural={e.plural} />
                                )
                            })
                        }
                        {
                            enviado ? (
                                <Typography variant='h6' textAlign='center'>
                                    Formulário enviado com sucesso!
                                </Typography>
                            ) : null
                        }
                    </Box>
                    <Box mt={2} display='flex' justifyContent='space-around'>
                        <Button variant='contained' onClick={handleClose} color='inherit'>Fechar</Button>
                        <Button variant='contained' onClick={enviarDados} color='success'>Enviar</Button>
                    </Box>
                </Box>
            </Modal>
            <Toast
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                severity={severity}
                message={message}
            />
        </>
    )
}

export default ModalFormulario