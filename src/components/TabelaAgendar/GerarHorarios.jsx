import React, { useState } from "react";
import { Box, TextField, Button, Modal, Typography } from "@mui/material";
import Axios from 'axios'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};


const GerarHorarios = () => {

    const [data, setData] = useState('')
    const [msg, setMsg] = useState('')
    const [modal, setModal] = useState(false)

    const gerarHorarios = async () => {
        try {

            if(data === ''){
                setMsg('Por favor selecione uma data')
                setModal(true)
                return
            }

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/gerarHorarios`, { dataGerar: data }, { withCredentials: true })

            if (result.status === 200) {
                setModal(true)
                setMsg('Horario gerados com sucesso!')
            }
        } catch (error) {
            console.log(error);
            setModal(true)
            setMsg('Horarios ja gerados para o dia escolhido!')
        }
    }

    return (
        <Box display='flex' justifyContent='center' alignItems='center' m={2}>
            <TextField label='Gerar horarios' size='small' type='date' InputLabelProps={{
                shrink: true,
            }} onChange={e => setData(e.target.value)} />
            <Button onClick={gerarHorarios} variant='contained'>Gerar</Button>
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                        <Typography variant='h5'>
                            {msg}
                        </Typography>
                        <Typography variant="body2" display='flex' justifyContent='space-around' width='100%' margin='1rem'>
                            <Button variant='contained' onClick={() => setModal(false)}>Ok</Button>
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default GerarHorarios
