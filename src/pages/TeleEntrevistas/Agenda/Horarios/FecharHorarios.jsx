import { FormControl, InputLabel, Paper, Select, Typography, MenuItem, TextField, List, ListItem, ListItemButton, ListItemIcon, Checkbox, Button, ListItemText, Box } from "@mui/material"
import Axios from "axios"
import { useContext, useEffect, useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import AuthContext from "../../../../context/AuthContext"

const FecharHorarios = ({ responsaveis }) => {

    const { name } = useContext(AuthContext)

    const [data, setData] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [horariosDisponiveis, setHorarioDisponiveis] = useState([])
    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [justificativa, setJustificativa] = useState('')

    const buscarHorariosDisponiveis = async (data) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarHorariosDisponiveis/${responsavel}/${data}`, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setHorarioDisponiveis(result.data.horarios)
        } catch (error) {
            console.log(error);
        }
    }

    const handleFecharHorarios = async () => {


        if (name !== 'Administrador' && name !== "Rodrigo Onesko Dias" && name !== "Bruna Tomazoni" && name !== "Luciana Tavares" && name !== "Claudia Rieth" && name !== "Leonardo Lonque") {
            setMessage('Você não tem permissão para realizar essa ação!')
            setSeverity("error")
            setToastOpen(true)
            return
        }

        if (data === '' || responsavel === '' || justificativa === '') {
            setMessage('Preencha todos os campos!')
            setSeverity("error")
            setToastOpen(true)
            return
        }

        try {
            let horariosArr = document.getElementsByClassName('horarios-disponiveis')
            let values = Object.values(horariosArr).map(e => {
                if (e.firstChild.checked) {
                    return e.firstChild.value
                }
                return null
            })
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/fecharHorarios`, { data: data, responsavel: responsavel, horarios: values, justificativa }, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (result.status === 200) {
                setMessage('Horarios fechados com sucesso!')
                setSeverity("success")
                setToastOpen(true)
                setData('')
                setResponsavel('')
                setJustificativa('')
                setHorarioDisponiveis([])
            }
        } catch (error) {
            console.log(error)
            setMessage(error.response.data.message)
            setSeverity("error")
            setToastOpen(true)
        }
    }

    useEffect(() => {
        buscarHorariosDisponiveis(data, responsavel);
    }, [data, responsavel]);

    return (
        <Paper style={{ padding: '20px', margin: '10px' }} elevation={3}>
            <Typography variant='h6' m={1}>
                Fechar Horários
            </Typography>
            <FormControl style={{ minWidth: '150px', marginRight: '20px' }} size='small'>
                <InputLabel id="responsavel-fechar-horario">Responsável</InputLabel>
                <Select
                    labelId='responsavel-fechar-horario'
                    id="select-responsavel-fechar-horario"
                    label='Responsável'
                    onChange={e => {
                        setResponsavel(e.target.value)
                    }}
                    value={responsavel}
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
                buscarHorariosDisponiveis(e.target.value)
            }} label='Dia' focused value={data} />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
                {
                    horariosDisponiveis.sort().map(value => {
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
                                            className="horarios-disponiveis"
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${value}`} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List >
            <Box
                display='flex'
                mt={2}
            >
                <Button variant="contained" size="small" onClick={handleFecharHorarios} >Fechar Horarios</Button>
                <TextField
                    size="small"
                    label='Justificativa'
                    value={justificativa}
                    onChange={e => setJustificativa(e.target.value)}
                    sx={{
                        marginLeft: '20px',
                        width: '300px'
                    }}
                />
            </Box>
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

export default FecharHorarios