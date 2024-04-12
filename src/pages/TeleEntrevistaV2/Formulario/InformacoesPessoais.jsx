import { useContext, useState } from 'react'
import { Box, Typography, TextField, Divider, Button, Select, MenuItem } from '@mui/material'
import { updateBeneficiario } from '../../../_services/teleEntrevistaV2.service'
import { Save } from '@mui/icons-material'
import Toast from '../../../components/Toast/Toast'
import { FormContext } from './context'

const BoxInfo = ({
    label,
    value,
    changeValue = () => { },
    disabled = false
}) => {
    return (
        <Box>
            <Typography variant="body2">
                {label}
            </Typography>
            <TextField
                value={value}
                variant="outlined"
                size='small'
                sx={{
                    width: '300px'
                }}
                onChange={changeValue}
                disabled={disabled}
            />
        </Box>
    )
}

const InformacoesPessoais = () => {

    const { proposta, setProposta, setFlushHook } = useContext(FormContext)

    //const [proposta, setProposta] = useState(data || {})
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const save = async () => {
        setLoading(true)
        try {
            const idade = new Date().getFullYear() - new Date(proposta.beneficiario.dataNascimento).getFullYear()
            await updateBeneficiario({

                ...proposta.beneficiario,
                idade

            })
            setLoading(false)
            setSeverity('success')
            setMessage('Informações salvas com sucesso')
            setFlushHook(prev => !prev)
            setOpenToast(true)
        } catch (error) {
            console.error(error)
            setSeverity('error')
            setMessage('Erro ao salvar informações')
            setOpenToast(true)
            setLoading(false)
        }
    }

    return (
        <Box>
            <Divider />
            <Typography variant="h6">
                Informações Pessoais
            </Typography>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
                mb={2}

            >
                <BoxInfo
                    label="Nome"
                    value={proposta.beneficiario.nome}
                    changeValue={(e) => {
                        setProposta({
                            ...proposta,
                            beneficiario: {
                                ...proposta.beneficiario,
                                nome: e.target.value
                            }
                        })
                    }}
                />
                <Box>
                    <Typography variant="body2">
                        Sexo
                    </Typography>
                    <Select
                        value={proposta.beneficiario.sexo}
                        onChange={(e) => {
                            setProposta({
                                ...proposta,
                                beneficiario: {
                                    ...proposta.beneficiario,
                                    sexo: e.target.value
                                }
                            })
                        }}
                        sx={{
                            width: '300px'
                        }}
                        size='small'
                    >
                        <MenuItem value="M">Masculino</MenuItem>
                        <MenuItem value="F">Feminino</MenuItem>
                    </Select>
                </Box>
                <BoxInfo label="CPF" value={proposta.beneficiario.cpf}
                    changeValue={(e) => {
                        setProposta({
                            ...proposta,
                            beneficiario: {
                                ...proposta.beneficiario,
                                cpf: e.target.value
                            }
                        })
                    }}
                />
                <BoxInfo label="Proposta" value={proposta.proposta} disabled={true} />
                <BoxInfo label="Telefone" value={proposta.beneficiario.telefone}
                    changeValue={(e) => {
                        setProposta({
                            ...proposta,
                            beneficiario: {
                                ...proposta.beneficiario,
                                telefone: e.target.value
                            }
                        })
                    }}
                />
                <Box>
                    <Typography variant="body2">
                        Data de Nascimento
                    </Typography>
                    <TextField
                        value={proposta.beneficiario.dataNascimento}
                        variant="outlined"
                        size='small'
                        sx={{
                            width: '300px'
                        }}
                        type="date"
                        onChange={(e) => {
                            setProposta({
                                ...proposta,
                                beneficiario: {
                                    ...proposta.beneficiario,
                                    dataNascimento: e.target.value
                                }
                            })
                        }}
                    />
                </Box>
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={save}
                disabled={loading}
                endIcon={<Save />}
            >
                Salvar
            </Button>
            <Divider />
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </Box>
    )
}

export default InformacoesPessoais