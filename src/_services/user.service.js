import { ApiCall } from "./api";

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

export const createUser = async (email, name, accessLevel, atividade) => {
    return await new ApiCall('/users').post(email, name, accessLevel, atividade)
}

export const liberarModulos = async (email, enfermeiro, elegibilidade, entrada1, saida1, entrada2, saida2, atividadePrincipal, coren) => {
    return await new ApiCall('/users/modules').put(email, enfermeiro, elegibilidade, entrada1, saida1, entrada2, saida2, atividadePrincipal, coren)
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