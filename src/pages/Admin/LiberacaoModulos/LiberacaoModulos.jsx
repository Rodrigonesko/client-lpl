import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Autocomplete, TextField, Button, Box, Container, Typography, Paper, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, FormLabel, FormGroup } from "@mui/material";
import { getInfoEmail, getUsers, liberarModulos } from "../../../_services/user.service";
import Toast from "../../../components/Toast/Toast";

const LiberacaoModulos = () => {

    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [enfermeiro, setEnfermeiro] = useState(false)
    const [elegibilidade, setElegibilidade] = useState(false)
    const [rsd, setRsd] = useState(false)
    const [busca, setBusca] = useState(false)
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
    const [agendamento, setAgendamento] = useState(false)
    const [administrador, setAdministrador] = useState(false)
    const [dataAniversario, setDataAniversario] = useState('')
    const [matricula, setMatricula] = useState('')
    const [inativarEmail, setInativarEmail] = useState(false)

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
                setDataAniversario(result.user.dataAniversario)
                setMatricula(result.user.matricula)
                setEmail(result.user.email)
                setAdministrador(result.user?.acessos?.administrador)
                setAgendamento(result.user?.acessos?.agendamento)
                setInativarEmail(result.user.inativarEmail)

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

            }

        } catch (error) {
            console.log(error);
            setBusca(false)
        }
    }

    const liberar = async e => {
        try {
            const contaInativada = inativarEmail;

            await liberarModulos({ email, enfermeiro, elegibilidade, entrada1, saida1, entrada2, saida2, atividadePrincipal, coren, rsd, nomeCompleto, dataAdmissao, dataAniversario, matricula, administrador, agendamento, contaInativada })

            setOpen(true)
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
        <Sidebar>
            <Container maxWidth style={{ width: '100%' }}>
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
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label='Email' />}
                        />
                        <Button style={{ marginLeft: '30px' }} variant='contained' onClick={buscarEmail}>Buscar</Button>
                    </Box>
                    {
                        busca && (
                            <Paper elevation={6} style={{ padding: '10px' }}>
                                <Typography variant="h6">
                                    Módulos a serem liberados para o Usuário: {usuario}
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
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
                                    </Box>
                                    {
                                        enfermeiro ? (
                                            <Box m={2}>
                                                <TextField type='text' value={coren} label='Coren' onChange={e => setCoren(e.target.value)} />
                                            </Box>
                                        ) : null
                                    }
                                </Box>
                                <Box m={2}>
                                    <FormControl>
                                        <FormLabel component='legend'>
                                            Acessos
                                        </FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={administrador} onChange={e => setAdministrador(e.target.checked)} name="Administrador" value={!administrador} />
                                                }
                                                label="Administrador"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={agendamento} onChange={e => setAgendamento(e.target.checked)} name="Agendamento" value={!agendamento} />
                                                }
                                                label="Agendamento"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Box>
                                <Box m={2} >
                                    <h4>Definir carga horária</h4>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box m={2}>
                                            <TextField focused type="time" id="entrada-1" defaultValue={entrada1} onChange={e => setEntrada1(e.target.value)} label='1° Entrada' />
                                        </Box>
                                        <Box m={2}>
                                            <TextField focused type="time" id="saida-1" defaultValue={saida1} onChange={e => setSaida1(e.target.value)} label='1° Saída' />
                                        </Box>
                                        <Box m={2}>
                                            <TextField focused type="time" id="entrada-2" defaultValue={entrada2} onChange={e => setEntrada2(e.target.value)} label='2° Entrada' />
                                        </Box>
                                        <Box m={2}>
                                            <TextField focused type="time" id="saida-2" defaultValue={saida2} onChange={e => setSaida2(e.target.value)} label='2° Saída' />
                                        </Box>
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
                                <Box sx={{ display: 'flex', alignContent: 'space-between' }} >
                                    <Box m={2}>
                                        <TextField sx={{ width: '350px' }} type="text" label="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                                    </Box>
                                    <Box m={2}>
                                        <TextField sx={{ width: '350px' }} type="text" label="Nome Completo (Mesmo nome do Ponto)" value={nomeCompleto} onChange={e => setNomeCompleto(e.target.value)} />
                                    </Box>
                                    <Box m={2}>
                                        <TextField sx={{ width: '350px' }} type="date" focused label="Data Admissão" value={dataAdmissao} onChange={e => setDataAdmissao(e.target.value)} />
                                    </Box>
                                    <Box m={2}>
                                        <TextField sx={{ width: '350px' }} type="date" focused label="Data Nascimento" value={dataAniversario} onChange={e => setDataAniversario(e.target.value)} />
                                    </Box>
                                    <Box m={2}>
                                        <TextField sx={{ width: '350px' }} type="text" label="Matricula" value={matricula} onChange={e => setMatricula(e.target.value)} />
                                    </Box>
                                </Box>
                                <Box m={2}>
                                    <h4>Inativar conta de e-mail:</h4>
                                    <Box >
                                        <FormControlLabel
                                            value={inativarEmail}
                                            control={<Checkbox value={inativarEmail} checked={inativarEmail} />}
                                            label="Inativar conta de E-mail"
                                            labelPlacement="start"
                                            onChange={() => {
                                                setInativarEmail(!inativarEmail)
                                            }}
                                        />
                                    </Box>

                                </Box>

                                <Box m={2} className="btn-container">
                                    <Button variant='contained' onClick={liberar}>Liberar</Button>
                                </Box>
                            </Paper>
                        )
                    }
                    <Toast
                        message={'Atualizado com sucesso!'} severity={'success'} open={open} onClose={e => { setOpen(false) }} duration={6000}
                    />
                </Box>
            </Container>
        </Sidebar >

    )
}

export default LiberacaoModulos