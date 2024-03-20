import { IconButton, Tooltip } from "@mui/material"
import { useState } from "react"
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';

const ModalConcluidos = ({ item }) => {

    return (
        <>
            <Tooltip title='Em aberto'>
                <IconButton href={`/rsd/FichaBeneficiario/${item.mo}`} color='inherit' ><HourglassBottomOutlinedIcon /></IconButton>
            </Tooltip>
            <Tooltip title='Concluidos'>
                <IconButton href={`/rsd/FichaBeneficiarioConcluidos/${item.mo}`} color='success' ><DoneOutlinedIcon /></IconButton>
            </Tooltip>
        </>
    )

}

export default ModalConcluidos