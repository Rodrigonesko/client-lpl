import { TextField } from "@mui/material";
import { useState } from "react";
import { updateData } from "../../../../../_services/admissaoDemissao.service";

const TableData = ({ item, user, setFlushHook, setUser }) => {

    const [data, setData] = useState(item.data)

    const ativarData = async (_id, data, id) => {
        try {
            const result = await updateData({
                _id: user._id, data: data, id: id, tipoExame: 'admissao'
            });
            setUser(result)
            console.log(_id, data, id);
        } catch (error) {
            console.error('Erro no update da Data:', error);
        }
        setFlushHook(true)
    }

    return (
        <TextField
            value={data}
            type='date'
            margin='dense'
            size='small'
            label='Data'
            onChange={(e) => setData(e.target.value)}
            onBlur={() => {
                ativarData(user._id, data, item.id)
            }}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                style: {
                    borderRadius: '10px'
                }
            }} />
    )
}

export default TableData