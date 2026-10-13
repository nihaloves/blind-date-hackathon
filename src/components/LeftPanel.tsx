import React from 'react';
import { GameState } from '../types';
import { Droplet, Wind, Utensils, Zap, Shield, Heart, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LeftPanelProps {
  state: GameState;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ state }) => {
  const renderBar = (label: string, value: number, unit: string, icon: React.ReactNode, isImproving: boolean) => {
    let colorClass = 'bg-cyan-500';
    let statusText = 'NORMAL';
    let statusColor = 'text-emerald-400';

    if (value <= 20) {
      colorClass = 'bg-red-500 animate-pulse';
      statusText = 'CRITICAL';
      statusColor = 'text-red-400';
    } else if (value <= 40) {
      colorClass = 'bg-amber-500';
      statusText = 'LOW';
      statusColor = 'text-amber-400';
    }

    return (
      <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80 mb-3">
        <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            {icon}
            <span className="font-semibold">{label}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`font-bold ${statusColor}`}>{statusText}</span>
            <span className="text-white font-bold">{value}{unit}</span>
          </div>
        </div>
        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div 
            className={`h-full transition-all duration-500 rounded-full ${colorClass}`} 
            style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col h-full backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800 font-mono text-xs text-cyan-400">
        <span>SURVIVAL TELEMETRY</span>
        <span className="animate-pulse">● LIVE</span>
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto pr-1">
        {renderBar('Water Reserves', state.water, '%', <Droplet className="w-4 h-4 text-cyan-400" />, state.waterRecycling === 'FUNCTIONAL')}
        {renderBar('Oxygen Level', state.oxygen, '%', <Wind className="w-4 h-4 text-cyan-400" />, !state.oxygenLeak)}
        {renderBar('Ration Stores', state.food, '%', <Utensils className="w-4 h-4 text-amber-400" />, false)}
        {renderBar('Power Grid', state.power, '%', <Zap className="w-4 h-4 text-yellow-400" />, state.solarArray === 'OPTIMAL')}
        {renderBar('Habitat Pressure', state.habitatPressure, '%', <Shield className="w-4 h-4 text-emerald-400" />, !state.pressureLeak)}
        {renderBar('Crew Health', state.crewHealth, '%', <Heart className="w-4 h-4 text-rose-400" />, true)}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <div className="text-xs font-mono text-slate-400 mb-2">CREW STATUS</div>
        <div className="space-y-2">
          {state.crew.map((member) => (
            <div key={member.id} className="bg-slate-950/80 p-2 rounded border border-slate-800/60 flex items-center justify-between font-mono text-xs">
              <div>
                <div className="text-slate-200 font-semibold">{member.name}</div>
                <div className="text-[10px] text-slate-500">{member.role}</div>
              </div>
              <div className="text-right">
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                  member.status === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                  member.status === 'FATIGUED' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                  'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                }`}>
                  {member.status} ({member.health}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
