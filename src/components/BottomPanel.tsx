import React from 'react';
import { GameState } from '../types';
import { Play, Clock, Terminal, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface BottomPanelProps {
  state: GameState;
  onAdvanceDay: () => void;
}

export const BottomPanel: React.FC<BottomPanelProps> = ({ state, onAdvanceDay }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-sm">
      {/* Advance Day Action CTA */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <button
          onClick={onAdvanceDay}
          className="flex-1 md:flex-initial px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-black tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all flex items-center justify-center space-x-3 cursor-pointer group"
        >
          <Play className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition-transform" />
          <span>ADVANCE TO DAY {state.day + 1}</span>
        </button>
        <div className="hidden lg:block text-xs font-mono text-slate-400">
          <div>TURNS SIMULATION 24H</div>
          <div className="text-cyan-400">RESCUE IN {state.rescueEta} DAYS</div>
        </div>
      </div>

      {/* Mission Log / History Ticker */}
      <div className="flex-1 w-full bg-slate-950/80 border border-slate-800 rounded-lg p-3 overflow-hidden flex flex-col justify-center h-20">
        <div className="flex items-center space-x-2 mb-1 font-mono text-[10px] text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>MISSION EVENT LOG (RECENT)</span>
        </div>
        <div className="overflow-y-auto space-y-1 pr-1 max-h-12 font-mono text-xs">
          {state.logs.slice(0, 3).map((log, index) => (
            <div key={index} className="flex items-center space-x-2 text-slate-300">
              <span className="text-cyan-500 font-bold">DAY {log.day}:</span>
              <span className={`font-semibold ${
                log.type === 'CRITICAL' ? 'text-red-400' :
                log.type === 'WARNING' ? 'text-amber-400' :
                log.type === 'SUCCESS' ? 'text-emerald-400' : 'text-slate-200'
              }`}>{log.title}</span>
              <span className="text-slate-500 truncate hidden md:inline">— {log.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
