import { FormControlLabel, Checkbox, Alert, Snackbar } from "@mui/material"
import { useState } from "react"

const MarcacaoAutista = (props) => {

    const [open, setOpen] = useState(false)

    const handleClick = (e) => {

        if (e.target.checked) {
            setOpen(true)
        }

    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <FormControlLabel onChange={handleClick} control={<Checkbox />} label='Marcação para autismo' />

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant='filled' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Marcação feita com sucesso
                </Alert>
            </Snackbar>

        </>
    )
}

export default MarcacaoAutista