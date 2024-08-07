import { ApiCall } from "./api";
const URL_API = process.env.REACT_APP_API_KEY;
const URL_API_V2 = process.env.REACT_APP_API_TELE_ENTREVISTA;
const URL_API_V2_EXTERNA = process.env.REACT_APP_API_TELE_ENTREVISTA_EXTERNO

/* Propostas */

export const getPropostasByStatus = async (status) => {
    return await new ApiCall(`/newPropostaEntrevista/status/${status}`, URL_API).get()
}

export const getPropostasByAgendamento = async (agendamento, sort, pesquisa, responsavel, tipoContrato, limit, page) => {
    return await new ApiCall(`/newPropostaEntrevista/agendamento?agendamento=${agendamento}&sort=${sort}&pesquisa=${pesquisa}&responsavel=${responsavel}&tipoContrato=${tipoContrato}&limit=${limit}&page=${page}`, URL_API).get()
}

export const updatePropostaEntrevista = async (data) => {
    return await new ApiCall(`/newPropostaEntrevista/${data._id}`, URL_API).put(data)
}

export const deletePropostaEntrevista = async (id) => {
    return await new ApiCall(`/newPropostaEntrevista/${id}`, URL_API).delete()
}

export const mandaAtendimentoAutomatizado = async (id) => {
    return await new ApiCall(`/newWhatsapp/mandaAtendimentoAutomatizado`, 'http://localhost:3002').post({ id })
}

/* Dados Entrevista  */

export const finalizarEntrevista = async (data) => {
    return await new ApiCall('/newTeleEntrevista/finalizarEntrevista', URL_API).post(data)
}

export const cancelarEntrevista = async (data) => {
    return await new ApiCall('/newTeleEntrevista/cancelar', URL_API).post(data)
}

export const voltarEntrevista = async (id) => {
    return await new ApiCall(`/newTeleEntrevista/voltarEntrevista/${id}`, URL_API).patch()
}

export const getDadosEntrevistaById = async (id) => {
    return await new ApiCall(`/newTeleEntrevista/id/${id}`, URL_API).get()
}

export const getDadosEntrevistaByPropostaId = async (id) => {
    return await new ApiCall(`/newTeleEntrevista/proposta/${id}`, URL_API).get()
}

export const getDadosEntrevistaByDetails = async (detalhes) => {
    return await new ApiCall(`/newTeleEntrevista/details/${detalhes}`, URL_API).get()
}

export const updateDadosEntrevista = async (data) => {
    return await new ApiCall(`/newTeleEntrevista/update/${data._id}`, URL_API).put(data)
}

/* --------------------------------------------------------------- */

export class PropostaService {

    uploadAdesao = async (data) => {
        return await new ApiCall('/proposta/spreadsheet', URL_API_V2).post(data)
    }

    concluir = async (data) => {
        return await new ApiCall('/proposta/concluir', URL_API_V2).post(data)
    }

    cancelar = async (data) => {
        return await new ApiCall('/proposta/cancelar', URL_API_V2).post(data)
    }

    uploadArquivoPropostaEntrevista = async (id, data) => {
        return await new ApiCall(`/proposta/upload/${id}`, URL_API_V2_EXTERNA).post(data)
    }

    filterPendentes = async (filter) => {
        return await new ApiCall('/proposta/filter-pendentes', URL_API_V2).post(filter)
    }

    findById = async (id) => {
        return await new ApiCall(`/proposta/id/${id}`, URL_API_V2).get()
    }

    findByCpfTitular = async (cpf) => {
        return await new ApiCall(`/proposta/cpf-titular/${cpf}`, URL_API_V2).get()
    }

    findByWhatsapp = async (whatsapp) => {
        return await new ApiCall(`/proposta/whatsapp/${whatsapp}`, URL_API_V2).get()
    }

    findByFilter = async (filter) => {
        return await new ApiCall(`/proposta/filter`, URL_API_V2).post(filter)
    }

    quantidadePropostasPendentes = async () => {
        return await new ApiCall(`/proposta/quantidade-propostas-pendentes`, URL_API_V2).get()
    }

    relatorioRespondeuWhats = async () => {
        return await new ApiCall(`/proposta/relatorio-respondidos-whatsapp`, URL_API_V2).get()
    }

    update = async (data) => {
        return await new ApiCall(`/proposta/${data._id}`, URL_API_V2).put(data)
    }

    adicionarTentativaDeContato = async (id, data) => {
        return await new ApiCall(`/proposta/tentativa-de-contato/${id}`, URL_API_V2).patch(data)
    }

    entrouNaProposta = async (cpfTitular) => {
        return await new ApiCall(`/proposta/entrou-na-proposta/${cpfTitular}`, URL_API_V2).patch()
    }

    saiuDaProposta = async (cpfTitular) => {
        return await new ApiCall(`/proposta/sair-da-proposta/${cpfTitular}`, URL_API_V2).patch()
    }
}

export class HorarioService {

    agendar = async (data) => {
        return await new ApiCall('/horario/agendar', URL_API_V2).patch(data)
    }

    reagendar = async (id, data) => {
        return await new ApiCall(`/horario/reagendar/${id}`, URL_API_V2).patch(data)
    }
}

export class DadosEntrevistaService {
    findByFilter = async (filter) => {
        return await new ApiCall(`/dados-entrevista/filter`, URL_API_V2).post(filter)
    }
}

export class WhatsappService {

    sendMessage = async (data) => {
        return await new ApiCall(`/whatsapp/send-message`, URL_API_V2).post(data)
    }

    sendTemplateMessage = async (data) => {
        return await new ApiCall(`/whatsapp/send-template-message`, URL_API_V2).post(data)
    }

    sendMessageJanela = async (data) => {
        return await new ApiCall(`/whatsapp/enviar-mensagem-janelas`, URL_API_V2).post(data)
    }

    sendMessageAutomatizado = async (data) => {
        return await new ApiCall(`/whatsapp/enviar-mensagem-automatizado`, URL_API_V2).post(data)
    }
}