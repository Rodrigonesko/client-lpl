import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import './Mensagens.css'
import { Box, Container, Paper, CircularProgress } from "@mui/material";

const Mensagens = () => {

    const [mensagens, setMensagens] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const gerarMensagens = async () => {
            try {

                setLoading(true)

                const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/gerarMensagens`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` }
                })

                console.log(result);

                setMensagens(result.data.msgs)

                setLoading(false)

            } catch (error) {
                console.log(error);
            }
        }

        gerarMensagens()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <Container>
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', right: '50%', top: '50%' }} />
                    ) : null
                }

                <div className="mensagens-container">
                    <div className="title">
                        <h3>Mensagens</h3>
                    </div>
                    {/* <div className="filtro-mensagens">
                        <label htmlFor="gerar-mensagem">Selecionar data parar mensagens: </label>
                        <input type="date" id="gerar-mensagens" name="gerar-mensagens" onChange={e => setDataMensagem(e.target.value)} />
                        <button onClick={gerarMensagens}>Gerar mensagens</button>
                    </div> */}
                    <Box>
                        {
                            mensagens.map(e => {
                                return (
                                    <Box component={Paper} elevation={3} p={2} m={1}>
                                        {e.saudacao}
                                        <br />
                                        <br />
                                        {e.parte1} {e.parte2} {e.parte3}
                                        <br />
                                        {e.parte4}
                                        <br />
                                        <br />
                                        {
                                            e.parte5.map(parteMensagem => {
                                                return (
                                                    <>
                                                        {parteMensagem}
                                                        <br />
                                                    </>

                                                )
                                            })
                                        }
                                        <br />
                                        {e.parte6}
                                        <br />
                                        <br />
                                        {e.parte8}
                                        <br />
                                        <br />
                                        {e.parte7}
                                        <br />
                                        <span>Tipo Contrato: {e.tipoContrato}</span>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </div>
            </Container>
        </>
    )
}

export default Mensagens