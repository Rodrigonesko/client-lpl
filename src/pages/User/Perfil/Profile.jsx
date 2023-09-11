import Sidebar from "../../../components/Sidebar/Sidebar"
import { Box } from "@mui/material"
import ProfileHead from "./ProfileHead"
import AuthContext from "../../../context/AuthContext"
import { useContext, useEffect, useState } from "react"
import { getInfoUser } from "../../../_services/user.service"

const Profile = () => {

    const { name } = useContext(AuthContext)
    const [userData, setUserData] = useState({})

    const fetchData = async () => {
        const { user } = await getInfoUser()
        setUserData(user)
    }

    useEffect(() => {
        fetchData()
    }, [name])

    return (
        <>
            <Sidebar />
            <Box width='100%'>
                <ProfileHead userData={userData} />
            </Box>
        </>
    )
}

export default Profile