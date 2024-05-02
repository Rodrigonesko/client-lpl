import { useContext } from "react";
import { PropostasContext } from "../context";
import { Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material";

const FiltrosUrgenciaEmergencia = () => {

    const { setStatusUe, statusUe } = useContext(PropostasContext);

    return (
        <>
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 'bold',
                }}
            >
                Status
            </Typography>
            <FormControl>
                <FormControlLabel control={<Checkbox />} checked={
                    statusUe.includes('Andamento')
                } label="Andamento" onChange={(e) => {
                    if (e.target.checked) {
                        setStatusUe([...statusUe, 'Andamento'])
                    } else {
                        setStatusUe(statusUe.filter(status => status !== 'Andamento'))
                    }
                }} />
                <FormControlLabel control={<Checkbox />} checked={
                    statusUe.includes('Agendado')
                } label="Agendado" onChange={(e) => {
                    if (e.target.checked) {
                        setStatusUe([...statusUe, 'Agendado'])
                    } else {
                        setStatusUe(statusUe.filter(status => status !== 'Agendado'))
                    }
                }} />
            </FormControl>
        </>
    )
}

export default FiltrosUrgenciaEmergencia