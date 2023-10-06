import { ApiCall } from "./api";

export const UpdateFerias = async (data) => {
    return await new ApiCall('/vacation/update').put(data)
}