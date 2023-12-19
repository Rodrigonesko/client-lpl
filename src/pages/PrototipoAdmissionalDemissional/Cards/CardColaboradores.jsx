import React from 'react';
import { Box, Card, Paper } from "@mui/material";
import { grey } from '@mui/material/colors';
import Colaboradores from '../Components/Colaboradores';

const CardColaboradores = () => {

    const color = grey[300]

    return (
        <>
            <Card component={Paper} sx={{ bgcolor: color, borderRadius: `10px` }}>
                <Box width={'100%'}>
                    <Colaboradores />
                </Box>
            </Card>
        </>
    )
}

export default CardColaboradores;
