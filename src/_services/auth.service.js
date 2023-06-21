import { ApiCall } from "./api";

export const verificarToken = async () => {
    return await new ApiCall('/verifyToken').get()
}