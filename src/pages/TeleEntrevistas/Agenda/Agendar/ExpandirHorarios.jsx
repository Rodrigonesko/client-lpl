import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

const ExpandirHorarios = ({ analistasDisponiveis, dia }) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Tooltip title='Expandir Horários'>
                <IconButton onClick={handleClick}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </Tooltip>

            <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    analistasDisponiveis[dia]?.map((item, index) => {
                        return (
                            <Box component={Paper} p={1} mb={1} key={index}>
                                <strong>{item.analista + ': '}</strong>
                                {
                                    item.horarios.map((horario) => {
                                        return <span key={horario} style={{ color: 'gray' }}>{horario} - </span>
                                    })
                                }
                            </Box>
                        )
                    })
                }
            </Collapse>
        </>
    )
}

export default ExpandirHorarios