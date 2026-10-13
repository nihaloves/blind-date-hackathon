import React, { useState, useEffect } from 'react';
import { GameState, ActionOption } from './types';
import { INITIAL_STATE, advanceDay } from './engine/simulation';
import { IntroScreen } from './components/IntroScreen';
import { TopNav } from './components/TopNav';
import { LeftPanel } from './components/LeftPanel';
import { CenterPanel } from './components/CenterPanel';
import { RightPanel } from './components/RightPanel';
import { BottomPanel } from './components/BottomPanel';
import { GameOverScreen } from './components/GameOverScreen';

export function App() {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('moonloop_save');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load saved game', e);
      }
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    if (state.screen === 'PLAYING') {
      localStorage.setItem('moonloop_save', JSON.stringify(state));
    } else {
      localStorage.removeItem('moonloop_save');
    }
  }, [state]);

  const handleStart = () => {
    setState({ ...INITIAL_STATE, screen: 'PLAYING' });
  };

  const handleRestart = () => {
    localStorage.removeItem('moonloop_save');
    setState(INITIAL_STATE);
  };

  const handleAdvanceDay = () => {
    setState(prevState => advanceDay(prevState));
  };

  const handleExecuteAction = (action: ActionOption) => {
    setState(prevState => action.execute(prevState));
  };

  if (state.screen === 'INTRO') {
    return <IntroScreen onStart={handleStart} />;
  }

  if (state.screen === 'VICTORY' || state.screen === 'DEFEAT') {
    return <GameOverScreen state={state} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col relative overflow-x-hidden scanline">
      {/* Background ambient grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950/90 to-[#070b14] pointer-events-none" />

      <TopNav state={state} onRestart={handleRestart} />

      <main className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-[1600px] w-full mx-auto relative z-10">
        {/* Left Column: Telemetry */}
        <div className="lg:col-span-3 flex flex-col">
          <LeftPanel state={state} />
        </div>

        {/* Center Column: Habitat & Status */}
        <div className="lg:col-span-6 flex flex-col">
          <CenterPanel state={state} />
        </div>

        {/* Right Column: Mission Intelligence & Actions */}
        <div className="lg:col-span-3 flex flex-col">
          <RightPanel state={state} onExecuteAction={handleExecuteAction} />
        </div>
      </main>

      {/* Bottom Mission Timeline & Advance CTA */}
      <div className="p-4 max-w-[1600px] w-full mx-auto relative z-10">
        <BottomPanel state={state} onAdvanceDay={handleAdvanceDay} />
      </div>
    </div>
  );
}

export default App;
