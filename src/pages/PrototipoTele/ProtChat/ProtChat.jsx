import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(`http://18.230.122.26:3001`);

const ProtChat = () => {

    useEffect(() => {
        socket.on('receivedMessage', async (message) => {
            console.log('Mensagem recebida:', message); // Adicione este log
        });
    }, []);

    return (
        <>

        </>
    )
}

export default ProtChat