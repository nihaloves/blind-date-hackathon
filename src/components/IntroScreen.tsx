import React from 'react';
import { ShieldAlert, Activity, Cpu, Wrench, ArrowRight, Radio } from 'lucide-react';
import { GameState } from '../types';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden scanline">
      {/* Background star field / lunar glow grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/30 via-slate-950/80 to-[#070b14] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-3xl w-full bg-slate-900/80 border border-cyan-500/30 rounded-xl p-8 shadow-[0_0_50px_rgba(0,240,255,0.1)] relative z-10 backdrop-blur-md">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/40 rounded-lg text-cyan-400">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="text-xs tracking-widest text-cyan-400 font-mono uppercase">NASA / LUNAR COMMAND TELEMETRY</div>
            <h1 className="text-3xl md:text-4xl font-black tracking-wider text-white font-mono">MOONLOOP: STRANDED</h1>
          </div>
        </div>

        <div className="bg-cyan-950/20 border-l-4 border-cyan-400 p-4 mb-6 rounded-r-lg font-mono text-sm text-cyan-200">
          <p className="font-semibold mb-1">STRANDED LUNAR SURVIVAL SIMULATION</p>
          <p className="text-slate-300 italic">"Four astronauts. One damaged habitat. Rescue is 14 days away."</p>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed mb-8">
          <p>
            The lunar transfer vehicle suffered a catastrophic descent engine failure during landing in Mare Tranquillitatis. Your crew of four has reached the emergency habitat module, but critical systems are severely damaged.
          </p>
          <p>
            Mission Control confirms a rescue trajectory is being calculated, but ETA is strictly <span className="text-cyan-400 font-bold font-mono">14 days</span>. Your primary mandate as Mission Commander is to stabilize life support, manage dwindling power and water reserves, perform orbital repairs, and keep your crew alive.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-mono text-xs">
          <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
            <div className="text-slate-500">CREW</div>
            <div className="text-white text-lg font-bold">4 Astronauts</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
            <div className="text-slate-500">RESCUE ETA</div>
            <div className="text-cyan-400 text-lg font-bold">14 Days</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
            <div className="text-slate-500">HABITAT</div>
            <div className="text-amber-400 text-lg font-bold">DAMAGED</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded border border-slate-800">
            <div className="text-slate-500">SPARE PARTS</div>
            <div className="text-emerald-400 text-lg font-bold">3 Units</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-6">
          <div className="text-xs text-slate-400 font-mono flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Core simulation engine ready. No external dependencies.</span>
          </div>

          <button
            onClick={onStart}
            className="w-full md:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono tracking-wider rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center space-x-3 cursor-pointer group"
          >
            <span>BEGIN SURVIVAL</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
