import { Badge, Box, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { ChatProvider } from "./ChatContext";
import WhatsappSenders from "./WhatsappSenders";
import { Close, PersonAdd, Search } from "@mui/icons-material";
import Chat from "./Chat";

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
                        <Box>
                            <List>
                                <ListItemButton
                                    sx={{
                                        borderRadius: '10px',
                                        p: 1,
                                    }}
                                >
                                    <ListItem
                                        sx={{
                                            borderRadius: '10px',
                                            p: 1,
                                        }}
                                    >
                                        <ListItemText primary="Primary" secondary="Secondary" />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                10:00
                                            </Typography>
                                            <Badge sx={{ m: 1 }} badgeContent={4} color="primary" />
                                        </Box>
                                    </ListItem>
                                </ListItemButton>
                                <ListItemButton
                                    sx={{
                                        borderRadius: '10px',
                                        p: 1,
                                    }}
                                >
                                    <ListItem
                                        sx={{
                                            borderRadius: '10px',
                                            p: 1,
                                        }}
                                    >
                                        <ListItemText primary="Primary" secondary="Secondary" />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                10:00
                                            </Typography>
                                            <Badge sx={{ m: 1 }} badgeContent={4} color="primary" />
                                        </Box>
                                    </ListItem>
                                </ListItemButton>
                            </List>
                        </Box>
                    </Box>
                    <Box>
                        {/* Chat */}

                    </Box>
                </Box>
            </ChatProvider>
        </Sidebar>
    )
}

export default WhatsappChat;