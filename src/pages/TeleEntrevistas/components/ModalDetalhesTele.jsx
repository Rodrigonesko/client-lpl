import { Close } from "@mui/icons-material";
import { AppBar, Dialog, IconButton, Slide, Toolbar } from "@mui/material"
import { forwardRef, useState } from "react"
import ProtDetalhesTele from "../../PrototipoTele/ProtDetalhesTele/ProtDetalhesTele";
import { grey } from "@mui/material/colors";
import { PropostaService } from "../../../_services/teleEntrevistaV2.service";
const propostaService = new PropostaService()

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDetalhesTele = ({ cpfTitular, setFlushHook, openDialog, setOpenDialog }) => {

    const handleClose = async () => {
        setOpenDialog(false)
        await propostaService.saiuDaProposta(cpfTitular)
    }

    return (
        <>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                fullScreen
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: grey[500] }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
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