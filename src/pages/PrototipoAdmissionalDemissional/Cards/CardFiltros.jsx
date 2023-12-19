import React from 'react';
import { Box, Card, CardContent } from "@mui/material";
import Filtros from '../Components/Filtros';
import { grey } from '@mui/material/colors';

const CardFiltros = () => {

    const color = grey[300]

    return (
        <>
            <Card sx={{ bgcolor: color, minWidth: 275, width: '360px', mb: `20px`, borderRadius: `10px`, padding: '0' }}>
                <CardContent sx={{ padding: '0' }} >
                    <Box width={'100%'}>
                        <Filtros />
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default CardFiltros;
