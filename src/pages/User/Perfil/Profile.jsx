import Sidebar from "../../../components/Sidebar/Sidebar"
import { Box } from "@mui/material"
import ProfileHead from "./ProfileHead"

const Profile = () => {
    return (
        <>
            <Sidebar />
            <Box width='100%'>
                <ProfileHead />
            </Box>
        </>
    )
}

export default Profile