import { ApiCall } from "./api";

export const getProducaoMensalRn = async (mes, analista) => {
    return await new ApiCall(`/rn/producaoMensal/${mes}/${analista}`).get()
}