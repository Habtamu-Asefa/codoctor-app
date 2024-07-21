"use client";

import { MessagesContext } from "@/context/messagesContext";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { FC, useContext, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import TextareaAutosize from "react-textarea-autosize";



interface ChatInputProps extends React.HTMLAttributes<HTMLDivElement> {
    onMessageSent: () => void
}

const ChatInput: FC<ChatInputProps> = ({className,onMessageSent, ...props}) => {
    const [input, setInput] = useState('');
    const { message, addMessage, removeMessage, updateMessage, setIsMessageUpdating} = useContext(MessagesContext)
    const textareaRef = useRef<null | HTMLTextAreaElement> (null)


    const {mutate: sendMessage, } = useMutation({
        mutationKey: ['sendMessage'],
        mutationFn: async (messages: Message) => {
            const response = await fetch('//localhost:8000/ws/{conversation_id}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message})
            })
            return response.body
            },

            onMutate(message) {
                addMessage(message)
                onMessageSent()
            },
        
        onSuccess: async (stream) => {
            if (!stream) throw new Error('Failed to generate message')
            
            const id = nanoid()
            const responseMessage: Message = {
                id,
                isUserMessage: false,
                text: '',
            }
            addMessage(responseMessage)

            setIsMessageUpdating(true)


            const reader = stream.getReader()
            const decoder = new TextDecoder()

            let done = false
            while (!done) {
                const {value, done: doneReading} = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value)
                updateMessage(id, (prevText) => prevText + chunkValue)
                console.log(chunkValue)


            console.log("Sucessfully sent message")
        }
        setIsMessageUpdating(false)
        setInput('')

        setTimeout(() => {
            textareaRef.current?.focus()

     
        },10)
    
    }
})



    return (
        <div {...props} className={cn('flex items-center justify-center p-4', className)}>
            <div className="flex items-center w-full max-w-3xl bg-white rounded-full shadow-md border-gray-900 p-4 space-x-4 mt-64">
                <TextareaAutosize
                ref = {textareaRef}
                    rows={2}
                    maxRows={4}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' &&  !e.shiftKey) {
                            e.preventDefault()

                            const message = {
                                id: nanoid(),
                                isUserMessage: true,
                                text: input
                            }
                            sendMessage(message)
                        } }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    placeholder="Ask?"
                    className="flex-grow resize-none rounded-lg peer disabled:opacity-50 pr-14 border-0 text-gray-900 w-1/2 focus:ring-0 py-1.5 text-lg"
                />
                <button className="text-2xl  px-4 py-2 rounded-full  focus:outline-none "
                >
                     <LuSendHorizonal />
                </button>

            </div>
        </div>
    );
}
 
export default ChatInput;