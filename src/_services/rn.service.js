import { ApiCall } from "./api";
const url = process.env.REACT_APP_API_TELE_ENTREVISTA

export const getProducaoMensalRn = async (mes, analista) => {
    return await new ApiCall(`/rn/producaoMensal/${mes}/${analista}`).get()
}

export const getRnByDate = async (dataInicio, dataFim) => {
    return await new ApiCall(`/rn/data/${dataInicio}/${dataFim}`).get()
}

export class RnService {

    findById = async (id) => {
        return await new ApiCall(`/rn/id/${id}`, url).get()
    }

    findByWhatsApp = async (whatsapp) => {
        return await new ApiCall(`/rn/whatsapp/${whatsapp}`, url).get()
    }

    findByFilter = async (data) => {
        return await new ApiCall(`/rn/filter`, url).post(data)
    }

    update = async (data) => {
        return await new ApiCall(`/rn/${data._id}`, url).put(data)
    }
}