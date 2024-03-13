import { ApiCall } from "./api";

export const createAgenda = async (data) => {
    return await new ApiCall('/agenda/createAgenda').post(data)
}

export const getAgenda = async () => {
    return await new ApiCall('/agenda/getAgenda').get()
}