export type AgentType = 'HR' | 'CONSTRUCTION' | 'MANUFACTURING' | 'GENERAL';

export interface DepartmentDetection {
    department: string;
    confidence: number;
    reason: string;
    action?: string;
    method: 'llm' | 'keyword' | 'context';
    parameters?: Record<string, any>;
}

export interface AgentResponse {
    sessionId: string;
    department: string;
    message: string;
    toolsUsed?: string[];
    data?: any;
    error?: string;
    detection?: DepartmentDetection;
}

export interface WorkflowExecutionResult {
    sessionId: string;
    success: boolean;
    status: 'completed' | 'failed' | 'running';
    results: Array<{ node: string; result: any }>;
    errors: string[];
    finalData: any;
}

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    department?: string;
    timestamp: Date;
    tools?: string[];
    parameters?: Record<string, any>;
    detection?: DepartmentDetection;
    data?: any;
}

export interface Project {
    id: string;
    name: string;
    status: 'In Progress' | 'Completed' | 'On Hold' | 'Delayed';
    progress: number;
    budget: number;
    spent: number;
    timeline: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'In Production';
    location: string;
}

export interface Employee {
    id: string;
    name: string;
    role: string;
    department: AgentType;
    status: 'Active' | 'On Leave' | 'Onboarding';
    email: string;
    avatar?: string;
}

export interface WorkflowStatus {
    id: string;
    name: string;
    steps: {
        id: string;
        label: string;
        completed: boolean;
        current: boolean;
    }[];
}
