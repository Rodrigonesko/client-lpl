import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, IconButton, TextField, Button, Alert, Snackbar, Autocomplete } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Axios from "axios";
import { buscaDiploma, getCursos, getUniversidade, salvaDiploma } from "../../../_services/elegibilidade.service";

const BlacklistDiplomas = ({ proposta }) => {

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(true)
    const [openSnack, setOpenSnack] = useState(false)

    const [universidade, setUniversidade] = useState(proposta.universidade)
    const [curso, setCurso] = useState(proposta.curso)
    const [numeroRegistro, setNumeroRegistro] = useState(proposta.numeroRegistro)
    const [diplomas, setDiplomas] = useState([])

    const [sugestoesUniversidades, setSugestoesUniversidades] = useState(['teste', 'teste2'])
    const [sugestoesCursos, setSugestoesCursos] = useState([])

    const handleChangeShow = () => {
        setShow(!show)
    }

    const buscarDiploma = async () => {

        const result = await buscaDiploma({
            dados: {
                universidade,
                curso,
                numeroRegistro,
                id: proposta._id
            }
        })

        setDiplomas(result)

    }

    const salvarDiploma = async () => {

        await salvaDiploma({
            dados: {
                universidade,
                curso,
                numeroRegistro,
                id: proposta._id
            }
        })

        setOpenSnack(true)
        buscarDiploma()

    }

    const buscarUniversidades = async () => {

        const result = await getUniversidade()

        console.log(result);

        setSugestoesUniversidades(result)

    }

    const buscarCursos = async () => {

        const result = await getCursos()
        setSugestoesCursos(result)
    }

    useEffect(() => {
        buscarDiploma()
        buscarUniversidades()
        buscarCursos()
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
                        <Autocomplete
                            fullWidth
                            freeSolo
                            onChange={(event, element) => {
                                setUniversidade(element)
                            }}
                            value={universidade}
                            options={sugestoesUniversidades.map((option) => option)}
                            renderInput={(params) => <TextField {...params} label="Universidade" onChange={e => { setUniversidade(e.target.value) }} />}
                            size="small"
                            style={{ margin: '10px' }}
                        />
                        <Autocomplete
                            fullWidth
                            freeSolo
                            onChange={(event, element) => {
                                setCurso(element)
                            }}
                            value={curso}
                            options={sugestoesCursos.map((option) => option)}
                            renderInput={(params) => <TextField {...params} label="Curso" onChange={e => { setCurso(e.target.value) }} />}
                            size="small"
                            style={{ margin: '10px' }}
                        />
                        {/* <TextField label='Universidade' fullWidth size="small" style={{ margin: '10px' }} value={universidade} onChange={e => setUniversidade(e.target.value)} />
                        <TextField label='Curso' fullWidth size="small" style={{ margin: '10px' }} value={curso} onChange={e => setCurso(e.target.value)} /> */}
                        <TextField label='Número de Registro de Diploma' fullWidth size="small" style={{ margin: '10px' }} value={numeroRegistro} onChange={e => setNumeroRegistro(e.target.value)} />
                        <Box>
                            <Button variant='outlined' onClick={salvarDiploma}>Salvar</Button>
                        </Box>
                        <Box>
                            <ul style={{ listStyle: 'none', marginTop: '20px' }}>
                                {
                                    diplomas.length === 0 ? (
                                        <li><Alert severity="success" >Diploma válido, ainda não utilizado</Alert></li>
                                    ) : diplomas.map(e => {
                                        return (
                                            <li><Alert severity="error">Diploma utilizado pela proposta: <a href={`/elegibilidade/analise/detalhes/${e._id}`} target='_blank' >{e.proposta}</a></Alert></li>
                                        )
                                    })
                                }
                            </ul>
                        </Box>
                    </Box>
                ) : null
            }
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Atualizado com sucesso!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default BlacklistDiplomas