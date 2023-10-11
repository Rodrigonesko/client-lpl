import { Box, Paper } from "@mui/material"
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const CardMural = () => {

    const [recados, setRecados] = useState([])

    const fetchData = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/mural`, {
            withCredentials: true
        })

        setRecados(result.data)

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Box component={Paper} width={'100%'}>
            {
                recados.map(recado => {
                    return (
                        <Box>
                            <Box>
                                Arquivos: 
                                {
                                    recado.arquivos.map(arquivo => {
                                        return (
                                            <p>
                                                {arquivo}
                                            </p>
                                        )
                                    })
                                }
                            </Box>
                            <div dangerouslySetInnerHTML={{ __html: recado.texto }}></div>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default CardMural