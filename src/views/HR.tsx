import React from 'react';
import { 
    Users, 
    UserPlus, 
    ShieldCheck, 
    Briefcase, 
    Mail, 
    MoreVertical,
    ChevronRight,
    BookOpen
} from 'lucide-react';
import { cn } from '../utils/cn';
import { WorkflowWizard } from '../components/ui/WorkflowWizard';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/apiService';

const EmployeeCard = ({ name, role, dept, status }: any) => (
  <div className="glass p-5 rounded-[24px] flex items-center gap-4 group hover:border-brand-gold/30 transition-all cursor-pointer">
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-lg text-brand-gold border border-white/10 group-hover:scale-110 transition-transform">
      {name.charAt(0)}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-sm text-white">{name}</h4>
      <p className="text-[10px] text-slate-500 font-medium">{role}</p>
    </div>
    <div className="text-right">
      <span className={cn(
        "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
        status === 'Active' ? "bg-green-500/10 text-green-400" : "bg-brand-gold/10 text-brand-gold"
      )}>
        {status}
      </span>
      <p className="text-[10px] text-slate-400 mt-1">{dept}</p>
    </div>
    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-600 hover:text-white transition-colors">
      <MoreVertical size={16} />
    </button>
  </div>
);

export const HR: React.FC = () => {
  const [isWizardOpen, setIsWizardOpen] = React.useState(false);

  const { data: employeeData } = useQuery({
    queryKey: ['employees'],
    queryFn: () => apiService.getEmployees(),
    retry: 1
  });

  const employees = employeeData?.employees || [
    { id: '1', name: "Sarah Connor", role: "Site Manager", department: "Construction", status: "Active" },
    { id: '2', name: "John Wick", role: "Security Specialist", department: "Logistics", status: "On Leave" },
    { id: '3', name: "Ellen Ripley", role: "Machinery Expert", department: "Manufacturing", status: "Active" },
    { id: '4', name: "Rick Deckard", role: "Quality Assurance", department: "Manufacturing", status: "Active" },
    { id: '5', name: "Dana Scully", role: "Onboarding", department: "HR", status: "Active" },
    { id: '6', name: "Fox Mulder", role: "Project Architect", department: "Construction", status: "Active" },
  ];

  return (
    <div className="space-y-8">
      <WorkflowWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2 underline decoration-brand-gold decoration-4 underline-offset-8">HUMAN <span className="text-brand-gold">HUB</span></h1>
          <p className="text-slate-400 font-medium mt-4">Manage workforce, policies, and onboarding workflows.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors text-sm">
            <BookOpen size={18} />
            POLICY BASE
          </button>
          <button 
            onClick={() => setIsWizardOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-gold text-slate-950 font-black hover:scale-105 transition-transform glow-gold text-sm"
          >
            <UserPlus size={18} />
            NEW ONBOARDING
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Employee Directory */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="text-brand-gold" />
              Resource Directory
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((emp: any) => (
              <EmployeeCard key={emp.id} name={emp.name} role={emp.role} dept={emp.department} status={emp.status} />
            ))}
          </div>
        </div>

        {/* Workflows & Knowledge */}
        <div className="space-y-6">
          <div className="glass-darker p-6 rounded-[32px] border border-white/5 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <ShieldCheck className="text-brand-blue" />
              Active Workflows
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Onboarding: Jan Doe', progress: 75 },
                { name: 'Review: Project Alpha', progress: 20 },
              ].map((wf, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-2xl space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{wf.name}</span>
                    <span className="text-slate-500">{wf.progress}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-blue" style={{ width: `${wf.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 text-xs font-bold text-brand-blue hover:text-white transition-colors flex items-center justify-center gap-2 group">
              View All Workflows
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="glass p-6 rounded-[32px] border border-white/5 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
               Quick Resources
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Insurance', icon: ShieldCheck },
                { label: 'Payroll', icon: Briefcase },
                { label: 'Contacts', icon: Mail },
                { label: 'Training', icon: BookOpen },
              ].map((res, i) => (
                <button key={i} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <res.icon className="text-slate-400" size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{res.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
