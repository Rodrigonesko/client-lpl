import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Autocomplete, TextField, Button, Box, Container, Typography, Paper, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getInfoEmail, getUsers, liberarModulos } from "../../../_services/user.service";

const LiberacaoModulos = () => {

    const [email, setEmail] = useState('')
    const [enfermeiro, setEnfermeiro] = useState(false)
    const [elegibilidade, setElegibilidade] = useState(false)
    const [rsd, setRsd] = useState(false)
    const [busca, setBusca] = useState(false)
    const [msg, setMsg] = useState('')
    const [entrada1, setEntrada1] = useState('')
    const [saida1, setSaida1] = useState('')
    const [entrada2, setEntrada2] = useState('')
    const [saida2, setSaida2] = useState('')
    const [emails, setEmails] = useState([])
    const [usuario, setUsuario] = useState('')
    const [atividadePrincipal, setAtividadePrincipal] = useState('')
    const [coren, setCoren] = useState('')
    const [nomeCompleto, setNomeCompleto] = useState('')
    const [dataAdmissao, setDataAdmissao] = useState('')

    const atividades = [
        'Gerência',
        'Sistemas',
        'Elegibilidade',
        'RSD',
        'Sindicância',
        'Tele Entrevista',
        'Callback',
        'Ti/Infra'
    ]

    const buscarEmail = async () => {
        try {

            setBusca(false)

            const result = await getInfoEmail(email)

            if (result.user !== null) {

                console.log(result);
                setMsg('')

                setEntrada1(result.user.horarioEntrada1)
                setSaida1(result.user.horarioSaida1)
                setEntrada2(result.user.horarioEntrada2)
                setSaida2(result.user.horarioSaida2)
                setUsuario(result.user.name)
                setAtividadePrincipal(result.user.atividadePrincipal)
                setCoren(result.user.coren)
                setRsd(result.user.rsd)
                setNomeCompleto(result.user.nomeCompleto)
                setDataAdmissao(result.user.dataAdmissao)

                if (result.user.enfermeiro === null || result.user.enfermeiro === 'false') {
                    setEnfermeiro(false)
                } else {
                    setEnfermeiro(true)
                }

                if (result.user.elegibilidade === null || result.user.elegibilidade === 'false') {
                    setElegibilidade(false)
                } else {
                    setElegibilidade(true)
                }
                setBusca(true)

            } else {
                setBusca(false)
                setMsg('Não foi encontrado um usuário com este e-mail!')

            }

        } catch (error) {
            console.log(error);
            setBusca(false)
        }
    }

    const liberar = async e => {
        try {

            await liberarModulos({ email, enfermeiro, elegibilidade, entrada1, saida1, entrada2, saida2, atividadePrincipal, coren, rsd, nomeCompleto, dataAdmissao })

            setMsg('Modulos atualizados com sucesso!')

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const buscarEmails = async () => {
            try {
                const result = await getUsers()

                setEmails(result)

            } catch (error) {
                console.log(error);
            }
        }

        buscarEmails()
    }, [])

    return (
        <>
            <Sidebar />
            <Container style={{ width: '100%' }}>
                <Box m={2} style={{ width: '100%' }}>
                    <Typography variant="h4" component="h2">
                        Liberação de Módulos
                    </Typography>
                    <Box display='flex' m={2}>
                        <Autocomplete
                            size="small"
                            disablePortal
                            id="email-auto-complete"
                            options={emails}
                            onChange={(event, item) => {
                                setEmail(item.email);
                            }}
                            getOptionLabel={emails => emails.email}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label='Email' />}
                        />
                        <Button style={{ marginLeft: '30px' }} variant='contained' onClick={buscarEmail}>Buscar</Button>
                    </Box>
                    <div >
                        {
                            msg
                        }
                    </div>
                    {
                        busca && (
                            <Paper style={{ padding: '10px' }}>
                                <Typography variant="h6">
                                    Módulos a serem liberados para o Usuário: {usuario}
                                </Typography>
                                <Box >
                                    <FormControlLabel
                                        value={rsd}
                                        control={<Checkbox value={rsd} checked={rsd} />}
                                        label="RSD"
                                        labelPlacement="start"
                                        onChange={() => {
                                            setRsd(!rsd)
                                        }}
                                    />
                                </Box>
                                <Box >
                                    <FormControlLabel
                                        value={elegibilidade}
                                        control={<Checkbox defaultChecked={elegibilidade} />}
                                        label="Elegiblidade"
                                        labelPlacement="start"
                                        onChange={e => setElegibilidade(!elegibilidade)}
                                    />
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        value={enfermeiro}
                                        control={<Checkbox defaultChecked={enfermeiro} />}
                                        label="Tele entrevista"
                                        labelPlacement="start"
                                        onChange={e => setEnfermeiro(!enfermeiro)}
                                    />
                                    {
                                        enfermeiro ? (
                                            <Box m={2}>
                                                <TextField type='text' value={coren} label='Coren' onChange={e => setCoren(e.target.value)} />
                                            </Box>
                                        ) : null
                                    }
                                </Box>
                                <Box m={2}>
                                    <h4>Definir carga horária</h4>
                                    <Box m={1}>
                                        <TextField type="time" id="entrada-1" defaultValue={entrada1} onChange={e => setEntrada1(e.target.value)} label='1° Entrada' />
                                    </Box>
                                    <Box m={1}>
                                        <TextField type="time" id="saida-1" defaultValue={saida1} onChange={e => setSaida1(e.target.value)} label='1° Saída' />
                                    </Box>
                                    <Box m={1}>
                                        <TextField type="time" id="entrada-2" defaultValue={entrada2} onChange={e => setEntrada2(e.target.value)} label='2° Entrada' />
                                    </Box>
                                    <Box m={1}>
                                        <TextField type="time" id="saida-2" defaultValue={saida2} onChange={e => setSaida2(e.target.value)} label='2° Saída' />
                                    </Box>
                                </Box>
                                <Box m={2}>
                                    <Typography variant="h6">
                                        Atividade Principal
                                    </Typography>
                                    <FormControl style={{ minWidth: '150px' }}>
                                        <InputLabel id="atividade">Atividade</InputLabel>
                                        <Select
                                            label='Atividade'
                                            labelId="atividade"
                                            defaultValue={atividadePrincipal}
                                            onChange={e => {
                                                setAtividadePrincipal(e.target.value)
                                            }}
                                        >
                                            <MenuItem>
                                                <em>
                                                    Atividade Principal
                                                </em>
                                            </MenuItem>
                                            {
                                                atividades.map(e => {
                                                    return (
                                                        <MenuItem value={e}>{e}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box m={2}>
                                    <TextField sx={{ width: '400px' }} type="text" label="Nome Completo (Mesmo nome do Ponto)" value={nomeCompleto} onChange={e => setNomeCompleto(e.target.value)} />
                                </Box>
                                <Box m={2}>
                                    <TextField sx={{ width: '400px' }} type="date" focused label="Data Admissão" value={dataAdmissao} onChange={e => setDataAdmissao(e.target.value)} />
                                </Box>

                                <Box m={2} className="btn-container">
                                    <Button variant='contained' onClick={liberar}>Liberar</Button>
                                </Box>
                            </Paper>
                        )
                    }
                </Box>
            </Container>
        </>
    )
}

export default LiberacaoModulos