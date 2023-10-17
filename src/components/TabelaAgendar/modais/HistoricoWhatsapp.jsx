import { Box, Button, Divider, Popover, Tooltip, Typography } from "@mui/material"
import HistoryIcon from '@mui/icons-material/History';
import { useState } from "react";


const HistoricoWhatsapp = ({ historico }) => {


    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Tooltip title='Historico whatsapp'>
                <Button color="warning" variant="contained" onClick={handleClick} style={{ marginLeft: '10px' }} ><HistoryIcon /></Button>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box p={2} >
                    {
                        historico?.map(whatsapp => {
                            return (
                                <>
                                    <Typography m={1}>
                                        {whatsapp}
                                    </Typography>
                                    <Divider />
                                </>
                            )
                        })
                    }
                </Box>
            </Popover>
        </>
    )
}

export default HistoricoWhatsapp