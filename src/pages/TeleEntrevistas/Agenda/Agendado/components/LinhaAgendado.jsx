import { Chip, FormControl, InputLabel, MenuItem, Select, TableCell, TableRow, Typography } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import MenuOpcoes from "../../Agendar/components/MenuOpcoes"
import { PropostaService } from "../../../../../_services/teleEntrevistaV2.service"
import PopoverTelefone from "../../Agendar/components/PopoverTelefone"

const propostaService = new PropostaService()

const LinhaAgendado = ({
    proposta,
    setRefresh,
    setOpenToast,
    setSeverity,
    setMessage
}) => {

    const [data, setData] = useState(proposta || {})

    return (
        <TableRow>
            <TableCell>
                Tele
            </TableCell>
            <TableCell>
                {moment(data.dataEntrevista).format('DD/MM/YYYY HH:mm')}
            </TableCell>
            <TableCell>
                {data.enfermeiro}
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
                {data.nome} <Chip size="small" label={data.tipoAssociado} color={data.tipoAssociado === 'Titular' ? 'primary' : 'warning'} />
                <Typography
                    variant="body2"
                    color="textSecondary"
                >
                    {data.cpf} | {data.cpfTitular}
                </Typography>
            </TableCell>
            <TableCell>
                {data.dataNascimento}
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
                                await propostaService.update({ _id: data._id, sexo: e.target.value })
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
            <TableCell align="center">
                {data.telefone}
                <PopoverTelefone
                    proposta={data}
                    setProposta={setData}
                    setMessage={setMessage}
                    setOpenToast={setOpenToast}
                    setSeverity={setSeverity}
                />
            </TableCell>
            <TableCell align="center">
                <Chip
                    label={data.tentativasDeContato.length}
                    color="primary"
                />
            </TableCell>
            <TableCell align="center">
                <MenuOpcoes
                    proposta={data}
                    setProposta={setData}
                    setRefresh={setRefresh}
                    setOpenToast={setOpenToast}
                    setSeverity={setSeverity}
                    setMessage={setMessage}
                />
            </TableCell>
            
        </TableRow>
    )
}

export default LinhaAgendado