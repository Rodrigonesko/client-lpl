import { Button, Typography, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material"
import { useState } from "react"

const MensagemPadraoRn = () => {

    const [open, setOpen] = useState(false)

    return (
        <Box>
            <Typography>
                Mensagem Padrão RN
            </Typography>
            <Button
                onClick={() => setOpen(true)}
            >
                Gerar
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    Mensagem Padrão RN
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris tincidunt dui, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, sollicitudin in volutpat nec, lacinia quis dui. Cras suscipit, risus et mollis placerat, est nisl sagittis felis, vel blandit dui dui in enim. Nullam sit amet erat in lacus semper suscipit. Nulla non odio nibh. Nullam nec odio lectus. Cras lacinia tellus id dui viverra pulvinar. Vestibulum bibendum, nunc ut hendrerit tempus, est dolor lacinia libero, non facilisis arcu erat nec felis. Mauris et enim et turpis dignissim fringilla. Maecenas eu turpis enim. Phasellus vitae purus nec est imperdiet malesuada. Proin eu sollicitudin nisl. Maecenas eu turpis enim. Phasellus vitae purus nec est imperdiet malesuada. Proin eu sollicitudin nisl.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default MensagemPadraoRn