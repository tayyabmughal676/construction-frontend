# 🛰️ AeroCorp Intelligence Interface

A high-fidelity, future-industrial frontend application designed to interface with the **Multi-Agent Enterprise Backend**. Built for the modern aerospace and construction industry, this interface provides real-time control over automated workflows and department-specific agents.

## 🚀 Key Features

### 🛠️ Workflow Center (Default Landing)
*   **LangGraph Integration**: Direct interface to trigger and monitor complex multi-step state-graph workflows.
*   **Real-time Tracking**: Monitor execution status and session history across the enterprise.

### 🏢 Department Hubs
*   **👥 HR Hub**: Manage workforce directory, employee onboarding, and policy queries.
*   **🏗️ Site Terminal**: Real-time construction project tracking with resource allocation and budget monitoring.
*   **🏭 Fabrication Node**: Live manufacturing inventory control with OEE and quality metrics visualization.

### 🤖 AI Alpha Terminal (Intelligence Overlay)
*   **Unified Chat**: A floating NLP command center powered by an intelligent agent router.
*   **Context Awareness**: Detects departments automatically (HR, Construction, Manufacturing) to route queries to the correct specialized agent.
*   **Tool Visualization**: Displays real-time tool usage (calculators, generators, databases) during AI interactions.

### 📡 System Monitoring
*   **Live Health Check**: Real-time connection status pulse for the backend ecosystem.
*   **Capabilities Discovery**: Dynamically identifies and highlights active/registered agent departments in the sidebar.

## ⚙️ Tech Stack

*   **Core**: React 18 + TypeScript + Vite
*   **Styling**: Tailwind CSS 4.0 (Custom industrial theme)
*   **State Management**: TanStack React Query v5 (Server state)
*   **Animations**: Framer Motion (Glassmorphism & fluid transitions)
*   **Icons**: Lucide React
*   **Networking**: Axios with centralized API Service

## 🛠️ Project Setup

### 1. Installation
```bash
npm install
# or
bun install
```

### 2. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 3. Backend Integration
The frontend is configured with a Vite proxy to talk to the backend at `http://localhost:3000`.
Ensure your Multi-Agent backend is running for the **Network Status** to show "Secure".

## 📂 Project Structure

*   `src/services/apiService.ts`: Centralized hub for all backend interactions.
*   `src/hooks/useChat.ts`: Primary hook for agentic chat interactions.
*   `src/views/`: Individual specialized department hubs.
*   `src/components/`: Reusable UI modules (Sidebar, ChatOverlay, WorkflowWizard).
*   `src/types/`: Unified TypeScript interfaces mapped to the `frontend-api-specs.md`.

---
*Built for the Future of Industrial Intelligence.*
