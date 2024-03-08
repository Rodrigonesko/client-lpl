import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [flushHook, setFlushHook] = useState(false);
    const [whatsappSender, setWhatsappSender] = useState('');

    return (
        <ChatContext.Provider value={{ flushHook, setFlushHook, whatsappSender, setWhatsappSender }}>
            {children}
        </ChatContext.Provider>
    );
};