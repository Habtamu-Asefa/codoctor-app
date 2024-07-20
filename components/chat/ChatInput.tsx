"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";



interface ChatInputProps extends React.HTMLAttributes<HTMLDivElement> {
    
}

const ChatInput: FC<ChatInputProps> = ({className, ...props}) => {
    const [input, setInput] = useState('');

    const {mutate: sendMessage, } = useMutation({
        mutationFn: async (message: Message) => {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message: [message]})
            })
            return response.body
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error('Failed to generate message')

            const reader = stream.getReader()
            const decoder = new TextDecoder()

            let done = false
            while (!done) {
                const {value, done: doneReading} = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value)
                console.log(chunkValue)


            console.log("Sucessfully sent message")
        }
        }
    })



    return (
        <div {...props} className={cn('border-0', className)}>
            <div className="p-4 space-x-4">
                <TextareaAutosize
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
                    placeholder="What can I help?"
                    className="peer disabled:opacity-50 pr-14 border-0 resize-none w-1/2 bg-blue-200  focus:ring-0 py-1.5 text.gray-800 text-lg"
                />

            </div>
        </div>
    );
}
 
export default ChatInput;