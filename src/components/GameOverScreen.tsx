import React from 'react';
import { GameState } from '../types';
import { Trophy, ShieldAlert, RotateCcw, Award, CheckCircle2 } from 'lucide-react';

interface GameOverScreenProps {
  state: GameState;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ state, onRestart }) => {
  const isVictory = state.screen === 'VICTORY';

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden scanline">
      {/* Background glow */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${isVictory ? 'from-emerald-950/40' : 'from-red-950/40'} via-slate-950/85 to-[#070b14] pointer-events-none`} />

      <div className={`max-w-2xl w-full bg-slate-900/90 border ${isVictory ? 'border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.15)]' : 'border-red-500/40 shadow-[0_0_60px_rgba(239,68,68,0.15)]'} rounded-xl p-8 relative z-10 backdrop-blur-md`}>
        <div className="flex items-center space-x-4 mb-6">
          <div className={`p-3 rounded-xl border ${isVictory ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-red-500/10 border-red-500/40 text-red-400'}`}>
            {isVictory ? <Trophy className="w-10 h-10 animate-bounce" /> : <ShieldAlert className="w-10 h-10 animate-pulse" />}
          </div>
          <div>
            <div className={`text-xs tracking-widest font-mono uppercase ${isVictory ? 'text-emerald-400' : 'text-red-400'}`}>
              {isVictory ? 'MISSION ACCOMPLISHED' : 'CATASTROPHIC MISSION FAILURE'}
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-wider text-white font-mono">
              {isVictory ? 'CREW RESCUED SUCCESSFULLY' : 'HABITAT LIFE SUPPORT COLLAPSED'}
            </h1>
          </div>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-sans">
          {isVictory 
            ? `Commander, your exceptional leadership kept the crew alive through 14 grueling lunar days. The ascent module successfully rendezvoused with the rescue vehicle. All four astronauts are returning to Earth.`
            : `Despite your efforts, life support parameters dropped below survivable limits. The harsh environment of Mare Tranquillitatis claimed the station before rescue could arrive.`
          }
        </p>

        {/* Survival Statistics */}
        <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800 mb-8 font-mono">
          <div className="text-xs text-cyan-400 mb-3 flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>MISSION SURVIVAL DEBRIEF STATISTICS</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-slate-500">DAYS SURVIVED</div>
              <div className="text-white text-lg font-bold">{state.day}</div>
            </div>
            <div>
              <div className="text-slate-500">REPAIRS COMPLETED</div>
              <div className="text-emerald-400 text-lg font-bold">{state.stats.repairsCompleted}</div>
            </div>
            <div>
              <div className="text-slate-500">EMERGENCIES RESOLVED</div>
              <div className="text-cyan-400 text-lg font-bold">{state.stats.emergenciesResolved}</div>
            </div>
            <div>
              <div className="text-slate-500">CREW SURVIVORS</div>
              <div className={`text-lg font-bold ${state.crewHealth > 20 ? 'text-emerald-400' : 'text-red-400'}`}>
                {state.crew.filter(c => c.health > 0).length} / 4
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono tracking-wider rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center space-x-3 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>START NEW MISSION</span>
          </button>
        </div>
      </div>
    </div>
  );
};
