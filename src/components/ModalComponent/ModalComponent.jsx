import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { useState } from "react"

const ModalComponent = ({
    children,
    isButton,
    buttonIcon,
    buttonText,
    buttonColorScheme,
    headerText,
    saveButtonColorScheme,
    onAction,
    size
}) => {

    const [open, setOpen] = useState(false)

    return (
        <>
            {
                isButton ?
                    <Button
                        onClick={() => setOpen(true)}
                        color={buttonColorScheme}
                        variant="outlined"
                        size="small"
                        startIcon={buttonIcon}
                    >
                        {buttonText}
                    </Button>
                    : (
                        <IconButton
                            onClick={() => setOpen(true)}
                            sx={{ margin: '10px' }}
                        >
                            {buttonIcon}
                        </IconButton>
                    )
            }

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth={size || 'md'}
            >
                <DialogTitle>{headerText}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" variant="contained" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button
                        variant="contained"
                        onClick={() => onAction()}
                        sx={{
                            backgroundColor: saveButtonColorScheme || 'primary.main',
                            '&:hover': {
                                backgroundColor: saveButtonColorScheme || 'primary.dark',
                                opacity: 0.8
                            }

                        }}
                    >Salvar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalComponent