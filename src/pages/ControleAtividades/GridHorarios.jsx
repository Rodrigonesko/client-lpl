import React from 'react'
import { Grid, Paper, Box, Card, CardContent, Button, Typography } from '@mui/material'

const atividades = [
    'Gerencia',
    'Sistemas',
    'Elegibilidade',
    'Liminares',
    'RSD',
    'Sindicancia',
    'Tele Entrevista'
]

const horarios = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00'
]
const GridHorarios = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ sm: 12, md: 16 }}>
                {horarios.map((horario, index) => (
                    <Grid xs={2} sm={4} md={4} key={index}>
                        <Card style={{ margin: '20px' }} variant="outlined">
                            <CardContent style={{ textAlign: 'center' }}>
                                <Typography variant="h5" component="div">
                                    {horario}
                                </Typography>
                                <Typography variant="body2">
                                    <select style={{ width: 'auto', padding: '4px', borderRadius: '4px', }}>
                                        {
                                            atividades.map(e => {
                                                return (
                                                    <option key={e} value={e}>{e}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Paper style={{display: 'flex', justifyContent: 'center', padding: '5px'}}>
                <Button variant='contained'>Salvar</Button>
            </Paper>
        </Box>
    )
}

export default GridHorarios