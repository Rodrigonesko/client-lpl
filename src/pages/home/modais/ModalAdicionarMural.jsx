import { Button } from "@mui/material"
import { useState } from "react";
import { FaPlus } from "react-icons/fa"

const ModalAdicionarMural = () => {

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Button onClick={handleClickOpen} sx={{mb: '20px', p: '10px'}} fullWidth variant='outlined'><FaPlus /></Button>
        </>
    )
}

export default ModalAdicionarMural