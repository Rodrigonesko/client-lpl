import { useState } from "react"
import Sidebar from "../../../../components/Sidebar/Sidebar"
import { Box, Container, Paper, Typography, Button, Alert, LinearProgress } from "@mui/material"
import DragAndDrop from "../../../../components/DragAndDrop/DragAndDrop"
import { green } from "@mui/material/colors";
import { RiFileExcel2Fill } from 'react-icons/ri'
import { uploadPropostasElegibilidadePme } from "../../../../_services/elegibilidadePme.service";

const UploadElegibilidadePme = () => {

    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [qtd, setQtd] = useState(0)

    const handleUpload = async () => {
        setLoading(true)

        let formData = new FormData()

        formData.append('file', file, file.name)

        const result = await uploadPropostasElegibilidadePme(formData)

        console.log(result);

        setQtd(result.qtd)

        setLoading(false)
        setSuccess(true)
        setFile(null)


    }

    return (
        <>
            <Sidebar>
                <Box width='100%' height='100vh' overflow='auto' >
                    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <Box component={Paper} p={2} elevation={4} >
                            <Typography variant="h6" textAlign='center'>
                                Upload de Propostas PME
                            </Typography>
                            <DragAndDrop file={file} bgColor={green[800]} setFile={setFile} fontColor={green[800]} text={'Arraste e solte o arquivo ou clique aqui'} textOnDrag='Solte o arquivo' textOnDrop={file ? <Typography  >{file.name} <RiFileExcel2Fill /></Typography> : ''} />
                            <Box m={2} textAlign='center'>
                                <Button onClick={handleUpload} disabled={loading} variant="contained" >Enviar</Button>
                            </Box>
                            {
                                loading ? (
                                    <LinearProgress />
                                ) : null
                            }
                            {
                                success ? (
                                    <Alert severity="success" variant="filled">
                                        {qtd} propostas carregadas com sucesso
                                    </Alert>
                                ) : null
                            }

                        </Box>
                    </Container>
                </Box>
            </Sidebar>
        </>
    )
}

export default UploadElegibilidadePme