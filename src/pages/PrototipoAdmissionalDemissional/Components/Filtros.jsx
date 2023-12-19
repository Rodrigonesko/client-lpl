import { CheckBox } from '@mui/icons-material'
import { Box, Button, Divider, FormControlLabel, FormGroup, Typography } from '@mui/material'

const Filtros = () => {

    return (
        <>
            <Box m={2}>
                <h3>Filtros</h3>
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button variant='contained'>Filtrar</Button>
                    <Button variant='contained'>Limpar</Button>
                </Box>
                <br />
                <Divider />
                <br />
                <Typography>
                    <strong>Responsaveis</strong>
                </Typography>
                <br />
                <FormGroup>
                    <FormControlLabel control={<CheckBox defaultChecked />} label='Samantha Maciel Giazzon' />
                    <FormControlLabel control={<CheckBox />} label='admin' />
                    <FormControlLabel control={<CheckBox />} label='Rodrigo Dias' />
                    <FormControlLabel control={<CheckBox />} label='Gerson Douglas' />
                </FormGroup>
            </Box>
        </>
    )
}

export default Filtros