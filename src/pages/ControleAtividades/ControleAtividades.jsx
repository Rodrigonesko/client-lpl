import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Container, Box, Typography } from '@mui/material'
import TabelaCelulas from './TabelaCelulas'
import GridHorarios from './GridHorarios'
import Axios from 'axios'

const ControleAtividades = () => {

    return (
        <>
            <Sidebar />
            <Container>
                <Box m={2}>
                    <Typography variant='h5'>
                        Atividade Principal: Elegibilidade
                    </Typography>
                </Box>
                <br />
                  <TabelaCelulas />
            </Container>
        </>
    )
}

export default ControleAtividades
