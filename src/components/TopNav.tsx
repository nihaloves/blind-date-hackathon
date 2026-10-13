import React from 'react';
import { GameState } from '../types';
import { 
  Droplet, Wind, Utensils, Zap, Shield, Heart, 
  RotateCcw, AlertTriangle, CheckCircle2, AlertOctagon 
} from 'lucide-react';

interface TopNavProps {
  state: GameState;
  onRestart: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ state, onRestart }) => {
  const getStatusBadge = () => {
    switch (state.status) {
      case 'STABLE':
        return <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-mono rounded flex items-center space-x-1.5"><CheckCircle2 className="w-3.5 h-3.5" /><span>STABLE</span></span>;
      case 'WARNING':
        return <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs font-mono rounded flex items-center space-x-1.5"><AlertTriangle className="w-3.5 h-3.5" /><span>WARNING</span></span>;
      case 'CRITICAL':
        return <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-mono rounded flex items-center space-x-1.5 animate-pulse"><AlertOctagon className="w-3.5 h-3.5" /><span>CRITICAL</span></span>;
      default:
        return null;
    }
  };

  return (
    <header className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
          <span className="font-mono font-black tracking-wider text-white text-lg">MOONLOOP: STRANDED</span>
        </div>
        <div className="hidden md:flex items-center space-x-1 text-xs font-mono text-slate-400 border-l border-slate-700 pl-4">
          <span>MISSION CONTROL v2.4</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-6">
        <div className="bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800 font-mono text-xs flex items-center space-x-2">
          <span className="text-slate-400">DAY:</span>
          <span className="text-cyan-400 font-bold text-sm">{state.day} / 14</span>
        </div>

        <div className="bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800 font-mono text-xs flex items-center space-x-2">
          <span className="text-slate-400">RESCUE ETA:</span>
          <span className="text-amber-400 font-bold text-sm">{state.rescueEta} DAYS</span>
        </div>

        <div className="bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800 font-mono text-xs flex items-center space-x-2">
          <span className="text-slate-400">CREW:</span>
          <span className="text-emerald-400 font-bold text-sm">{state.crewCount}</span>
        </div>

        <div className="bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800 font-mono text-xs flex items-center space-x-2">
          <span className="text-slate-400">SPARE PARTS:</span>
          <span className="text-cyan-400 font-bold text-sm">{state.spareParts}</span>
        </div>

        {getStatusBadge()}

        <button
          onClick={onRestart}
          title="Restart Mission"
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
