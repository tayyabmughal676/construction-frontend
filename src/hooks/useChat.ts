import { useState, useCallback } from 'react';
import axios from 'axios';
import { Message, AgentResponse } from '../types';

const BASE_URL = '/api';

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);

    const sendMessage = useCallback(async (content: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await axios.post<AgentResponse>(`${BASE_URL}/agents/chat`, {
                message: content,
                sessionId: sessionId,
            });

            const data = response.data;

            // Update sessionId if returned by backend
            if (data.sessionId && !sessionId) {
                setSessionId(data.sessionId);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.message,
                timestamp: new Date(),
                department: data.department,
                tools: data.toolsUsed,
                detection: data.detection,
                data: data.data
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: '⚠️ Failed to connect to the intelligence terminal. Please ensure the backend is running.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [sessionId]);

    return {
        messages,
        sendMessage,
        isLoading,
        sessionId
    };
};
