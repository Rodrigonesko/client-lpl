import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Box, Collapse, Grid, IconButton, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import moment from "moment"
import { useState } from "react"
import { valueToBRL } from "../../../../functions/functions"

const Info = ({ label, value }) => (
    <Grid item
        xs={12}
        sm={2}
    >
        <Typography
            variant='subtitle2'
            sx={{
                color: grey[700],
                fontWeight: 'bold'
            }}
        >
            {label}
        </Typography>
        <Typography
            variant='body2'
            sx={{
                color: grey[900],
                fontWeight: 'bold'
            }}
        >
            {value}
        </Typography>
    </Grid>
)

const ExpandMaisInfos = ({ pedido }) => {

    const [open, setOpen] = useState(false)

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}
            >
                <IconButton
                    onClick={() => setOpen(!open)}
                >
                    {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Typography>
                    Mais informações
                </Typography>
            </Box>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <Grid container spacing={2} mt={1} width={'100%'}>
                    <Info label={'Data de Solicitação'} value={moment(pedido?.dataSolicitacao).format('DD/MM/YYYY')} />
                    <Info label={'Conselho Profissional de Saúde'} value={pedido?.conselhoProfissionalSaude} />
                    <Info label={'Ramo'} value={pedido?.ramo} />
                    <Info label={'Número Apólice'} value={pedido?.apolice?.numero} />
                    <Info label={'Nome Apólice'} value={pedido?.apolice?.nome} />
                    <Info label={'Data Apólice'} value={moment(pedido?.apolice?.data).format('DD/MM/YYYY')} />
                    <Info label={'Situação Sinistro'} value={pedido?.situacao} />
                    <Info label={'Valor liberado'} value={valueToBRL(pedido?.valorLiberado)} />
                </Grid>
            </Collapse>
        </Box>
    )
}

export default ExpandMaisInfos