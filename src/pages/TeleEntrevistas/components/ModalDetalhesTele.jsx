import { Close } from "@mui/icons-material";
import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@mui/material"
import { forwardRef, useState } from "react"
import ProtDetalhesTele from "../../PrototipoTele/ProtDetalhesTele/ProtDetalhesTele";
import { grey } from "@mui/material/colors";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDetalhesTele = ({ cpfTitular, setFlushHook, openDialog, setOpenDialog }) => {
    return (
        <>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullScreen
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: grey[500] }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                setOpenDialog(false)
                            }}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <ProtDetalhesTele
                    key={cpfTitular}
                    cpfTitular={cpfTitular}
                    atualizarTabela={() => setFlushHook(prev => !prev)}
                    atualizarPesquisa={() => setFlushHook(prev => !prev)}
                    pesquisa={() => setFlushHook(prev => !prev)}
                />
            </Dialog>
        </>

    )
}

export default ModalDetalhesTele