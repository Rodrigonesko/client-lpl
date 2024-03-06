import { TextField } from "@mui/material"
import { updateObs } from "../../../../../_services/admissaoDemissao.service";
import { useState } from "react";

const TableObs = ({ item, user, setFlushHook, setUser }) => {

    const [obs, setObs] = useState(item.obs)

    const ativarObs = async (_id, obs, id) => {
        try {
            const result = await updateObs({
                _id: user._id, obs: obs, id: id, tipoExame: 'admissao'
            });
            setUser(result)
            console.log(_id, obs, id);
        } catch (error) {
            console.error('Erro no Update das Observações:', error);
        }
        setFlushHook(true)
    }

    return (
        <TextField
            value={obs}
            size='small'
            type='text'
            label='Obs'
            onChange={(e) => {
                setObs(e.target.value)
            }}
            onBlur={() => {
                ativarObs(user._id, obs, item.id)
            }}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                style: {
                    borderRadius: '10px'
                }
            }}
        />
    )
}

export default TableObs