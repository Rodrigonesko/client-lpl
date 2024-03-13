import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"

const AdicionarAgenda = ({ user, setNome, setQuantidadeRepeticao, setDataInicio, setDescricao, createAgenda }) => {

    const [open, setOpen] = useState(false)

    const handleOpen = async () => {
        setOpen(true)
    }

    const handleClose = async () => {
        setOpen(false)
    }

    return (
        <Box>
            <Button type='button' variant='contained' onClick={handleOpen} sx={{ borderRadius: '10px' }} >Adicionar Agenda</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Adicionar Agenda:"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}
                        >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={user}
                                onChange={(event, item) => {
                                    setNome(item.name)
                                }}
                                getOptionLabel={user => user.name}
                                sx={{ width: '300px' }}
                                renderInput={(params) => <TextField {...params} label="Nome" margin='normal' size='small' />}
                            />
                            <FormControl sx={{ minWidth: 150 }}
                                margin='normal'
                                size='small'
                            >
                                <InputLabel id='QuantidadeDeRepetição'>Quantidade de Repetição</InputLabel>
                                <Select
                                    // value={}
                                    labelId="Quantidade De Repetição"
                                    id='QuantidadeDeRepetição'
                                    label='Quantidade De Repetição'
                                    onChange={(e) => { setQuantidadeRepeticao(e.target.value) }}
                                    sx={{ borderRadius: '10px' }}
                                >
                                    <MenuItem value={'diario'}>DIARIO</MenuItem>
                                    <MenuItem value={'semanal'}>SEMANAL</MenuItem>
                                    <MenuItem value={'quinzenal'}>QUINZENAL</MenuItem>
                                    <MenuItem value={'mensal'}>MENSAL</MenuItem>
                                    <MenuItem value={'trimestral'}>TRIMESTRAL</MenuItem>
                                    <MenuItem value={'semestral'}>SEMESTRAL</MenuItem>
                                    <MenuItem value={'anual'}>ANUAL</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField type='date' label='Data Início' size='small' margin='normal' onBlur={(e) => { setDataInicio(e.target.value) }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px',
                                    }
                                }}
                            />
                            <TextField type='text' label='Descrição' multiline size='small' margin='normal' onBlur={(e) => { setDescricao(e.target.value) }}
                                InputProps={{
                                    style: {
                                        borderRadius: '10px',
                                    }
                                }}
                            />
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Fechar</Button>
                    <Button onClick={createAgenda} color='success' autoFocus>Criar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AdicionarAgenda