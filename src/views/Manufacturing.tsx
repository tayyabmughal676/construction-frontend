import React from 'react';
import { 
    Package, 
    Settings, 
    Activity, 
    ShieldCheck, 
    Clock, 
    Trash2, 
    Edit, 
    Zap,
    ArrowUpRight
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/apiService';

const InventoryTable = ({ data }: any) => (
    <div className="glass-darker rounded-[32px] overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-white/5">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Component</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">SKU</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Stock Level</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Location</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {data.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4 font-bold text-sm">{item.component}</td>
                            <td className="px-6 py-4 text-xs text-slate-400 font-mono">{item.sku}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold">{item.stock}</span>
                                    <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div 
                                            className={cn(
                                                "h-full rounded-full",
                                                item.status === 'Optimal' ? "bg-green-500" : item.status === 'Low Stock' ? "bg-brand-gold" : "bg-red-500"
                                            )} 
                                            style={{ width: item.status === 'Optimal' ? '80%' : item.status === 'Low Stock' ? '30%' : '10%' }}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                                    item.status === 'Optimal' ? "bg-green-500/10 text-green-400" : item.status === 'Low Stock' ? "bg-brand-gold/10 text-brand-gold" : "bg-red-500/10 text-red-500"
                                )}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-xs font-medium text-slate-400">{item.location}</td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Edit size={14} /></button>
                                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export const Manufacturing: React.FC = () => {
    const { data: invData } = useQuery({
        queryKey: ['inventory'],
        queryFn: () => apiService.getInventory(),
        retry: 1
    });

    const { data: statsData } = useQuery({
        queryKey: ['mfg-stats'],
        queryFn: () => apiService.getManufacturingStats(),
        retry: 1
    });

    const inventory = invData?.inventory || [
        { component: 'Hydraulic Actuators', sku: 'HA-402-B', stock: 124, status: 'Optimal', location: 'Rack A-04' },
        { component: 'Steel Rebar 12mm', sku: 'RB-12-ST', stock: 8420, status: 'Low Stock', location: 'Zone C' },
        { component: 'Glass Panels (3x4)', sku: 'GP-34-CL', stock: 42, status: 'Optimal', location: 'Rack B-12' },
        { component: 'Nano-Concrete Mix', sku: 'NC-MX-01', stock: 215, status: 'Ordering', location: 'Silo 4' },
        { component: 'Thermal Sensors', sku: 'TH-SN-09', stock: 12, status: 'Critical', location: 'Rack D-01' },
    ];

    const stats = [
        { label: 'OEE Status', value: statsData?.oee || '94.2%', icon: Activity, color: 'text-green-400' },
        { label: 'Active Lines', value: statsData?.activeLines || '12/14', icon: Settings, color: 'text-brand-blue' },
        { label: 'QC Pass Rate', value: statsData?.qcPassRate || '99.8%', icon: ShieldCheck, color: 'text-purple-400' },
        { label: 'Next Cycle', value: '14m 20s', icon: Clock, color: 'text-brand-gold' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white mb-2 underline decoration-brand-blue decoration-4 underline-offset-8">FABRICATION <span className="text-brand-blue">NODE</span></h1>
                    <p className="text-slate-400 font-medium mt-4">Real-time inventory and production health monitoring.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-blue text-white font-black hover:scale-105 transition-transform glow-blue text-sm">
                        <Zap size={18} />
                        ADJUST PRODUCTION
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="glass p-5 rounded-3xl flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-2xl">
                            <stat.icon className={stat.color} size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-black">{stat.label}</p>
                            <p className="text-lg font-black">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Package className="text-brand-blue" />
                        Inventory & Logistics
                    </h2>
                    <button className="flex items-center gap-2 text-brand-blue text-sm font-bold hover:underline">
                        Export Manifest
                        <ArrowUpRight size={14} />
                    </button>
                </div>
                <InventoryTable data={inventory} />
            </div>
        </div>
    );
};
