import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Box, Chip, IconButton, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import { colorStatusRsdBradesco } from "../utils/types"
import CollapseProtocolos from "./CollapseProtocolos"

const Pacotes = ({ pacote, setPacotes }) => {

    const [openRow, setOpenRow] = useState(false)

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setOpenRow(!openRow)
                        }}
                    >
                        <Tooltip title='Detalhes'>
                            {openRow ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </Tooltip>
                    </IconButton>
                </TableCell>
                <TableCell>{pacote.codigo}</TableCell>
                <TableCell>{pacote.responsavel}</TableCell>
                <TableCell
                    align="center"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Chip
                            label={pacote.status}
                            sx={{
                                color: 'white',
                                backgroundColor: colorStatusRsdBradesco[pacote.status],
                            }}
                            size="small"
                        />
                    </Box>
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
            <CollapseProtocolos protocolo={pacote.protocolos} openRow={openRow} />
        </>
    )
}

export default Pacotes