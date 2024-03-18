import { useContext, useEffect, useState } from "react"
import { ChatContext } from "./ChatContext"
import { filterUsers } from "../../../_services/user.service"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const ResponsavelConversa = () => {

    const { whatsappSender, setResponsavel, responsavel } = useContext(ChatContext)

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            switch (whatsappSender) {
                case '':
                    setUsers([])
                    break
                case 'whatsapp:+551150264875':
                    const result = await filterUsers({
                        atividadePrincipal: "RSD",
                        inativo: { $ne: true },
                    })
                    setUsers(result)
                    break
                default:
                    setUsers([])
                    break
            }
        }

        fetchUsers()
    }, [whatsappSender])

    return (
        <FormControl
            sx={{
                m: 1,
                minWidth: '25ch',
            }}
            fullWidth
        >
            <InputLabel id="responsavel-conversa-label">Responsável</InputLabel>
            <Select
                labelId="responsavel-conversa-label"
                id="responsavel-conversa"
                label="Responsável"
                value={responsavel}
                onChange={(e) => {
                    setResponsavel(e.target.value)
                }}
                sx={{ borderRadius: '10px' }}
            >
                <MenuItem value="Todos">
                    <em>Todos</em>
                </MenuItem>
                {users.map((user, index) => (
                    <MenuItem
                        key={index}
                        value={user.name}
                    >
                        {user.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default ResponsavelConversa