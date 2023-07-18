import { forwardRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Tooltip, Typography } from "@mui/material"
import { BsFillPersonXFill } from 'react-icons/bs'
import { getUsers } from "../../../../_services/user.service";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalFaltouAssinar = ({ id }) => {

    const [open, setOpen] = useState(false);
    const [naoAssinantes, setNaoAssinantes] = useState([])

    const handleClickOpen = () => {
        fetchData()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const analistas = await getUsers()
        let arrAux = []
        console.log(id);
        for (const analista of analistas) {
            const politicasLidas = analista.politicasLidas
            if (politicasLidas.length === 0 || !politicasLidas.some((idPolitica) => idPolitica === id)) {
                arrAux.push(analista.name)
            }
        }

        setNaoAssinantes(arrAux)

    }

    return (
        <>
            <Tooltip title='Falta assinar'>
                <Button variant='contained' onClick={handleClickOpen} sx={{ marginLeft: '4px' }} ><BsFillPersonXFill /></Button>
            </Tooltip>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Quem falta assinar</DialogTitle>
                <DialogContent>
                    {
                        naoAssinantes.map(analista => {
                            return (
                                <Typography m={1} borderBottom='1px solid lightGray'>
                                    {analista}
                                </Typography>
                            )
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalFaltouAssinar