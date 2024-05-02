import { useContext } from "react";
import { PropostasContext } from "../context";
import { Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material";

const FiltrosRn = () => {

    const { setStatusRn, statusRn } = useContext(PropostasContext);

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
                    statusRn.includes('Em andamento')
                } label="Em andamento" onChange={(e) => {
                    if (e.target.checked) {
                        setStatusRn([...statusRn, 'Em andamento'])
                    } else {
                        setStatusRn(statusRn.filter(status => status !== 'Em andamento'))
                    }
                }} />
                <FormControlLabel control={<Checkbox />} checked={
                    statusRn.includes('Agendado')
                } label="Agendado" onChange={(e) => {
                    if (e.target.checked) {
                        setStatusRn([...statusRn, 'Agendado'])
                    } else {
                        setStatusRn(statusRn.filter(status => status !== 'Agendado'))
                    }
                }} />
            </FormControl>
        </>
    )
}

export default FiltrosRn