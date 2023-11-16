import { Box, Button, Divider, IconButton, Paper, Slide, TextField, Tooltip, Typography } from "@mui/material"
import HistoricoWhatsapp from "../../../../components/TabelaAgendar/modais/HistoricoWhatsapp"

import CheckIcon from '@mui/icons-material/Check';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import PanToolIcon from '@mui/icons-material/PanTool';
import { useState } from "react";
import { useEffect } from "react";

const CardConversaTele = ({ open, setOpen, nome, setNome, responsavelAtendimento, setResponsavelAtendimento, selectedWhatsapp, setSelectedWhatsapp }) => {

    const [whatsapp, setWhatsapp] = useState(selectedWhatsapp)

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setWhatsapp(selectedWhatsapp)
    }, [selectedWhatsapp])

    return (
        <Slide direction="left" in={open} unmountOnExit>
            <Box display={!open && 'none'} component={Paper} p={1} m={2} width={'50%'} height={'90%'} >
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h6" m={1}>
                        {nome}
                        <Typography variant="body1">
                            {responsavelAtendimento}
                        </Typography>
                        <Typography variant="body2" color={'gray'}>
                            {selectedWhatsapp}
                        </Typography>
                    </Typography>
                    <IconButton sx={{ position: 'absolute', right: '30px' }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Box m={1}>
                    <TextField value={whatsapp} onChange={e => setWhatsapp(e.target.value)} label='Whatsapp Atual' size="small" sx={{ width: '80%' }} />
                    <Tooltip title='Salvar'>
                        <Button color="success" variant="contained" style={{ marginLeft: '10px' }} >
                            <CheckIcon />
                        </Button>
                    </Tooltip>
                    <Box m={1}>
                        <Tooltip title='Mandar para atendimento humanizado'>
                            <Button color="info" variant="contained" style={{ marginLeft: '10px' }} >
                                <PeopleIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title='Assumir'>
                            <Button color="info" variant="contained" style={{ marginLeft: '10px' }} >
                                <PanToolIcon />
                            </Button>
                        </Tooltip>
                        <HistoricoWhatsapp />
                    </Box>
                </Box>
                <Divider />
                <Box p={1} m={1} height={'50vh'} sx={{ overflowY: 'auto' }}>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>

                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                    <Typography>
                        aa
                    </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} alignContent={'flex-end'} >
                    <TextField placeholder='Mensagem' sx={{ width: '88%' }} size="small" />
                    <Button variant="contained" size="small">Send</Button>
                </Box>
            </Box>
        </Slide >

    )
}

export default CardConversaTele