import React from 'react';
import { GameState } from '../types';
import { AlertTriangle, ShieldCheck, Zap, Droplet, Wind } from 'lucide-react';

interface CenterPanelProps {
  state: GameState;
}

export const CenterPanel: React.FC<CenterPanelProps> = ({ state }) => {
  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Visual Habitat SVG Container */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm min-h-[300px]">
        {/* Earth visible above lunar horizon */}
        <div className="absolute top-4 right-6 flex items-center space-x-2 font-mono text-[10px] text-slate-400">
          <span>EARTH ORBIT</span>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-300 shadow-[0_0_15px_rgba(0,150,255,0.4)]" />
        </div>

        <div className="absolute top-4 left-6 font-mono text-[10px] text-cyan-400">
          <div>MARE TRANQUILLITATIS</div>
          <div className="text-slate-500">SECTOR 3 HABITAT</div>
        </div>

        {/* SVG Habitat Illustration */}
        <div className="w-full max-w-md h-56 relative flex items-center justify-center my-auto">
          <svg viewBox="0 0 500 300" className="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            {/* Lunar Surface line */}
            <path d="M 0 240 Q 250 260 500 240 L 500 300 L 0 300 Z" fill="#1e293b" opacity="0.6" />
            <path d="M 0 240 Q 250 260 500 240" stroke="#334155" strokeWidth="3" fill="none" />

            {/* Solar Arrays */}
            <g transform="translate(60, 140)">
              <rect x="0" y="0" width="90" height="45" rx="4" fill="#0f172a" stroke="#00f0ff" strokeWidth="1.5" />
              <path d="M 30 0 L 30 45 M 60 0 L 60 45 M 0 15 L 90 15 M 0 30 L 90 30" stroke="#00f0ff" strokeWidth="0.75" opacity="0.4" />
              {state.solarArray === 'OPTIMAL' ? (
                <text x="15" y="27" fill="#10b981" fontSize="9" fontFamily="monospace">OPTIMAL</text>
              ) : (
                <text x="10" y="27" fill="#f59e0b" fontSize="8" fontFamily="monospace">DAMAGED</text>
              )}
            </g>

            <g transform="translate(350, 140)">
              <rect x="0" y="0" width="90" height="45" rx="4" fill="#0f172a" stroke="#00f0ff" strokeWidth="1.5" />
              <path d="M 30 0 L 30 45 M 60 0 L 60 45 M 0 15 L 90 15 M 0 30 L 90 30" stroke="#00f0ff" strokeWidth="0.75" opacity="0.4" />
              {state.solarArray === 'OPTIMAL' ? (
                <text x="15" y="27" fill="#10b981" fontSize="9" fontFamily="monospace">OPTIMAL</text>
              ) : (
                <text x="10" y="27" fill="#f59e0b" fontSize="8" fontFamily="monospace">DAMAGED</text>
              )}
            </g>

            {/* Central Habitat Dome Module */}
            <path d="M 175 180 C 175 110, 325 110, 325 180 Z" fill="#1e293b" stroke="#00f0ff" strokeWidth="2.5" />
            <rect x="160" y="180" width="180" height="60" rx="6" fill="#0f172a" stroke="#00f0ff" strokeWidth="2.5" />

            {/* Habitat Airlock & Details */}
            <rect x="225" y="195" width="50" height="45" rx="3" fill="#090d16" stroke="#334155" strokeWidth="2" />
            <circle cx="250" cy="217" r="12" fill="#1e293b" stroke="#00f0ff" strokeWidth="1.5" />

            {/* Windows / Glow */}
            <circle cx="210" cy="150" r="10" fill="#00f0ff" opacity="0.7" />
            <circle cx="250" cy="140" r="10" fill="#00f0ff" opacity="0.7" />
            <circle cx="290" cy="150" r="10" fill="#00f0ff" opacity="0.7" />

            {/* Warning Indicator Overlays if Damaged or Leaking */}
            {(state.oxygenLeak || state.pressureLeak || state.waterRecycling === 'FAILED') && (
              <g className="animate-pulse">
                <circle cx="250" cy="100" r="8" fill="#ef4444" />
                <text x="232" y="85" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">ALERT</text>
              </g>
            )}
          </svg>
        </div>

        {/* System Status Indicators Row */}
        <div className="grid grid-cols-3 gap-2 w-full mt-2 font-mono text-xs">
          <div className="bg-slate-950/80 p-2 rounded border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">SOLAR:</span>
            <span className={state.solarArray === 'OPTIMAL' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>{state.solarArray}</span>
          </div>
          <div className="bg-slate-950/80 p-2 rounded border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">WATER REC:</span>
            <span className={state.waterRecycling === 'FUNCTIONAL' ? 'text-emerald-400 font-bold' : state.waterRecycling === 'DEGRADED' ? 'text-amber-400 font-bold' : 'text-red-400 font-bold'}>{state.waterRecycling}</span>
          </div>
          <div className="bg-slate-950/80 p-2 rounded border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">HULL:</span>
            <span className={!state.oxygenLeak && !state.pressureLeak ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>{!state.oxygenLeak && !state.pressureLeak ? 'SEALED' : 'BREACH DETECTED'}</span>
          </div>
        </div>
      </div>

      {/* Active Situation Report / Emergency Box */}
      <div className={`p-4 rounded-xl border ${state.activeEmergencyId ? 'bg-red-950/20 border-red-500/50' : 'bg-cyan-950/20 border-cyan-500/40'} backdrop-blur-sm`}>
        <div className="flex items-center space-x-2 mb-2 font-mono text-xs">
          <AlertTriangle className={`w-4 h-4 ${state.activeEmergencyId ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`} />
          <span className={`font-bold tracking-wider ${state.activeEmergencyId ? 'text-red-400' : 'text-cyan-400'}`}>
            {state.activeEmergencyId ? 'ACTIVE EMERGENCY REPORT' : 'MISSION SITUATION REPORT'}
          </span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed mb-2 font-sans">
          {state.activeEmergencyDescription || 'All habitat systems functioning within nominal emergency parameters. Awaiting commander decision.'}
        </p>
        {state.activeEmergencyEffects && (
          <div className="text-xs font-mono text-amber-300 bg-amber-950/30 p-2 rounded border border-amber-500/30">
            <span className="font-bold">IMPACT:</span> {state.activeEmergencyEffects}
          </div>
        )}
      </div>
    </div>
  );
};
