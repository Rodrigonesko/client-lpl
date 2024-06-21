import { blue, deepOrange, green, indigo, orange, red, yellow } from "@mui/material/colors";

export const colorStatusRsdBradesco = {
    'A INICIAR': blue[900],
    'AGENDADO': orange[900],
    'EM ANDAMENTO': deepOrange[900],
    'FINALIZADO': green[900]
}

export const colorStatusPedido = {
    'A INICIAR': {
        backgroundColor: blue[100],
        color: blue[900]
    },
    'AGENDADO': {
        backgroundColor: orange[100],
        color: orange[900]
    },
    'EM ANDAMENTO': {
        backgroundColor: orange[100],
        color: orange[900]
    },
    'SUCESSO': {
        backgroundColor: green[100],
        color: green[900]
    },
    'INSUCESSO': {
        backgroundColor: red[100],
        color: red[900]
    }
}

export const colorParecer = {
    'CONFIRMADO O FRACIONAMENTO - NEGAR O SINISTRO': {
        backgroundColor: orange[100],
        color: orange[900]
    },
    'NÃO EVIDENCIADA A IRREGULARIDADE - PROCEDER COM A ANÁLISE E PAGAMENTO': {
        backgroundColor: green[100],
        color: green[900]
    },
    'NÃO FOI POSSÍVEL CONFIRMAR O ATENDIMENTO POR FALHA NA TENTATIVA DE CONTATO': {
        backgroundColor: red[100],
        color: red[900]
    },
    'REEMBOLSO SEM DESEMBOLSO': {
        backgroundColor: yellow[100],
        color: yellow[900]
    },
    'COMPROVANTE DIVERGENTE': {
        backgroundColor: indigo[100],
        color: indigo[900]
    }
}