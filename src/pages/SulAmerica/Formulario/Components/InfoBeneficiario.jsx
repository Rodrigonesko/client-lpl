import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"
import { Box, CircularProgress, Collapse, IconButton, Typography } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import { valueToBRL } from "../../../../functions/functions"
import { deepOrange } from "@mui/material/colors"

const InfoBeneficiario = (props) => {

    const [open, setOpen] = useState(true)

    const handleClick = () => {
        setOpen(!open)
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
                            <strong>Início Vigência:</strong> {props?.beneficiario?.dataInicioVigencia && moment(props?.beneficiario?.dataInicioVigencia).format('DD/MM/YYYY')}
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
                    </> : (
                        <CircularProgress sx={{
                            color: deepOrange[500],
                            alignSelf: 'center'
                        }} />
                    )
                    }
                </Box>
            </Collapse>
        </Box>
    )
}

export default InfoBeneficiario