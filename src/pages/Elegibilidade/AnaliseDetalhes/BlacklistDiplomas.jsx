import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, IconButton, TextField, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Axios from "axios";

const BlacklistDiplomas = ({ proposta }) => {

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(true)

    const [universidade, setUniversidade] = useState(proposta.universidade)
    const [curso, setCurso] = useState(proposta.curso)
    const [numeroRegistro, setNumeroRegistro] = useState(proposta.numeroRegistro)
    const [diplomas, setDiplomas] = useState([])



    const handleChangeShow = () => {
        setShow(!show)
    }

    const buscarDiploma = async () => {

        const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/elegibilidade/buscarDiploma`, {
            dados: {
                universidade,
                curso,
                numeroRegistro,
                id: proposta._id
            }
        }, {
            withCredentials: true
        })

        console.log(result);

        setDiplomas(result.data)

    }

    const salvarDiploma = async () => {

        const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/salvarDiploma`, {
            dados: {
                universidade,
                curso,
                numeroRegistro,
                id: proposta._id
            }
        }, {
            withCredentials: true
        })

        console.log(result);

        buscarDiploma()

    }

    useEffect(() => {
        buscarDiploma()
    }, [])

    return (
        <Box component={Paper} p={2} mt={3} elevation={3}>
            <Box display='flex' alignContent='center' justifyContent='space-between' bgcolor='lightgray' borderRadius='5px' p={1}>
                <Typography>
                    Consulta de Diploma
                </Typography>
                <IconButton aria-label="expand row" size="small" onClick={() => {
                    setOpen(!open)
                    handleChangeShow()
                }}>
                    {!open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </IconButton>
            </Box>
            {
                show ? (
                    <Box width='50%'>
                        <TextField label='Universidade' fullWidth size="small" style={{ margin: '10px' }} value={universidade} onChange={e => setUniversidade(e.target.value)} />
                        <TextField label='Curso' fullWidth size="small" style={{ margin: '10px' }} value={curso} onChange={e => setCurso(e.target.value)} />
                        <TextField label='Número de Registro de Diploma' fullWidth size="small" style={{ margin: '10px' }} value={numeroRegistro} onChange={e => setNumeroRegistro(e.target.value)} />
                        <Box>
                            <Button variant='outlined' onClick={salvarDiploma}>Salvar</Button>
                        </Box>
                        <Box>
                            <ul>
                                {
                                    diplomas.length === 0 ? (
                                        <li>Diploma válido, ainda não utilizado</li>
                                    ) : diplomas.map(e => {
                                        return (
                                            <li>Diploma utilizado pela proposta: <a href="#">{e.proposta}</a></li>
                                        )
                                    })
                                }
                            </ul>
                        </Box>
                    </Box>
                ) : null
            }
        </Box>
    )
}

export default BlacklistDiplomas