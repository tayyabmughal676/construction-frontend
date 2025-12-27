import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Sparkles, UserPlus } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { cn } from '../../utils/cn';

interface WorkflowWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WorkflowWizard: React.FC<WorkflowWizardProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: 'Engineering',
        position: 'Specialist'
    });
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleExecute = async () => {
        setIsExecuting(true);
        try {
            const data = await apiService.executeWorkflow(formData);
            setResult(data);
            setStep(3);
        } catch (error) {
            console.error('Workflow error:', error);
            alert('Failed to execute workflow. Check backend status.');
        } finally {
            setIsExecuting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
            />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg glass-darker border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
            >
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                                <UserPlus size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Onboarding Wizard</h3>
                                <p className="text-sm text-slate-400">LangGraph Powered Workflow</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                                        <input 
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                                        <input 
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                    <input 
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
                                        placeholder="john.doe@aerocorp.ai"
                                    />
                                </div>
                                <button 
                                    onClick={() => setStep(2)}
                                    disabled={!formData.firstName || !formData.email}
                                    className="w-full py-4 rounded-2xl bg-brand-gold text-slate-950 font-black hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                                >
                                    CONTINUE
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Target Department</label>
                                    <select 
                                        value={formData.department}
                                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                                        className="w-full bg-slate-900 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none"
                                    >
                                        <option>Engineering</option>
                                        <option>Construction</option>
                                        <option>Manufacturing</option>
                                        <option>HR</option>
                                        <option>Logistics</option>
                                    </select>
                                </div>
                                <div className="p-4 rounded-2xl bg-brand-gold/5 border border-brand-gold/10 flex items-start gap-4">
                                    <div className="p-2 rounded-xl bg-brand-gold/20 text-brand-gold">
                                        <Sparkles size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-brand-gold">AI PRE-PROCESSING</h4>
                                        <p className="text-[10px] text-slate-400 mt-1">Our agents will automatically generate credentials, assign equipment, and create an onboarding checklist for {formData.firstName}.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-4 rounded-2xl bg-white/5 font-bold hover:bg-white/10 transition-all"
                                    >
                                        BACK
                                    </button>
                                    <button 
                                        onClick={handleExecute}
                                        disabled={isExecuting}
                                        className="flex-[2] py-4 rounded-2xl bg-brand-gold text-slate-950 font-black hover:scale-[1.02] active:scale-95 transition-all glow-gold flex items-center justify-center gap-2"
                                    >
                                        {isExecuting ? <Loader2 size={18} className="animate-spin" /> : 'LAUNCH WORKFLOW'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6 py-4"
                            >
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mx-auto">
                                    <CheckCircle2 size={48} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Workflow Initiated</h3>
                                    <p className="text-slate-400 text-sm mt-2">The LangGraph engine has started processing the onboarding for {formData.firstName} {formData.lastName}.</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <span>Session ID</span>
                                        <span className="text-white">{result?.sessionId?.substring(0, 18)}...</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <span>Status</span>
                                        <span className="text-green-500">{result?.status}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="w-full py-4 rounded-2xl bg-white/10 font-bold hover:bg-white/20 transition-all"
                                >
                                    CLOSE
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};
