import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { getAllWhatsappNumbers } from "../../../_services/whatsapp.service"
import { ChatContext } from "./ChatContext"

const WhatsappSenders = () => {

    const { setWhatsappSender, whatsappSender } = useContext(ChatContext)

    const [whatsappSenders, setWhatsappSenders] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const result = await getAllWhatsappNumbers()
            console.log(result);
            setWhatsappSenders(result)
        }

        fetch()
    }, [])

    return (
        <FormControl
            sx={{
                m: 1,
                minWidth: '25ch',
            }}
        >
            <InputLabel id="whatsapp-senders-label">Números</InputLabel>
            <Select
                labelId="whatsapp-senders-label"
                id="whatsapp-senders"
                label="Números"
                value={whatsappSender}
                onChange={(e) => setWhatsappSender(e.target.value)}
                sx={{ borderRadius: '10px' }} // Adicione esta linha
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {whatsappSenders.map((sender, index) => (
                    <MenuItem
                        key={index}
                        value={sender.numero}
                    >
                        {sender.numero} ({sender.nome})
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default WhatsappSenders