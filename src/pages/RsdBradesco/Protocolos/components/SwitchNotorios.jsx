import { useState } from "react";
import { updatePedido } from "../../../../_services/rsdBradesco.service";
import { FormControlLabel, Switch } from "@mui/material";

const SwitchNotorios = ({ pedido }) => {

    const [notorio, setNotorio] = useState(pedido.notorio)

    const handleChange = async (e) => {
        setNotorio(e.target.checked)
        await updatePedido(pedido._id, { notorio: e.target.checked })
    }

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={notorio}
                    onChange={handleChange}
                    name="notorios"
                    color="primary"
                />
            }
            label="Notórios"
        />
    );
}

export default SwitchNotorios;