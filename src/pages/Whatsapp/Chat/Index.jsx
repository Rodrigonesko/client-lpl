import { Badge, Box, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { ChatProvider } from "./ChatContext";
import WhatsappSenders from "./WhatsappSenders";
import { Close, PersonAdd, Search } from "@mui/icons-material";
import Chat from "./Chat";
import Contacts from "./Contacts";

const WhatsappChat = () => {
    return (
        <Sidebar>
            <ChatProvider>
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
                            }}
                        >
                            <WhatsappSenders />
                            <IconButton>
                                <PersonAdd />
                            </IconButton>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                placeholder="Pesquisar"
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <Search sx={{ mr: 1 }} />
                                    ),
                                    endAdornment: (
                                        <Close />
                                    )
                                }}
                            />
                        </Box>
                        <Contacts />
                    </Box>
                    <Chat />
                </Box>
            </ChatProvider>
        </Sidebar>
    )
}

export default WhatsappChat;