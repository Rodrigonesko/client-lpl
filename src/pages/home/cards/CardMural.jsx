import { Box, Chip, Divider, Link, Paper, Typography } from "@mui/material"
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ModalDeletarRecado from "../modais/ModalDeletarRecado";

const CardMural = ({ flushHook, setFlushHook, dataUser }) => {

    const [recados, setRecados] = useState([])

    const fetchData = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/mural`, {
            withCredentials: true
        })

        setRecados(result.data)

    }

    useEffect(() => {
        fetchData()
    }, [flushHook])

    return (
        <Box component={Paper} width={'100%'}>
            {
                recados.map(recado => {
                    return (
                        <Box textAlign={"start"} p={2} >
                            <Typography variant="h5">
                                {recado.titulo}
                            </Typography>
                            <Box>
                                {'Arquivos: '}
                                {
                                    recado.arquivos.map(arquivo => {
                                        return (
                                            <Chip label={<Link target="_blank" href={`${process.env.REACT_APP_API_KEY}/media/mural/${arquivo}`}>{arquivo}</Link>} variant="outlined" />
                                        )
                                    })
                                }
                            </Box>
                            <div dangerouslySetInnerHTML={{ __html: recado.texto }}></div>
                            <Box mt={2}>
                                <Typography fontWeight={'600'} fontStyle={"italic"}>
                                    Recado feito por: {recado.responsavel}
                                </Typography>
                                {
                                    dataUser.name === recado.responsavel && (
                                        <ModalDeletarRecado setFlushHook={setFlushHook} id={recado._id} />
                                    )
                                }
                            </Box>
                            <Divider sx={{ m: 1 }} />
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default CardMural