import { ApiCall } from "./api";

export const createAgenda = async (data) => {
    return await new ApiCall('/agenda/createAgenda').post(data)
}

export const getAgenda = async () => {
    return await new ApiCall('/agenda/getAgenda').get()
}

export const getAgendaToDo = async () => {
    return await new ApiCall('/agenda/getAgendaToDo').get()
}

export const deleteAgenda = async (id) => {
    return await new ApiCall(`/agenda/deleteAgenda/${id}`).delete()
}

export const updateAgendaCheck = async (item) => {
    return await new ApiCall('/agenda/updateAgendaCheck').put(item)
}

export const setarData = async (_id, data) => {
    return await new ApiCall('/agenda/data').put(_id, data)
}

export const filterAgenda = async (pesquisa) => {
    return await new ApiCall(`/agenda/filterAgenda/${pesquisa}`).get()
}