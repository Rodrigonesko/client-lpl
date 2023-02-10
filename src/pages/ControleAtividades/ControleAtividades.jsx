import React, {useState, useEffect} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Container, Box, Typography } from '@mui/material'
import TabelaCelulas from './TabelaCelulas'
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
                    <Typography variant='h5'>
                        Atividade atual: Callback
                    </Typography>
                </Box>
                <Box>
                  <TabelaCelulas />
                </Box>
            </Container>
        </>
    )
}

export default ControleAtividades
