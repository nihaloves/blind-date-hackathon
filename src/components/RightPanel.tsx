import React from 'react';
import { GameState, ActionOption } from '../types';
import { ACTIONS } from '../engine/simulation';
import { Wrench, Zap, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';

interface RightPanelProps {
  state: GameState;
  onExecuteAction: (action: ActionOption) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ state, onExecuteAction }) => {
  // Mission Intelligence Recommendation Engine
  const getRecommendation = () => {
    if (state.oxygen || state.oxygenLeak) {
      if (state.oxygenLeak && state.spareParts >= 1) {
        return {
          priority: 'CRITICAL OXYGEN PRIORITY',
          text: 'An active hull leak is bleeding oxygen. Repairing the leak immediately is recommended before oxygen levels drop below critical thresholds.',
          actionId: 'repair_oxygen_leak'
        };
      }
    }
    if (state.water < 40 && state.waterRecycling !== 'FUNCTIONAL' && state.spareParts >= 1) {
      return {
        priority: 'WATER RECYCLING PRIORITY',
        text: 'Water reserves are dropping and recycling output is degraded. Overhaul the filtration turbine to secure long-term survival.',
        actionId: 'repair_recycling'
      };
    }
    if (state.power < 35 && state.solarArray !== 'OPTIMAL' && state.spareParts >= 1) {
      return {
        priority: 'POWER CASCADE WARNING',
        text: 'Low power is reducing water recovery efficiency. Repair the solar array to restore power generation.',
        actionId: 'repair_solar'
      };
    }
    if (state.water < 35 && !state.rationingActive) {
      return {
        priority: 'RATIONING ADVISORY',
        text: 'Water and food reserves are constrained. Enforce strict rationing to extend supplies until rescue.',
        actionId: 'ration_supplies'
      };
    }
    if (!state.conservationActive && state.power < 50) {
      return {
        priority: 'POWER CONSERVATION',
        text: 'Grid power is moderate. Enable emergency power conservation to safeguard life support systems.',
        actionId: 'conserve_power'
      };
    }
    return {
      priority: 'OPERATIONAL STABILITY',
      text: 'All primary systems within nominal parameters. Monitor telemetry and maintain reserves until rescue ETA reaches zero.',
      actionId: null
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col h-full backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800 font-mono text-xs text-cyan-400">
        <span>MISSION INTELLIGENCE & DECISIONS</span>
        <span className="text-slate-400">AI ADVISOR</span>
      </div>

      {/* Intelligence Recommendation Box */}
      <div className="bg-cyan-950/30 border border-cyan-500/40 rounded-lg p-3.5 mb-4">
        <div className="flex items-center space-x-2 mb-1.5 font-mono text-xs font-bold text-cyan-300">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <span>{recommendation.priority}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-sans mb-2">
          {recommendation.text}
        </p>
      </div>

      <div className="font-mono text-xs text-slate-400 mb-2">AVAILABLE COMMAND ACTIONS</div>

      {/* Actions List */}
      <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
        {ACTIONS.map((action) => {
          const available = action.isAvailable(state);
          const reason = action.disabledReason ? action.disabledReason(state) : '';
          const isRecommended = recommendation.actionId === action.id;

          return (
            <div
              key={action.id}
              className={`p-3 rounded-lg border transition-all ${
                isRecommended
                  ? 'bg-cyan-950/20 border-cyan-500/60 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                  : 'bg-slate-950/80 border-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-white flex items-center space-x-1.5">
                  {isRecommended && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                  <span>{action.title}</span>
                </span>
                {action.cost.spareParts && (
                  <span className="font-mono text-[10px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                    COST: {action.cost.spareParts} PART
                  </span>
                )}
                {action.cost.power && (
                  <span className="font-mono text-[10px] text-yellow-400 bg-yellow-950/40 px-2 py-0.5 rounded border border-yellow-500/30">
                    COST: {action.cost.power} POWER
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 mb-2 font-sans">{action.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <div className="text-[10px] font-mono text-emerald-400">✓ {action.benefit}</div>
                <button
                  onClick={() => onExecuteAction(action)}
                  disabled={!available}
                  className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
                    available
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  {available ? 'EXECUTE' : reason}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
