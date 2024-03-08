import Sidebar from "../../../components/Sidebar/Sidebar";
import { ChatProvider } from "./ChatContext";
import WhatsappSenders from "./WhatsappSenders";

const WhatsappChat = () => {
    return (
        <Sidebar>
            <ChatProvider>
                <WhatsappSenders />
                {/* ... */}
            </ChatProvider>
        </Sidebar>
    )
}

export default WhatsappChat;