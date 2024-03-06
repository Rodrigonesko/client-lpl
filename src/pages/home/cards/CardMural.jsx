import { Box, Chip, Divider, Link, Paper, Typography } from "@mui/material"
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ModalDeletarRecado from "../modais/ModalDeletarRecado";

const CardMural = ({ flushHook, setFlushHook, dataUser, setLoading }) => {

    const [recados, setRecados] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/mural`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setRecados(result.data)
            setLoading(false)
        }

        fetchData()
        setLoading(false)
    }, [flushHook])

    return (
        <Box component={Paper} width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
            {
                recados.map(recado => {
                    return (
                        <Box key={recado._id} textAlign={"start"} p={2}  >
                            <Typography variant="h5">
                                {recado.titulo}
                            </Typography>
                            <Box>
                                {'Arquivos: '}
                                {
                                    recado.arquivos.map(arquivo => {
                                        return (
                                            <Chip key={arquivo} label={<Link target="_blank" href={`${process.env.REACT_APP_API_KEY}/media/mural/${arquivo}`}>{arquivo}</Link>} variant="outlined" />
                                        )
                                    })
                                }
                            </Box>
                            <Box component={'div'}
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    '-webkit-line-clamp': 3,
                                    '-webkit-box-orient': 'vertical',
                                    'img': {
                                        maxWidth: '800px',
                                        height: 'auto'
                                    },
                                    textAlign: 'center',
                                    width: '100%'
                                }}
                                dangerouslySetInnerHTML={{ __html: recado.texto }}></Box>
                            <Box mt={2}>
                                <Typography fontWeight={'600'} fontStyle={"italic"}>
                                    Recado feito por: {recado.responsavel}
                                </Typography>
                                {
                                    (dataUser.name === recado.responsavel) || (dataUser.name === 'Samantha Maciel Giazzon') ? (
                                        <ModalDeletarRecado setFlushHook={setFlushHook} id={recado._id} />
                                    ) : (
                                        <>
                                        </>
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