import { Chip, FormControl, InputLabel, MenuItem, Select, TableCell, TableRow, Typography } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import PopoverTelefone from "./PopoverTelefone"
import Toast from "../../../../../components/Toast/Toast"
import { updatePropostaEntrevista } from "../../../../../_services/teleEntrevistaV2.service"
import MenuOpcoes from "./MenuOpcoes"

const LinhaTele = ({ proposta, setRefresh }) => {

    const [data, setData] = useState(proposta || {})
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [tentativas, setTentativas] = useState(0)



    useEffect(() => {
        const countTentativas = () => {
            let count = 0
            if (data.contato1) count++
            if (data.contato2) count++
            if (data.contato3) count++
            return count
        }
        setTentativas(countTentativas())
    }, [data])

    return (
        <TableRow>
            <TableCell>
                {moment(data.vigencia).format('DD/MM/YYYY')}
                <Typography
                    variant="body2"
                    color="textSecondary"
                >
                    {data.vigenciaAmil}
                </Typography>
            </TableCell>
            <TableCell>
                {data.proposta}
                <Typography
                    variant="body2"
                    color="textSecondary"
                >
                    {data.tipoContrato}
                </Typography>
            </TableCell>
            <TableCell>
                {data.nome}
                <Typography
                    variant="body2"
                    color="textSecondary"
                >
                    {data.cpf} | {data.cpfTitular}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography
                    variant="body2"
                >
                    {data.dataNascimento}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                >
                    {data.idade}
                </Typography>
            </TableCell>
            <TableCell>
                <FormControl size="small">
                    <InputLabel>Sexo</InputLabel>
                    <Select
                        value={data.sexo}
                        label="Sexo"
                        onChange={async (e) => {
                            try {
                                await updatePropostaEntrevista({ _id: data._id, sexo: e.target.value })
                                setData({ ...data, sexo: e.target.value })
                                setOpenToast(true)
                                setMessage('Salvo com sucesso')
                                setSeverity('success')
                            } catch (error) {
                                console.log(error)
                                setOpenToast(true)
                                setMessage('Erro ao salvar')
                                setSeverity('error')
                            }
                        }}
                    >
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="F">F</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                {data.telefone}
                <PopoverTelefone
                    proposta={data}
                    setProposta={setData}
                    setMessage={setMessage}
                    setOpenToast={setOpenToast}
                    setSeverity={setSeverity}
                />
            </TableCell>
            <TableCell>
                <Chip
                    label={tentativas}
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                    size="small"
                />
            </TableCell>
            <TableCell>
                <MenuOpcoes
                    proposta={data}
                    setProposta={setData}
                    setMessage={setMessage}
                    setOpenToast={setOpenToast}
                    setSeverity={setSeverity}
                    setRefresh={setRefresh}
                />
            </TableCell>
            <Toast
                open={openToast}
                message={message}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />
        </TableRow>
    )
}

export default LinhaTele