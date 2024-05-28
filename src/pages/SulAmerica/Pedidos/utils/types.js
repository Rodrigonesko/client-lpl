import { blue, deepOrange, green, orange, red } from "@mui/material/colors"

export const colorStatus = {
    'A INICIAR': blue[900],
    'AGENDADO': orange[900],
    'EM ANDAMENTO': deepOrange[900],
    'SUCESSO CONTATO': green[900],
    'INSUCESSO CONTATO': red[900]
}

export const colorSubStatus = {
    'REALIZADO': {
        backgroundColor: green[100],
        color: green[900]
    },
    'FALECIDO': {
        backgroundColor: orange[100],
        color: orange[900]
    },
    'RECUSADO': {
        backgroundColor: orange[100],
        color: orange[900]
    },
    'PRESTADOR DIVERGENTE': {
        backgroundColor: orange[100],
        color: orange[900]
    },
    'PARCIAL': {
        backgroundColor: blue[100],
        color: blue[900]
    },
    'TRÊS TENTATIVAS': {
        backgroundColor: red[100],
        color: red[900]
    },
    'TRÊS TENTATIVAS WHATSAPP': {
        backgroundColor: red[100],
        color: red[900]
    }
}

export const subStatusSucessoContato = [
    'REALIZADO',
    'FALECIDO',
    'RECUSADO',
    'PRESTADOR DIVERGENTE',
    'PARCIAL'
]

export const subStatusInsucessoContato = [
    'TRÊS TENTATIVAS',
    'TRÊS TENTATIVAS WHATSAPP'
]
