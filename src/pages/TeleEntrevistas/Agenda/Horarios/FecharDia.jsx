import { Button, FormControl, InputLabel, Paper, Select, TextField, Typography, MenuItem } from "@mui/material"
import Axios from "axios"
import { useState } from "react"
import Toast from "../../../../components/Toast/Toast"

const FecharDia = ({ responsaveis }) => {

    const [data, setData] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleFecharDia = async () => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/fecharDia`, { data: data, responsavel: responsavel }, { withCredentials: true })

            if (result.status === 200) {
                setMessage('Dia fechado com sucesso!')
                setSeverity("success")
                setToastOpen(true)
                setData('')
                setResponsavel('')
            }

        } catch (error) {
            setMessage('Erro ao fechar dia!')
            setSeverity("error")
            setToastOpen(true)
        }
    }

    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '10px' }} >
            <Typography variant='h6' m={1}>
                Fechar Dia
            </Typography>
            <FormControl style={{ minWidth: '150px', marginRight: '20px' }} size='small'>
                <InputLabel id="responsavel">Responsável</InputLabel>
                <Select
                    labelId='responsavel'
                    id="select-responsavel"
                    label='Responsável'
                    value={responsavel}
                    onChange={e => setResponsavel(e.target.value)}
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
            <TextField style={{ marginRight: '20px' }} size="small" type='date' onChange={e => setData(e.target.value)} value={data} label='Dia' focused />
            <Button variant="contained" onClick={handleFecharDia} >Fechar Dia</Button>
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

export default FecharDia