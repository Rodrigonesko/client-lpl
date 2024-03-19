import { Box, IconButton } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { ChatContext } from "./ChatContext";
import WhatsappSenders from "./WhatsappSenders";
import { PersonAdd } from "@mui/icons-material";
import Chat from "./Chat";
import Contacts from "./Contacts";
import { useContext } from "react";
import ResponsavelConversa from "./ResponsavelConversa";

const WhatsappChat = () => {

    const { whatsappReceiver } = useContext(ChatContext)

    return (
        <Sidebar>
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    p: 2,
                    width: '100%',
                    height: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        height: '100%',
                        p: 2,
                        borderRight: '1px solid #f0f0f0',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #f0f0f0',
                            maxWidth: '400px',
                            flexDirection: 'column',
                        }}
                    >
                        <WhatsappSenders />
                        <ResponsavelConversa />
                    </Box>
                    <Contacts />
                </Box>
                <Chat key={whatsappReceiver.whatsapp} />
            </Box>
        </Sidebar>
    )
}

export default WhatsappChat;