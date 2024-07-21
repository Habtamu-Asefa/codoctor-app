import { FC, useContext } from "react";
import ChatInput from "./ChatInput";
import { LuSendHorizonal } from "react-icons/lu";
import ChatMessages from "./ChatMessages";
import { MessagesContext } from "@/context/messagesContext";

interface ChatProps {
    onMessageSent: () => void

}

const Chat = ({onMessageSent}: ChatProps) => {
    const {message} = useContext(MessagesContext)

    return ( 
        <div className="bg-white rounded-lg w-3/4 ml-24 overflow-auto min-h-screnn ">
            <div className="flex flex-col space-x-5 min-h-screen flex-grow">
                <ChatMessages className="px-2 py-3 flex-1"/>
                <ChatInput className="px-4" onMessageSent={onMessageSent}/>
            </div>
            
        </div>
     );
}
 
export default Chat;