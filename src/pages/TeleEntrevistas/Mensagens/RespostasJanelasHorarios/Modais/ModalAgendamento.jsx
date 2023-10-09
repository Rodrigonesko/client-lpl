import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

const ModalAgendamentoJanelas = ({ open, setOpen, proposta, nome, janela }) => {

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {proposta} - {nome} - {janela}
            </DialogTitle>
            <DialogContent>
                <Box display='flex' justifyContent='space-around' alignItems='center' m={3}>
                    <FormControl size="small">
                        <InputLabel id="label-dia">Dia</InputLabel>
                        <Select
                            defaultValue=''
                            style={{ minWidth: '100px' }}
                            labelId="label-dia"
                            id="select-doa"
                            label="Dia"
                            onChange={e => {
                                buscarHorarios(e.target.value)
                                setDataEntrevista(e.target.value)
                            }}
                        >
                            {
                                datasEntrevista.map(e => {
                                    return (
                                        <MenuItem key={e} value={e}>{e}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl size="small" >
                        <InputLabel id="label-horario">Horário</InputLabel>
                        <Select
                            defaultValue=''
                            style={{ minWidth: '100px' }}
                            labelId="label-horario"
                            id="select-horario"
                            label="Horario"
                            onChange={e => {
                                setHorarioEntrevista(e.target.value)
                                buscarAnalistasDisponiveis(e.target.value)
                            }}
                        >
                            {
                                horariosDisponiveis.map(e => {
                                    return (
                                        <MenuItem key={e} value={e}>{e}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl size="small">
                        <InputLabel id="label-responsavel">Responsável</InputLabel>
                        <Select
                            labelId="label-responsavel"
                            id="select-responsavel"
                            label="Responsável"
                            style={{ minWidth: '140px' }}
                            onChange={e => {
                                setResponsavel(e.target.value)
                            }}
                            defaultValue=''
                        >
                            {
                                responsaveis.map(e => {
                                    return (
                                        <MenuItem key={e} value={e}>{e}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={agendar}>Agendar</Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalAgendamentoJanelas