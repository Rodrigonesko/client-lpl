import React from 'react';
import { Box, Card } from "@mui/material";
import { grey } from '@mui/material/colors';
import ColaboradoresDemissional from '../../Components/Demissional/ColaboradoresDemissional';

const CardColaboradoresDemissional = () => {

    const color = grey[300]

    return (
        <>
            <Card sx={{ bgcolor: color, borderRadius: `10px` }}>
                <Box>
                    <ColaboradoresDemissional />
                </Box>
            </Card>
        </>
    )
}

export default CardColaboradoresDemissional;
