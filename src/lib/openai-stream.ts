import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export type ChatGPTAgent = 'user' | 'system';

export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
}

export interface OpenAIStreamPayload  {
    model: 'gpt-3.5-turbo',
    message: ChatGPTMessage[],
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let counter = 0


    const res = await fetch('//localhost:8000/ws/{conversation_id}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const stream = new ReadableStream({ 
        async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === 'event') {
                    const data = event.data
                    if (data === '[DONE]') {
                        controller.close()
                        return
                    }

                    try {
                        const json = JSON.parse(data)
                        console.log("Json",json)
                        const text = json.choice[0].delta?.content || ''
                        console.log("Text",text)

                        if (counter < 2 && (text.match(/\n/) || [].length)) {
                            return 
                        }
                        const queue = encoder.encode(text)
                        controller.enqueue(queue)

                        counter++
                    } catch (error) {   
                        controller.error(error)
                    }
                    
                }
            }
            
        const parser = createParser(onParse)

        for await (const chunk of res.body as any) {
            parser.feed(decoder.decode(chunk))
        }
    }
    });
    return stream 
}