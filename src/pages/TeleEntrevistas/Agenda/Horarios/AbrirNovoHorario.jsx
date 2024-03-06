import { FormControl, InputLabel, Paper, Select, Typography, MenuItem, TextField, Button } from "@mui/material"
import Axios from "axios"
import { useState } from "react"
import Toast from "../../../../components/Toast/Toast"

const AbrirNovoHorario = ({ responsaveis }) => {

    const [responsavel, setResponsavel] = useState('')
    const [dia, setDia] = useState('')
    const [horario, setHorario] = useState('')
    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const abrirNovoHorario = async () => {
        try {
            if ((responsavel === '') || (dia === '') || (horario === '')) {
                setMessage('Faltando responsavel, dia ou horário!')
                setSeverity("error")
                setToastOpen(true)
                return
            }

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/horario/novo`, {
                responsavel: responsavel,
                dia: dia,
                horario: horario
            }, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (result.status === 200) {
                setMessage('Horario aberto com sucesso!')
                setSeverity("success")
                setToastOpen(true)
                setDia('')
                setHorario('')
                setResponsavel('')
            }

        } catch (error) {
            setMessage('Erro!')
            setSeverity("error")
            setToastOpen(true)
        }
    }

    return (
        <Paper style={{ padding: '20px', margin: '10px' }} elevation={3}>
            <Typography variant='h6' m={1}>
                Abrir Novo Horário
            </Typography>
            <FormControl style={{ minWidth: '150px', marginRight: '20px' }} size='small'>
                <InputLabel id="responsavel-fechar-horario">Responsável</InputLabel>
                <Select
                    labelId='responsavel-fechar-horario'
                    id="select-responsavel-fechar-horario"
                    label='Responsável'
                    value={responsavel}
                    onChange={e => {
                        setResponsavel(e.target.value)
                    }}
                >
                    <MenuItem>
                        <em>
                            Responsável
                        </em>
                    </MenuItem>
                    {
                        responsaveis.map(e => {
                            return (
                                <MenuItem key={e.name} value={e.name}>{e.name}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <TextField style={{ marginRight: '20px' }} size="small" type='date' onChange={e => setDia(e.target.value)} value={dia} label='Dia' focused />
            <TextField style={{ marginRight: '20px' }} size='small' type='time' label='Horário' focused onChange={e => setHorario(e.target.value)} value={horario} />
            <Button variant="contained" onClick={abrirNovoHorario} >Abrir</Button>
            <Toast
                open={toastOpen}
                message={message}
                severity={severity}
                duration={6000}
                onClose={() => setToastOpen(false)}
            />
        </Paper>
    )
}

export default AbrirNovoHorario