import React from 'react';
import { Box, Card, CardContent } from "@mui/material";
import Filtros from '../../Components/Admissional/Filtros';
import { grey } from '@mui/material/colors';

const CardFiltrosAdmissional = () => {

    const color = grey[300]

    return (
        <>
            <Card sx={{ bgcolor: color, width: '350px', mb: `20px`, borderRadius: `10px`, padding: '0' }}>
                <CardContent sx={{ padding: '0' }} >
                    <Box width={'100%'}>
                        <Filtros />
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default CardFiltrosAdmissional;
