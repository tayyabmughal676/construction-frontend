import React from 'react';
import { motion } from 'framer-motion';
import { 
    HardHat, 
    Search, 
    Filter, 
    BarChart,
    MapPin,
    ArrowRight,
    Plus
} from 'lucide-react';
import { cn } from '../utils/cn';
import { apiService } from '../services/apiService';
import { useQuery } from '@tanstack/react-query';

const ProjectCard = ({ name, location, deadline, budget, progress, status }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-6 rounded-[32px] border border-white/5 space-y-4"
  >
    <div className="flex justify-between items-start">
      <div className="bg-brand-gold/10 p-3 rounded-2xl">
        <HardHat className="text-brand-gold" />
      </div>
      <span className={cn(
        "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
        status === 'On Track' ? "bg-green-500/10 text-green-400" : "bg-brand-gold/10 text-brand-gold"
      )}>
        {status}
      </span>
    </div>
    
    <div>
      <h3 className="text-lg font-bold text-white leading-tight mb-1">{name}</h3>
      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
        <MapPin size={12} />
        {location}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 py-2">
      <div className="space-y-0.5">
        <p className="text-[10px] text-slate-500 uppercase font-black">Budget</p>
        <p className="text-sm font-bold">${budget}</p>
      </div>
      <div className="space-y-0.5 text-right">
        <p className="text-[10px] text-slate-500 uppercase font-black">Deadline</p>
        <p className="text-sm font-bold">{deadline}</p>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black">
        <span className="text-slate-500 uppercase">Stage: Structure</span>
        <span className="text-white">{progress}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-brand-gold rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </div>

    <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2 group">
      Project Details
      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

export const Construction: React.FC = () => {
  const { data: projectData } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiService.getProjects(),
    retry: 1
  });

  const projects = projectData?.projects || [
    { id: '1', name: "Skyline Tower Phase II", location: "New York, USA", deadline: "Oct 2026", budget: "125.4M", progress: 68, status: "On Track" },
    { id: '2', name: "Dubai Lunar Port", location: "UAE", deadline: "Jan 2028", budget: "2.4B", progress: 42, status: "Under Review" },
    { id: '3', name: "Berlin Green Factory", location: "Berlin, DE", deadline: "Dec 2025", budget: "85.2M", progress: 85, status: "On Track" },
    { id: '4', name: "Tokyo Vertical Hub", location: "Tokyo, JP", deadline: "Mar 2027", budget: "450M", progress: 15, status: "On Track" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 underline decoration-brand-gold decoration-4 underline-offset-8">SITE <span className="text-brand-gold">TERMINAL</span></h1>
          <p className="text-slate-400 font-medium mt-4">Active construction projects and resource allocation.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-gold text-slate-950 font-black hover:scale-105 transition-transform glow-gold text-sm">
          <Plus size={18} />
          INITIATE PROJECT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            placeholder="Search projects..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-colors">
          <Filter size={18} />
          Advanced Filters
        </button>
        <button 
            onClick={async () => {
                try {
                    const response = await apiService.directChat('construction', 'Calculate cost for Tokyo Hub');
                    alert(`Direct Chat Result: ${response.message}`);
                } catch (e) {
                    alert('Direct chat failed. Check backend.');
                }
            }}
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-colors"
        >
          <BarChart size={18} />
          Cost Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj: any) => (
          <ProjectCard 
            key={proj.id}
            name={proj.name}
            location={proj.location}
            deadline={proj.deadline}
            budget={proj.budget}
            progress={proj.progress}
            status={proj.status}
          />
        ))}
      </div>
    </div>
  );
};
