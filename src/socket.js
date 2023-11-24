import io from 'socket.io-client';
let socket

const connectSocket = (name) => {
    socket = io(process.env.REACT_APP_CHAT_SERVICE, {
        query: `name=${name}`
    });
}

export { connectSocket, socket }