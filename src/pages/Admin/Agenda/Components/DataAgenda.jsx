import { TextField } from "@mui/material"
import { useState } from "react"
import { setarData } from "../../../../_services/agenda.service"

const DataAgenda = ({ item, setOpen, setOpenSnack, setFlushHook }) => {

    const [data, setData] = useState(item.data)

    const handleUpdate = async (_id, data) => {
        try {
            const find = await setarData({
                _id: _id,
                data: data
            })
            console.log(_id, data);
            console.log(find);
            setFlushHook(true)
            setOpenSnack(true)
            setOpen(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TextField
            value={data}
            size='small'
            label='Data'
            type='date'
            onChange={(e) => {
                setData(e.target.value)
            }}
            onBlur={() => { handleUpdate(item._id, data) }}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                style: {
                    borderRadius: '10px'
                }
            }}
        />
    )
}

export default DataAgenda