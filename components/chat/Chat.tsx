import { FC } from "react";
import ChatInput from "./ChatInput";
import { LuSendHorizonal } from "react-icons/lu";
import ChatMessages from "./ChatMessages";

const Chat: FC = () => {
    return ( 
        <div className="bg-white border border-gray-200 rounded-lg w-3/4 ml-24 overflow-auto min-h-screnn">
            <div className="flex flex-col space-x-5 min-h-screen ">
                <ChatMessages className="px-2 py-3 flex-1"/>
                <ChatInput className="px-4" />
                {/* <button className="flex items-center rounded-full text-lg mr-8 p-4">
                    <LuSendHorizonal />
                </button> */}
            </div>
            
        </div>
     );
}
 
export default Chat;