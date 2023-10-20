import { FormControl, InputLabel, Paper, Select, Typography, MenuItem, TextField, List, ListItem, ListItemButton, ListItemIcon, Checkbox, Button, ListItemText, Alert } from "@mui/material"
import Axios from "axios"
import { useEffect, useState } from "react"
import Toast from "../../../../components/Toast/Toast"

const ReabrirHorarios = ({ responsaveis }) => {

    const [responsavel, setResponsavel] = useState('')
    const [data, setData] = useState('')
    const [horarios, setHorarios] = useState([])
    const [horariosReabrir, setHorariosReabrir] = useState([])
    const [horariosReabertos, setHorariosReabertos] = useState([])
    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const buscarHorariosNaoDisponiveis = async (data) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarHorariosNaoDisponiveis/${responsavel}/${data}`, { withCredentials: true })
            setHorarios(result.data.horarios)
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheck = async (e) => {
        const checked = e.target.checked
        const horario = e.target.value
        const newValue = horariosReabrir
        const arrAux = [...horariosReabertos]
        if (!checked) {
            const index = newValue.indexOf(horario)
            const indexReabertos = horariosReabertos.findIndex(values => values.horario === horario)
            if (indexReabertos !== -1) {
                arrAux.splice(indexReabertos, 1)
            }
            newValue.splice(index, 1)
        } else {
            newValue.push(horario)
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/verificarHorarioReaberto?enfermeiro=${responsavel}&dia=${data}&horario=${horario}`, { withCredentials: true })
            console.log(result.data);
            if (result.data.quemReabriu) {
                arrAux.push({
                    horario,
                    quemReabriu: result.data.quemReabriu
                })
            }
        }
        setHorariosReabrir(newValue)
        setHorariosReabertos(arrAux)
    }

    const reabrirHorarios = async () => {
        try {
            let arr = document.getElementsByClassName('horario-reabrir')
            let horarios = Object.values(arr).map(e => {
                if (e.firstChild.checked) {
                    return e.firstChild.value
                }

                return null
            })
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/reabrirHorarios`, { horarios, data: data, responsavel: responsavel }, { withCredentials: true })
            if (result.status === 200) {
                setMessage('Horarios reabertos com sucesso!')
                setSeverity("success")
                setToastOpen(true)
                setData('')
                setResponsavel('')
                setHorarios([])
                setHorariosReabertos([])
                setHorariosReabrir([])
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
                Reabrir Horários
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
                        setData('')
                        setHorarios([])
                        setHorariosReabertos([])
                        setHorariosReabrir([])
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
            <TextField style={{ marginRight: '20px' }} size="small" type='date' onChange={e => {
                setData(e.target.value)
                buscarHorariosNaoDisponiveis(e.target.value)
                setHorarios([])
                setHorariosReabertos([])
                setHorariosReabrir([])
            }} label='Dia' focused value={data} />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
                {
                    horarios.map(value => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                            <ListItem
                                key={value}
                                disablePadding
                            >
                                <ListItemButton role={undefined} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            value={value}
                                            className="horario-reabrir"
                                            onChange={handleCheck}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${value}`} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List >
            {
                horariosReabertos.length !== 0 && (
                    <Alert severity="warning">
                        Esses horários já foram reabertos
                        {
                            horariosReabertos.map((item, index) => {
                                return (
                                    <Typography key={index}>
                                        {item.horario} - {item.quemReabriu}
                                    </Typography>
                                )
                            })
                        }
                    </Alert>
                )
            }
            <Button variant="contained" size="small" onClick={reabrirHorarios}>Reabrir Horarios</Button>

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

export default ReabrirHorarios