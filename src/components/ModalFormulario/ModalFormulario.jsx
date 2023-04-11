import React, { useState } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material';
import Axios from 'axios'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
};

const ModalFormulario = ({ respostas, subRespostas, simOuNao, pessoa, cids, divergencia, entrevistaQualidade }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [palavrasIncorretas, setPalavrasIncorretas] = useState([])

    const enviarDados = async () => {
        try {

            setPalavrasIncorretas([])

            handleOpen()

            console.log(respostas, subRespostas, simOuNao, pessoa, cids, divergencia, entrevistaQualidade);


            // for await (const subPergunta of Object.keys(subRespostas)) {
            //     console.log(subRespostas[subPergunta]);
            //     const frase = subRespostas[subPergunta].trim().replace(/\s+/g, '+');

            //     const result = await Axios.get(`https://api.textgears.com/grammar?text=${frase}&language=pt-BR&whitelist=&dictionary_id=&ai=1&key=2FsvJu0qeH9MEFW7`)
            //     console.log(result.data);
            // }

            const result = await Axios.get(`https://api.dicionario-aberto.net/word/pazes`, {
                withCredentials: true
            })

            console.log(result);

            for await (const pergunta of Object.keys(respostas)) {
                console.log(respostas[pergunta]);
                const palavras = respostas[pergunta].trim().split(' ');

                for await (const palavra of palavras) {
                    try {
                        console.log(palavra);
                        const result = await Axios.get(`https://api.dicionario-aberto.net/word/${palavra.toLowerCase()}`, {
                            withCredentials: true
                        })

                        console.log(result.data);

                        if (result.data.length === 0) {

                            console.log('plural', verificarPlural(palavra));
                            const result = await Axios.get(`https://api.dicionario-aberto.net/near/${palavra.toLowerCase()}`, {
                                withCredentials: true
                            })

                            setPalavrasIncorretas(prevState => [...prevState, {
                                onde: 'Pergunta',
                                pergunta,
                                palavra,
                                sugestoes: result.data,
                                plural: verificarPlural(palavra) ? 'Plural' : null
                            }])

                            console.log(result.data);
                        }

                    } catch (error) {
                        console.log(error);
                        continue
                    }

                }
            }

            // const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/formulario`, {
            //     respostas: respostas,
            //     subRespostas: subRespostas,
            //     pessoa,
            //     simOuNao,
            //     cids: arrCids,
            //     divergencia,
            //     entrevistaQualidade
            // }, {
            //     withCredentials: true
            // })

            // gerarPdf(pessoa.proposta, pessoa.nome)

            // if (result.status === 200) {
            //     openModal()
            // }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Box m={2}>
                <Button variant="contained" onClick={enviarDados} >Enviar</Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Verificando erros ortográficos...
                    </Typography>
                    <Box>
                        {
                            palavrasIncorretas.map(e => {
                                return (
                                    <ul style={{ margin: '20px' }}>
                                        <li>onde: {e.onde}</li>
                                        <li>pergunta: {e.pergunta}</li>
                                        <li>palavra: {e.palavra}</li>
                                        <li>sugestoes: {e.sugestoes.map(sugestao => {
                                            return (
                                                <li>
                                                    {sugestao}
                                                </li>
                                            )
                                        })}</li>
                                        <li>plural: {e.plural}</li>
                                    </ul>
                                )
                            })
                        }
                    </Box>
                    <Box mt={2}>
                        <Button variant='contained' onClick={handleClose} color='inherit'>Fechar</Button>
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
        "is", "ois", "eis", "éis", "uis"
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