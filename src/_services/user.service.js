import { ApiCall } from "./api";

export const getInfoUser = async () => {
    return await new ApiCall('/infoUser').get()
}

export const buscaAnalistasTele = async () => {
    return await new ApiCall('/users/enfermeiros').get()
}