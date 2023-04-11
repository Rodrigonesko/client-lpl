import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const EntrevistaQualidade = ({ entrevistaQualidade, setEntrevistaQualidade }) => {

    const handleChange = async () => {
        setEntrevistaQualidade(!entrevistaQualidade)
    }

    return (
        <FormGroup>
            <FormControlLabel onChange={handleChange} control={<Checkbox />} label="Entrevista de Qualidade" />
        </FormGroup>
    )
}

export default EntrevistaQualidade