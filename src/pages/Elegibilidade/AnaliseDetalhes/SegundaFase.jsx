import React, { useState } from "react";
import { Box, Paper, Button, Typography, IconButton, } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SegundaFase = () => {

    const [open, setOpen] = useState(false)


    // const handleClick = () => {
    //     setShowFase1(!showFase1);
    // };

    return (
        <Box component={Paper} p={2} mt={3} elevation={3}>
            <Box display='flex' alignContent='center' justifyContent='space-between' bgcolor='lightgray' borderRadius='5px' p={1}>
                <Typography>
                    2° Fase
                </Typography>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                        setOpen(!open)
                        // handleClick()
                    }}
                    disabled
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </Box>
        </Box>
    )
}

export default SegundaFase