import { ApiCall } from "./api";

export const showPropostas = async () => {
    return await new ApiCall('/elegibilidade/show').get()
}