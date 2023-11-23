import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Toast from "../../../../components/Toast/Toast";
import { useState } from "react";
import { alterarSexoEntrevista } from "../../../../_services/teleEntrevista.service";

const SelectAlterarSexo = ({ sexo, _id, setFlushHook }) => {

    const [newSexo, setNewSexo] = useState(sexo)
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')

    const handleChangeSexo = async (event) => {
        setNewSexo(event.target.value);
        try {
            await alterarSexoEntrevista({ id: _id, sexo: event.target.value })
            setSeverity('success')
            setMessage('Sexo alterado com sucesso')
            setOpenToast(true)
            setFlushHook(true)
        } catch (error) {
            setSeverity('error')
            setMessage('Algo deu errado')
            setOpenToast(true)
            console.log(error);
        }
    };

    return (
        <>
            <FormControl sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Sexo</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={newSexo}
                    onChange={handleChangeSexo}
                    autoWidth
                    label="Sexo"
                    size="small"
                >
                    <MenuItem value={'M'}>M</MenuItem>
                    <MenuItem value={'F'}>F</MenuItem>
                </Select>
            </FormControl>

            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />
        </>
    )
}

export default SelectAlterarSexo;