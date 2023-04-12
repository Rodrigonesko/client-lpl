import React, { useState } from 'react'
import { Modal, Box, Typography, Button, CircularProgress } from '@mui/material';
import Axios from 'axios'
import NestedList from '../NestedList/NestedList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import gerarPdf from '../../pages/TeleEntrevistas/Pdf/Pdf';

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
    const [progress, setProgress] = useState(0)
    const [palavrasIncorretas, setPalavrasIncorretas] = useState([])
    const [enviado, setEnviado] = useState(false)

    const buscarPalavrasDicionario = async () => {


    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const enviarDados = async () => {
        buscarPalavrasDicionario()
        setPalavrasIncorretas([])

        await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/formulario`, {
            respostas: respostas,
            subRespostas: subRespostas,
            pessoa,
            simOuNao,
            cids,
            divergencia,
            entrevistaQualidade
        }, {
            withCredentials: true
        })

        gerarPdf(pessoa.proposta, pessoa.nome)

        setEnviado(true)
    }

    const corrigirOrtografia = async () => {
        try {

            setPalavrasIncorretas([])
            setProgress(0)
            handleOpen()

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/dicionario`, {
                withCredentials: true
            })

            let dicionario = result.data.map(e => {
                return e.palavra
            })

            const totalProgress = (Object.keys(respostas).length + Object.keys(subRespostas).length)

            if (totalProgress === 0) {
                setProgress(100)
            }

            let count = 0

            for await (const pergunta of Object.keys(respostas)) {

                const palavras = respostas[pergunta].trim().split(' ');

                for await (const palavra of palavras) {
                    try {

                        console.log(dicionario);

                        if (dicionario.includes(palavra)) {
                            continue
                        }

                        const result = await Axios.get(`https://api.dicionario-aberto.net/word/${palavra.toLowerCase().replace(/[^a-zA-ZÀ-ú]/g, '')}`, {
                            withCredentials: true
                        })

                        console.log(palavra.toLowerCase().replace(/[^a-zA-ZÀ-ú]/g, ''));

                        if (result.data.length === 0) {

                            const result = await Axios.get(`https://api.dicionario-aberto.net/near/${palavra.toLowerCase().replace(/[^a-zA-ZÀ-ú]/g, '')}`, {
                                withCredentials: true
                            })

                            setPalavrasIncorretas(prevState => [...prevState, {
                                onde: 'Principal',
                                pergunta,
                                palavra,
                                sugestoes: result.data,
                                plural: verificarPlural(palavra) ? 'Plural' : null
                            }])

                        }

                    } catch (error) {
                        console.log(error);
                        continue
                    }

                }

                count++
                setProgress((count / totalProgress) * 100)
            }

            for await (const pergunta of Object.keys(subRespostas)) {

                const palavras = subRespostas[pergunta].trim().split(' ');

                for await (const palavra of palavras) {
                    try {

                        console.log(dicionario);

                        if (dicionario.includes(palavra)) {
                            continue
                        }

                        const result = await Axios.get(`https://api.dicionario-aberto.net/word/${palavra.toLowerCase().replace(/[^a-zA-ZÀ-ú]/g, '')}`, {
                            withCredentials: true
                        })

                        console.log(palavra.toLowerCase().replace(/[^a-zA-ZÀ-ú]/g, ''));

                        if (result.data.length === 0) {

                            const result = await Axios.get(`https://api.dicionario-aberto.net/near/${palavra.toLowerCase().replace(/[^a-zA-ZÀ-ú]/g, '')}`, {
                                withCredentials: true
                            })

                            setPalavrasIncorretas(prevState => [...prevState, {
                                onde: 'Secundária',
                                pergunta,
                                palavra,
                                sugestoes: result.data,
                                plural: verificarPlural(palavra) ? 'Plural' : null
                            }])

                        }

                    } catch (error) {
                        console.log(error);
                        continue
                    }
                }

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
        </>
    )
}

export default ModalFormulario

function verificarPlural(palavra) {
    // Lista de terminações plurais em português
    const terminacoesPlurais = [
        "s", "es", "is", "us", "os", "as", "ns", "rs", "x", "z",
        "is", "ois", "eis", "éis", "uis", "ões"
    ];

    // Verifica se a palavra termina com uma das terminações plurais
    for (let i = 0; i < terminacoesPlurais.length; i++) {
        const terminacao = terminacoesPlurais[i];
        if (palavra.endsWith(terminacao)) {
            return true; // Palavra está no plural
        }
    }

    return false; // Palavra está no singular
}
