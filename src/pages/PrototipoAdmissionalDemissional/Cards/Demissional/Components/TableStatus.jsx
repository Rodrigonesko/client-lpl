import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { setarStatus } from "../../../../../_services/admissaoDemissao.service"
import { useState } from "react"

const TableStatus = ({ item, user, setFlushHook, setUser }) => {

    const [status, setStatus] = useState(item.status)

    const handleChangeStatus = async (_id, status, id) => {
        try {
            const resultado = await setarStatus({
                _id: _id, status: status, id: id, tipoExame: 'demissao'
            })
            setUser(resultado)
            console.log(_id, status, id)
        } catch (error) {
            console.error('Erro no Update das Observações:', error);
        }
        setFlushHook(true)
    }

    return (
        <FormControl sx={{ minWidth: 150 }} size='small'>
            <InputLabel id='Status'>Status</InputLabel>
            <Select
                value={status}
                labelId="Status"
                id='Status'
                label='Status'
                onChange={(e) => {
                    handleChangeStatus(user._id, e.target.value, item.id)
                    setStatus(e.target.value)
                }}
                // onBlur={() => {
                //     handleChangeStatus(user._id, status, item.id)
                // }}
                sx={{ borderRadius: '10px' }}
            >
                <MenuItem value={'naoSeAplica'}>N/A</MenuItem>
                <MenuItem value={'pendente'}>PENDENTE</MenuItem>
                <MenuItem value={'emAndamento'}>EM ANDAMENTO</MenuItem>
                <MenuItem value={'concluido'}>CONCLUIDO</MenuItem>
            </Select>
        </FormControl>
    )
}

export default TableStatus