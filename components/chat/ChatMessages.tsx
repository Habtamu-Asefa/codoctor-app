import { MessagesContext } from '@/context/messagesContext';
import { cn } from '@/lib/utils';
import {FC, HTMLAttributes, useContext} from 'react'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}
const ChatMessages:FC<ChatMessagesProps> = ({ className, ...props}) => {
    const {message} = useContext(MessagesContext)
    const inverseMessage = [...message].reverse()

    return (  
        <div {...props} className='flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-rounded scrollbar-track-blue-lighter '>
            <div className='flex-1 flex-grow'>
                {inverseMessage.map((message) => (
                    <div key={message.id} className='chat-message '>
                        <div className={cn ('flex items-end', {'justify-end': message.isUserMessage} )}>
                            <div className= {cn ('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden ', 
                                {'bg-blue-400 text-white ' : message.isUserMessage,
                                 'bg-gray-200': !message.isUserMessage})}> 
                                {/* <Markdown text = {message.text} /> */}
                            </div>
                        </div>
                </div>
             ))}
            ChatMessage
        </div>
        </div>

    )
}
 
export default ChatMessages;