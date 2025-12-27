import React from 'react';
import { 
    Users, 
    HardHat, 
    Factory, 
    ChevronLeft,
    ChevronRight,
    Workflow
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/apiService';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navItems = [
    { id: 'workflows', label: 'Workflows', icon: Workflow },
    { id: 'hr', label: 'HR Hub', icon: Users },
    { id: 'construction', label: 'Construction', icon: HardHat },
    { id: 'manufacturing', label: 'Manufacturing', icon: Factory },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const { data: capData } = useQuery({
    queryKey: ['capabilities'],
    queryFn: () => apiService.getCapabilities(),
    refetchInterval: 30000,
  });

  const activeDepts = capData?.registered_departments || [];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="h-screen glass-darker border-r border-white/5 flex flex-col relative z-50"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center glow-gold">
          <HardHat className="text-slate-950 w-5 h-5" />
        </div>
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-lg tracking-tight text-white"
          >
            AERO<span className="text-brand-gold">CORP</span>
          </motion.span>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActiveDept = activeDepts.includes(item.id.toLowerCase());
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                activeView === item.id 
                  ? "bg-brand-gold/10 text-brand-gold" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0",
                activeView === item.id ? "text-brand-gold" : "group-hover:scale-110 transition-transform"
              )} />
              {!isCollapsed && (
                <div className="flex flex-1 items-center justify-between">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                  {isActiveDept && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  )}
                </div>
              )}
              {activeView === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-brand-gold rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center text-slate-950 hover:scale-110 transition-transform shadow-lg"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
};
