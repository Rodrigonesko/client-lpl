import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"
import { FaPlus } from 'react-icons/fa'

const ModalAdicionarPolitica = () => {

    const [open ,setOpen] = useState(false)

    return (
        <>
            <Button variant="contained"><FaPlus /></Button>
        </>
    )
}

export default ModalAdicionarPolitica