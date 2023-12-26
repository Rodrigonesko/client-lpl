import { ApiCall } from "./api";

export const getAllCelulas = async () => {
    return await new ApiCall('/celulas').get()
}