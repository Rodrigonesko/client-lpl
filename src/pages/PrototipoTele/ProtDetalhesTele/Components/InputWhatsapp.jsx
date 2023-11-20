import { Button, TextField, Tooltip } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import Toast from "../../../../components/Toast/Toast";
import { useState } from "react";
import { alterarWhatsapp } from "../../../../_services/teleEntrevista.service";

const InputWhatsapp = ({ whatsapp, setWhatsapp, _id, setFlushHook, setSelectedWhatsapp }) => {

    const [toastOpen, setToastOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleSave = async () => {

        try {
            if (whatsapp.length !== 23) {
                setMessage('Verifique o número de whatsapp, o mesmo deve conter 24 caracteres. ex: whatsapp:+5541912345678')
                setSeverity('error')
                setToastOpen(true)
                return
            }

            await alterarWhatsapp({
                _id,
                whatsapp
            })

            setMessage('Whatsapp atualizado com sucesso!')
            setSeverity('success')
            setToastOpen(true)
            setSelectedWhatsapp(whatsapp)
            setFlushHook(true)

        } catch (error) {
            setMessage('Não foi possivel alterar o numero de whatsapp')
            setSeverity('error')
            setToastOpen(true) 
        }

    }

    return (
        <>
            <TextField value={whatsapp} onChange={e => setWhatsapp(e.target.value)} label='Whatsapp Atual' size="small" sx={{ width: '80%' }} />
            <Tooltip title='Salvar'>
                <Button onClick={handleSave} color="success" variant="contained" style={{ marginLeft: '10px' }} >
                    <CheckIcon />
                </Button>
            </Tooltip>
            <Toast
                open={toastOpen}
                message={message}
                severity={severity}
                duration={6000}
                onClose={() => setToastOpen(false)}
            />
        </>
    )
}

export default InputWhatsapp