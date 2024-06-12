import { ArrowForward, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Chip, IconButton, TableCell, TableRow, Tooltip } from "@mui/material"
import { useState } from "react"
import { colorStatusRsdBradesco } from "../utils/types"
import CollapseProtocolos from "./CollapseProtocolos"

const Pacotes = ({ pacote, setPacotes }) => {

    const [openRow, setOpenRow] = useState(false)

    return (
        <>
            <TableRow>
                <TableCell align="left" >
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
                <TableCell align="center">{pacote.codigo}</TableCell>
                <TableCell align="center">{pacote.responsavel}</TableCell>
                <TableCell
                    align="center"
                >
                    <Chip
                        label={pacote.status}
                        sx={{
                            color: 'white',
                            backgroundColor: colorStatusRsdBradesco[pacote.status],
                        }}
                        size="small"
                    />
                </TableCell>
                <TableCell
                    align="right"
                >
                    <Tooltip title='Detalhes'>
                        <IconButton size='small' href={`/bradesco/protocolos/${pacote._id}`} >
                            <ArrowForward color="primary" />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <CollapseProtocolos protocolo={pacote.protocolos} openRow={openRow} />
        </>
    )
}

export default Pacotes