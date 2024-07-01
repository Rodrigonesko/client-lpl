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
    size,
    textButton
}) => {

    const [open, setOpen] = useState(false)

    return (
        <>
            {
                isButton ?
                    <Button
                        onClick={() => setOpen(true)}
                        startIcon={buttonIcon}
                        variant="contained"
                        sx={{
                            backgroundColor: buttonColorScheme || 'primary.main',
                            '&:hover': {
                                backgroundColor: buttonColorScheme || 'primary.dark',
                                opacity: 0.8
                            },
                            borderRadius: '10px',
                        }}
                    >
                        {buttonText}
                    </Button>
                    : (
                        <IconButton
                            onClick={() => setOpen(true)}
                            sx={{
                                color: buttonColorScheme || 'primary.main',
                            }}
                        >
                            {buttonIcon}
                        </IconButton>
                    )
            }

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth={size || 'md'}
                fullWidth
            >
                <DialogTitle>{headerText}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" variant="contained" onClick={() => setOpen(false)}>Cancelar</Button>
                    {!onAction ? '' :
                        <Button
                            variant="contained"
                            onClick={async () => {
                                await onAction();
                                setOpen(false);
                            }}
                            sx={{
                                backgroundColor: saveButtonColorScheme || 'primary.main',
                                '&:hover': {
                                    backgroundColor: saveButtonColorScheme || 'primary.dark',
                                    opacity: 0.8
                                }

                            }}
                        >{textButton ?? 'Salvar'}</Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalComponent