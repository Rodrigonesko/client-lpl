import React from 'react'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import { Box, Paper, TextField, Typography, FormGroup, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio, MenuItem, Select, InputLabel } from '@mui/material'

const ProcessamentoElegibilidade = ({
    proposta
}) => {
    return (
        <Box component={Paper} elevation={3} p={2} mt={1}>
            <Typography variant='h6'>
                Análise
            </Typography>
            <Box>
                <Box display='flex' flexDirection='column'>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Sisamil de Acordo com a Proposta?" labelPlacement="start" />
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Contrato</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="600" control={<Radio />} label="600" />
                            <FormControlLabel value="118" control={<Radio />} label="118" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl style={{ minWidth: '100px' }} size='small'>
                        <InputLabel id="demo-simple-select-label">PRC</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="PRC"
                        >
                            <MenuItem>
                                <em>PRC</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Plano Anterior?" labelPlacement="start" />
                    <FormControl>
                        <InputLabel>Comprovação Documento</InputLabel>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Ligação" labelPlacement="start" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Site" labelPlacement="start" />
                    </FormControl>
                </Box>
                <Box>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Documento de Identificação" labelPlacement="start" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Declaração Associado ou Carteirinha" labelPlacement="start" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Tipo de Vinculo" labelPlacement="start" />
                        <FormControl style={{ minWidth: '150px' }} size='small'>
                            <InputLabel id="demo-simple-select-label">Tipo de Vinculo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Tipo de Vinculo"
                            >
                                <MenuItem>
                                    <em>Tipo de Vinculo</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Plano Amil" labelPlacement="start" />
                        <Box>
                            <TextField type='date' focused label='Data inicio' />
                            <TextField type='date' focused label='Data Fim' />
                            <TextField focused label='Custo' />
                        </Box>
                    </FormGroup>
                </Box>
            </Box>
        </Box>
    )
}

export default ProcessamentoElegibilidade