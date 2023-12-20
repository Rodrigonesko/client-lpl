import React from 'react';
import { Box, Card } from "@mui/material";
import { grey } from '@mui/material/colors';
import Colaboradores from '../../Components/Admissional/Colaboradores';

const CardColaboradoresAdmissional = () => {

    const color = grey[300]

    return (
        <>
            <Card sx={{ bgcolor: color, borderRadius: `10px` }}>
                <Box>
                    <Colaboradores />
                </Box>
            </Card>
        </>
    )
}

export default CardColaboradoresAdmissional;
