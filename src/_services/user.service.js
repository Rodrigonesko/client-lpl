import { ApiCall } from "./api";
import { getCookie } from "react-use-cookie";
const token = getCookie('token')

export const getInfoUser = async () => {
    return await new ApiCall(`/infoUser`).get()
}

export const getInfoEmail = async (email) => {
    return await new ApiCall(`/infoUser/${email}`).get()
}

export const getUsers = async () => {
    return await new ApiCall('/users').get()
}

export const buscaAnalistasTele = async () => {
    return await new ApiCall('/users/enfermeiros').get()
}

export const getAnalistasRsd = async () => {
    return await new ApiCall('/users/rsd').get()
}

export const getAnalistasAgendamento = async () => {
    return await new ApiCall('/users/agendamento').get()
}

export const createUser = async (data) => {
    return await new ApiCall('/users').post(data)
}

export const liberarModulos = async (email, enfermeiro, elegibilidade, entrada1, saida1, entrada2, saida2, atividadePrincipal, coren, contaInativada) => {
    return await new ApiCall('/users/modules').put(email, enfermeiro, elegibilidade, entrada1, saida1, entrada2, saida2, atividadePrincipal, coren, contaInativada)
}

export const restaurarSenha = async (email) => {
    return await new ApiCall('/users/resetPassword').put(email)
}

export const getAnalistasElegibilidade = async () => {
    return await new ApiCall('/users/elegibilidade').get()
}

export const updatePassword = async (data) => {
    return await new ApiCall('/users/updatePassword').put(data)
}

export const lerPolitica = async (data) => {
    return await new ApiCall('/users/lerPolitica').put(data)
}

export const updateBancoHoras = async (data) => {
    return await new ApiCall('/bancoHoras').patch(data)
}

export const getFeriasElegiveis = async () => {
    return await new ApiCall('/feriasElegiveis').get()
}

export const getAllAniversariantes = async () => {
    return await new ApiCall('/aniversariantes').get()
}

export const updateHorarioPonto = async (data) => {
    return await new ApiCall('/horarioPonto').patch(data)
}

// export const createAdmissao = async (_id) => {
//     return await new ApiCall('/admissaoDemissao/createAdmissao').post(_id)
// }

// export const createDemissao = async (_id) => {
//     return await new ApiCall('/admissaoDemissao/createDemissao').post(_id)
// }

// export const setarStatus = async (_id, status, id, tipoExame) => {
//     return await new ApiCall('/admissaoDemissao/status').put(_id, status, id, tipoExame)
// }

// export const updateObs = async (_id, obs, id, tipoExame) => {
//     return await new ApiCall('/admissaoDemissao/obs').put(_id, obs, id, tipoExame)
// }

// export const updateData = async (_id, data, id, tipoExame) => {
//     return await new ApiCall('/admissaoDemissao/data').put(_id, data, id, tipoExame)
// }

// export const getAllItens = async () => {
//     return await new ApiCall('/admissaoDemissao/itens').get()
// }

// export const updateProrrogacao = async (name, prorrogacao) => {
//     return await new ApiCall('/admissaoDemissao/prorrogacao').put(name, prorrogacao)
// }

export const updateProfilePic = async (data) => {
    return await new ApiCall('/updateProfilePic', process.env.REREACT_APP_API_KEY, token,
        { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).patch(data)
}