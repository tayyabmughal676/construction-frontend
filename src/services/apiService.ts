import axios from 'axios';
import {
    AgentResponse,
    WorkflowExecutionResult
} from '../types';

const BASE_URL = '/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    // Agents
    async getCapabilities() {
        const response = await api.get('/agents/capabilities');
        return response.data;
    },

    // Workflows
    async executeWorkflow(context: any, sessionId?: string) {
        const response = await api.post<WorkflowExecutionResult>('/workflows/langgraph/execute', {
            context,
            sessionId,
        });
        return response.data;
    },

    async listWorkflows() {
        const response = await api.get('/workflows/list');
        return response.data;
    },

    // Health
    async checkHealth() {
        const response = await api.get('/health');
        return response.data;
    },

    // Direct Department fallback
    async directChat(department: string, message: string, sessionId?: string) {
        const response = await api.post<AgentResponse>(`/${department}/chat`, {
            message,
            sessionId,
        });
        return response.data;
    },

    // Department Data Endpoints
    async getEmployees() {
        const response = await api.get('/hr/employees');
        return response.data;
    },

    async getProjects() {
        const response = await api.get('/construction/projects');
        return response.data;
    },

    async getInventory() {
        const response = await api.get('/manufacturing/inventory');
        return response.data;
    },

    async getManufacturingStats() {
        const response = await api.get('/manufacturing/stats');
        return response.data;
    },

    async executeTool(department: string, toolName: string, payload: any) {
        const response = await api.post(`/${department}/tools/${toolName}`, payload);
        return response.data;
    }
};
