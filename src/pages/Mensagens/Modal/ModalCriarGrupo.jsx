import { Button, Tooltip } from "@mui/material"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
const ModalCriarGrupo = () => {
    return (
        <>
            <Tooltip title='Criar Grupo'>
                <Button variant="outlined" size="small"><GroupAddIcon /></Button>
            </Tooltip>
        </>
    )
}

export default ModalCriarGrupo