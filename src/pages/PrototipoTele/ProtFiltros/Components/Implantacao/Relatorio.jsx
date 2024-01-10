import { IconButton, Tooltip } from "@mui/material"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RelatorioPadraoTele from "../../../../../components/RelatorioPadraoTele/RelatorioPadraoTele";

const Relatorio = ({
    propostas
}) => {

    const handleGerarRelatorio = () => {
        RelatorioPadraoTele(propostas, 'Implantação')
    }

    return (
        <>
            <Tooltip title='Downalod'>
                <IconButton
                    onClick={handleGerarRelatorio}
                >
                    <FileDownloadIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default Relatorio