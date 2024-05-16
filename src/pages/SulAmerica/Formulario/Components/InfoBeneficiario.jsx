import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"
import { Box, Button, CircularProgress, Collapse, Divider, Grid, IconButton, TextField, Typography } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import { valueToBRL } from "../../../../functions/functions"
import { deepOrange } from "@mui/material/colors"
import { useForm } from "react-hook-form"
import Toast from "../../../../components/Toast/Toast"
import { updateBeneficiario } from "../../../../_services/sulAmerica.service"

const InfoBeneficiario = (props) => {

    const { register, handleSubmit, setValue } = useForm();

    const [open, setOpen] = useState(true)
    const [data, setData] = useState({})
    const [severitySnack, setSeveritySnack] = useState('')
    const [msg, setMsg] = useState('')
    const [openSnack, setOpenSnack] = useState(false)

    useEffect(() => {
        if (!props.loading) {
            setData(props?.beneficiario)
        }
    }, [props])

    useEffect(() => {
        if (data) {
            setValue('responsavelLegal', data?.responsavelLegal)
            setValue('vinculoResponsavel', data?.vinculoResponsavel)
        }
    }, [data, setValue])

    const handleClick = () => {
        setOpen(!open)
    }

    const onSubmit = async (data) => {
        try {
            await updateBeneficiario(props?.beneficiario?._id, data)
            setSeveritySnack('success')
            setMsg('Informações atualizadas com sucesso')
            setOpenSnack(true)
        } catch (error) {
            console.log(error);
            setSeveritySnack('error')
            setMsg('Erro ao atualizar informações')
            setOpenSnack(true)
        }
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="h6"
                >
                    Infomações do Pedido e do Beneficiário
                </Typography>
                <IconButton
                    onClick={handleClick}
                >
                    {
                        !open ? <ArrowDropDown /> : <ArrowDropUp />
                    }
                </IconButton>
            </Box>
            <Collapse in={open}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mt: 1
                    }}
                >
                    {!props.loading ? <> <Typography>
                        <strong>Nome:</strong> {props?.beneficiario?.nome}
                    </Typography>
                        <Typography>
                            <strong>CPF:</strong> {props?.beneficiario?.cpf}
                        </Typography>
                        <Typography>
                            <strong>Código Sistema:</strong> {props?.beneficiario?.codSistemicoBeneficiario}
                        </Typography>
                        <Typography>
                            <strong>Código Carteirinha:</strong> {props?.beneficiario?.codCarteiraBeneficiario}
                        </Typography>
                        <Typography>
                            <strong>Email:</strong> {props?.beneficiario?.melhorEmail}
                        </Typography>
                        <Typography>
                            <strong>Celular:</strong> {props?.beneficiario?.melhorCelular}
                        </Typography>
                        <Typography>
                            <strong>Celulares:</strong> {props?.beneficiario?.celulares.map(celular => celular).join(' - ')}
                        </Typography>
                        <Typography>
                            <strong>Plano:</strong> {props?.beneficiario?.carteiraEmpresa}
                        </Typography>
                        <Typography>
                            <strong>Início Vigência:</strong> {props?.beneficiario?.dataInicioVigencia && moment(props?.beneficiario?.dataInicioVigencia).format('DD/MM/YYYY')}
                        </Typography>
                        <Typography>
                            <strong>Endereço</strong> {props?.beneficiario?.logradouro}
                        </Typography>
                        <Typography>
                            <strong>Bairro:</strong> {props?.beneficiario?.bairro}
                        </Typography>
                        <Typography>
                            <strong>Cep:</strong> {props?.beneficiario?.cep}
                        </Typography>
                        <Typography>
                            <strong>Cidade:</strong> {props?.beneficiario?.municipio}
                        </Typography>
                        <Typography>
                            <strong>UF:</strong> {props?.beneficiario?.uf}
                        </Typography>
                        <Typography>
                            <strong>Menor Data Execução:</strong> {props?.pedido?.menorDataExecucao && moment(props?.pedido?.menorDataExecucao).format('DD/MM/YYYY')}
                        </Typography>
                        <Typography>
                            <strong>Maior Data Execução:</strong> {props?.pedido?.maiorDataExecucao && moment(props?.pedido?.maiorDataExecucao).format('DD/MM/YYYY')}
                        </Typography>
                        <Typography>
                            <strong>Quantidade Serviços:</strong> {props?.pedido?.qtdServicosPagos}
                        </Typography>
                        <Typography>
                            <strong>Valor Pago:</strong> {props?.pedido?.valorPago && valueToBRL(props?.pedido?.valorPago)}
                        </Typography>
                        <Typography>
                            <strong>Serviços:</strong> {props.pedido?.servicos.map(servico => servico).join(' - ')}
                        </Typography>
                        <Divider />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                gap={2}
                            >
                                <Box width={'100%'}>
                                    <Typography
                                        variant="h6"
                                    >
                                        Responsável
                                    </Typography>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder="Nome do Responsável"
                                        {...register('responsavelLegal')}
                                    />
                                </Box>
                                <Box
                                    width={'100%'}
                                >
                                    <Typography
                                        variant="h6"
                                    >
                                        Vínculo
                                    </Typography>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder="Vínculo do Responsável"
                                        {...register('vinculoResponsavel')}
                                    />
                                </Box>
                            </Box>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    mt: 2
                                }}
                            >
                                Salvar
                            </Button>
                        </form>
                    </> : (
                        <CircularProgress sx={{
                            color: deepOrange[500],
                            alignSelf: 'center'
                        }} />
                    )
                    }
                </Box>
            </Collapse>
            <Toast
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                severity={severitySnack}
                message={msg}
            />
        </Box>
    )
}

export default InfoBeneficiario