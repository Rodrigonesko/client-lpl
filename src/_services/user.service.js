import { ApiCall } from "./api";
const token = localStorage.getItem('token')

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

export const updateInfoUser = async (data) => {
    return await new ApiCall('/users').put(data)
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

export const updateAusencias = async (data) => {
    return await new ApiCall('/ausencias').patch(data)
}

export const getFaltas = async () => {
    return await new ApiCall('/ausencias').get()
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

export const updateProfilePic = async (data) => {
    return await new ApiCall('/updateProfilePic', process.env.REREACT_APP_API_KEY, token,
        { headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` } }).patch(data)
}

export const filterUsers = async (data) => {
    return await new ApiCall('/users/filter').post(data)
}