import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatOverlay } from './components/ChatOverlay';
import { HR } from './views/HR';
import { Construction } from './views/Construction';
import { Manufacturing } from './views/Manufacturing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Terminal,
    Cpu
} from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { apiService } from './services/apiService';

function App() {
    const [activeView, setActiveView] = useState('workflows');

    const { data: healthData } = useQuery({
        queryKey: ['health'],
        queryFn: () => apiService.checkHealth(),
        refetchInterval: 10000,
    });

    const isHealthy = healthData?.status === 'healthy';

    const { data: workflowsData } = useQuery({
        queryKey: ['workflows'],
        queryFn: () => apiService.listWorkflows(),
        enabled: isHealthy,
    });

    const renderView = () => {
        switch (activeView) {
            case 'hr': return <HR />;
            case 'construction': return <Construction />;
            case 'manufacturing': return <Manufacturing />;
            case 'workflows':
            default: return (
                <div className="space-y-8">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-white mb-2 underline decoration-brand-violet decoration-4 underline-offset-8">WORKFLOW <span className="text-brand-violet">CENTER</span></h1>
                            <p className="text-slate-400 font-medium mt-4">Automated enterprise processes powered by LangGraph.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workflowsData?.workflows?.map((wf: any) => (
                            <motion.div 
                                key={wf.id || wf.name}
                                whileHover={{ y: -5 }}
                                className="glass p-6 rounded-[32px] border border-white/5 space-y-4"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-brand-violet/10 flex items-center justify-center text-brand-violet">
                                    <Cpu size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{wf.name}</h3>
                                    <p className="text-xs text-slate-500 mt-1">{wf.description || 'Enterprise automated agentic workflow.'}</p>
                                </div>
                                <button className="w-full py-3 rounded-xl bg-brand-violet/10 hover:bg-brand-violet text-brand-violet hover:text-white text-xs font-bold transition-all">
                                    Launch Workflow
                                </button>
                            </motion.div>
                        )) || (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4">
                                <div className="w-20 h-20 rounded-3xl bg-brand-violet/10 flex items-center justify-center text-brand-violet animate-pulse">
                                    <Cpu size={40} />
                                </div>
                                <h2 className="text-2xl font-bold">Workflow Engine</h2>
                                <p className="text-slate-400 max-w-md">The LangGraph engine is currently waiting for active workflow definitions.</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex h-screen bg-brand-slate-950 text-white overflow-hidden">
            {/* Sidebar */}
            <Sidebar activeView={activeView} setActiveView={setActiveView} />

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-brand-slate-950/50 backdrop-blur-md z-40">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                            <Terminal size={14} className={isHealthy ? "text-brand-gold" : "text-red-500"} />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Network Status: <span className={isHealthy ? "text-green-500" : "text-red-500"}>{isHealthy ? "Secure" : "Disconnected"}</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-gold to-brand-violet" />
                            <div className="text-left hidden sm:block">
                                <p className="text-[10px] font-bold leading-none">Admin User</p>
                                <p className="text-[8px] text-slate-500 uppercase font-black">Executive</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* View Content */}
                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeView}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {renderView()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none" />
            </main>

            {/* Chat Terminal Overlay */}
            <ChatOverlay />
        </div>
    );
}

export default App;
