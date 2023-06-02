import React from "react";
import { Typography } from "@mui/material";

const TextColor = ({ text, condition, Primary, Secundary }) => {

    return (
        <Typography variant='body2' style={{ color: condition ? Primary : Secundary }} >{text}</Typography>
    )
}

export default TextColor