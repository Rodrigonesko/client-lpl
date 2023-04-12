import React, { useState } from 'react'
import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, Box, Paper } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AbcIcon from '@mui/icons-material/Abc';

const NestedList = ({ onde, pergunta, palavra, sugestoes, plural }) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };


    return (
        <Box component={Paper} elevation={3} p={3} m={2}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Onde: {onde}
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    <ListItemIcon>
                        <QuestionMarkIcon color='info' />
                    </ListItemIcon>
                    <ListItemText primary={`Pergunta: ${pergunta}`} />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <DangerousIcon color='error' />
                    </ListItemIcon>
                    <ListItemText primary={`Palavra: ${palavra}`} />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <ContactSupportIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sugestões" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            sugestoes ? (sugestoes.map(sugestao => {
                                return (
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary={sugestao} />
                                    </ListItemButton>
                                )
                            })) : null
                        }

                    </List>
                </Collapse>
                <ListItemButton>
                    <ListItemIcon>
                        <AbcIcon />
                    </ListItemIcon>
                    <ListItemText primary={`Plural? ${plural ? 'Sim' : 'Não'}`} />
                </ListItemButton>
            </List>
        </Box>
    )
}

export default NestedList