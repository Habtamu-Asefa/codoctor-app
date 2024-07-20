import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { createContext, useState } from "react";

export const MessagesContext = createContext<{
    message: Message[]
    isMessageUpdating: boolean
    addMessage: (message: Message) => void
    removeMessage: (id: string) => void
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void
    setIsMessageUpdating: (isUpdating: boolean) => void
}>({
    message: [],
    isMessageUpdating: false,
    addMessage: () => {},  
    removeMessage: () => {},
    updateMessage: () => {},
    setIsMessageUpdating: () => {}
})

export function MessagesProvider({children}: {children: React.ReactNode}) {

    const [message, setMessage] = useState<Message[]>([{
        id: nanoid(),
        text: 'Hello, how can I help you?',
        isUserMessage: false
    }])

    const [isMessageUpdating, setIsMessageUpdating] = useState(false)

    const addMessage = (message: Message) => {
        setMessage(prevMessage => [...prevMessage, message])
    }

    const removeMessage = (id: string) => {
        setMessage(prevMessage => prevMessage.filter(message => message.id !== id))
    }

    const updateMessage = (
        id: string,
        updateFn: (prevText: string) => string) => {
            setMessage((prevMessage) => prevMessage.map((message) => {
                if (message.id === id) {
                    return {...message, text: updateFn(message.text)}
                }
                return message
            })
        )
        }  



    return <MessagesContext.Provider value={{
        message,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating
    }}>{children}</MessagesContext.Provider>
}