import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, } from "@mui/material";
import UploadTele from "./UploadTele";
import UploadRn from "./UploadRn";
import UploadUrgenciaEmergencia from "./UploadUrgenciaEmergencia";

const UploadPropostasEntrevistaV2 = () => {

    return (
        <Sidebar>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    flexWrap: 'wrap',
                    gap: 2
                }}
                maxWidth={'xl'}
            >
                <UploadTele />
                <UploadRn />
                <UploadUrgenciaEmergencia />
            </Container>
        </Sidebar>

    );
};


export default UploadPropostasEntrevistaV2;