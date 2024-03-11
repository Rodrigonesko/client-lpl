import { IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getTemplates } from "../../../_services/whatsapp.service";
import ModalInsertVariables from "./ModalInsertVariables";

const TemplateMenu = () => {

    const [templates, setTemplates] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await getTemplates()
            setTemplates(response)
        }

        fetchTemplates()
    }, [])

    return (
        <>
            <IconButton
                onClick={handleOpen}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                {
                    templates.map(template => (
                        <ModalInsertVariables template={template} />
                    ))
                }
            </Menu>
        </>
    )
}

export default TemplateMenu;