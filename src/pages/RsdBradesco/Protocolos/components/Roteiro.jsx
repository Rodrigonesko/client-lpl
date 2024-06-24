import { Box, Typography } from "@mui/material"
import { useContext } from "react"
import AuthContext from "../../../../context/AuthContext"
import moment from "moment"

const Roteiro = () => {

    const { name } = useContext(AuthContext)

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            gap={1}
        >
            <Typography>
                - Bom dia, eu gostaria de falar com ..., tudo bem com o Sr(a)?
            </Typography>
            <Typography>
                - Meu nome é {name}, eu faço parte da equipe Auditoria e Qualidade da Bradesco Seguros! Nosso contato é sobre a sua solicitação de reembolso que consta em aberto no nosso sistema, ela precisa ser validada para darmos prosseguimento na análise, ok?
            </Typography>
            <Typography>
                - Para sua segurança essa é uma ligação gravada. Hoje é dia {moment().format('DD/MM/YYYY')} hora {moment().format('HH:mm')}; o nome do Senhor (a) é ...?. o CPF é ...?
            </Typography>
            <Typography>
                - O Sr(a). Confirma atendimento na clínica ..., na data ..., que gerou o recibo/NF... no valor de R$...?
            </Typography>
            <Typography>
                - Foi só este atendimento realizado no local? Caso o beneficiário afirme que sim. Indagar o recebimento de outra nota.
            </Typography>
            <Typography>
                - Recebemos uma outra nota fiscal data de ..., o Sr. reconhece este atendimento? - Foi realizado apenas consulta ou também exames?
            </Typography>
            <Typography>
                * - O Sr. realiza algum tipo de tratamento no local? Qual a frequência do tratamento? (De quanto em quanto tempo?) * Se tiver grupo familiar – Somente o Sr. passa em atendimento neste prestador? Algum outro dependente? Qual? *(em caso positivo, fazer os questionamentos acima para o dependente)
            </Typography>
            <Typography>
                - Foi o Sr (a). que realizou o cadastro e solicitação do reembolso?
            </Typography>
            <Typography>
                - Este pedido contempla todo o atendimento efetuado nesta data? Ou há alguma nota ainda a ser apresentada referente a este atendimento?
            </Typography>
            <Typography>
                - Qual foi a forma de pagamento deste procedimento? Tem algum comprovante do pagamento deste procedimento?
            </Typography>
            <Typography>
                - Caso o comprovante apresentado e que está em sistema esteja divergente do relato do segurado, questionar se o entrevistado reconhece o documento enviado e que diverge com a afirmação da pergunta anterior.
                A Bradesco Saúde Agradece sua atenção, tenha um bom dia.
            </Typography>
            <Typography>
            No processo inicial é solicitado que o segurado inclua o comprovante de desembolso, para os eventos acima de <strong>R$ 500,00</strong>, apenas para o produto <strong>Bradesco Saúde</strong>. Esta regra não se aplica para Bradesco Saúde Operadora de Planos.
            </Typography>
        </Box>
    )
}

export default Roteiro