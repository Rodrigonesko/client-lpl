import { Box, TextField } from "@mui/material"

const InfoElegibilidadePme = ({ proposta }) => {
    return (
        <Box mt={1}>
            <Box mt={1}>
                <TextField size="small" style={{ margin: '10px' }} label='Porte' focused value={proposta.porte} InputProps={{
                    readOnly: true,
                }} />
                <TextField size="small" style={{ margin: '10px' }} label='Linha de Produto' focused value={proposta.linhaDeProduto} InputProps={{
                    readOnly: true,
                }} />
                <TextField size="small" style={{ margin: '10px' }} label='Grupo' focused value={proposta.grupo} InputProps={{
                    readOnly: true,
                }} />
                <TextField size="small" style={{ margin: '10px' }} label='CNPJ' focused value={proposta.cnpj} InputProps={{
                    readOnly: true,
                }} />
            </Box>
            <Box mt={1}>
                <TextField size="small" style={{ margin: '10px' }} label='Vidas' focused value={proposta.vidas} InputProps={{
                    readOnly: true,
                }} />
                <TextField size="small" style={{ margin: '10px' }} label='Colaborador' focused value={proposta.colaborador} InputProps={{
                    readOnly: true,
                }} />
                <TextField size="small" style={{ margin: '10px' }} label='Situação' focused value={proposta.situacao} InputProps={{
                    readOnly: true,
                }} />
                <TextField size="small" style={{ margin: '10px' }} type="date" label='Data Protocolo' focused value={proposta.dataProtocolo} InputProps={{
                    readOnly: true,
                }} />
            </Box>
            <Box mt={1} >
                <TextField size="small" style={{ margin: '10px' }} label='Motor' focused value={proposta.motor} InputProps={{
                    readOnly: true,
                }} />
                <TextField size="small" style={{ margin: '10px' }} label='Gestor' focused value={proposta.gestor} InputProps={{
                    readOnly: true,
                }} />
                <TextField size="small" style={{ margin: '10px' }} label='Data Analise' focused value={proposta.dataAnalise} InputProps={{
                    readOnly: true,
                }} />
            </Box>
        </Box>
    )
}

export default InfoElegibilidadePme