import { ApiCall } from "./api";

export const UpdateFerias = async (data) => {
    return await new ApiCall('/vacation/update').put(data)
}

export const updateGestorAceitou = async (_id, gestorAprovou) => {
    return await new ApiCall('/vacation/gestorAceitou').put(_id, gestorAprovou)
}