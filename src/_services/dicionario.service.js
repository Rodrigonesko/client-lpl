import { ApiCall } from "./api";

export const getDicionario = async () => {
    return await new ApiCall('/dicionario').get()
}