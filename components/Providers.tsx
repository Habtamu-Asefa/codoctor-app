"use client";

import { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MessagesProvider } from '@/context/messagesContext'

interface ProviderProps {
    children: React.ReactNode
}

const Providers: FC<ProviderProps> = ({children}) => {
    const queryClient = new QueryClient
  return <QueryClientProvider client={queryClient}>
    <MessagesProvider>
        {children}
    </MessagesProvider>
    
    </QueryClientProvider>
}

export default Providers