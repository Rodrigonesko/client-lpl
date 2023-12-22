import React from 'react';
import { Box, Card, CardContent } from "@mui/material";
import { grey } from '@mui/material/colors';
import FiltrosDemissional from '../../Components/Demissional/FiltrosDemissional';

const CardFiltrosDemissional = () => {

    const color = grey[300]

    return (
        <>
            <Card sx={{ bgcolor: color, width: '350px', mb: `20px`, borderRadius: `10px`, padding: '0' }}>
                <CardContent sx={{ padding: '0' }} >
                    <Box width={'100%'}>
                        <FiltrosDemissional />
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default CardFiltrosDemissional;
