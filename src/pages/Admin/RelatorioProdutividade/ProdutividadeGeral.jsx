import { Box, TextField, Button, Tooltip } from "@mui/material"
import { useState } from "react"
import { BsSearch } from 'react-icons/bs'
import ProdutividadeGeralTele from "./Tele/ProdutividadeGeralTele"

const ProdutividadeGeral = ({ celula }) => {

    const [mes, setMes] = useState('')
    const [openCompenent, setOpenComponent] = useState(false)

    const handleChange = (e) => {
        setOpenComponent(false)
        setMes(e.target.value)
    }

    const renderComponent = () => {
        setOpenComponent(true)
    }

    return (
        <Box>
            <Box display='flex' m={1}>
                <TextField type='month' size="small" value={mes} onChange={handleChange} />
                <Tooltip title='Buscar'>
                    <Button onClick={renderComponent} sx={{ ml: '10px' }} variant="contained" ><BsSearch /></Button>
                </Tooltip>
            </Box>
            {
                openCompenent && celula === 'Tele Entrevista' && (
                    <ProdutividadeGeralTele mes={mes} />
                )
            }
        </Box>
    )

}

export default ProdutividadeGeral