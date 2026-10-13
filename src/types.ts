export interface CrewMember {
  id: string;
  name: string;
  role: string;
  status: 'HEALTHY' | 'FATIGUED' | 'EXHAUSTED' | 'CRITICAL';
  health: number;
}

export type MissionStatus = 'STABLE' | 'WARNING' | 'CRITICAL' | 'RESCUED' | 'FAILED';

export interface GameState {
  screen: 'INTRO' | 'PLAYING' | 'VICTORY' | 'DEFEAT';
  day: number;
  rescueEta: number;
  crewCount: number;
  status: MissionStatus;
  water: number; // 0 - 100
  oxygen: number; // 0 - 100
  food: number; // 0 - 100
  power: number; // 0 - 100
  habitatPressure: number; // 0 - 100
  crewHealth: number; // 0 - 100 (average)
  spareParts: number;
  habitatStatus: 'DAMAGED' | 'STABLE' | 'CRITICAL';
  waterRecycling: 'DEGRADED' | 'FUNCTIONAL' | 'FAILED';
  solarArray: 'PARTIALLY FUNCTIONAL' | 'OPTIMAL' | 'DAMAGED';
  oxygenLeak: boolean;
  pressureLeak: boolean;
  activeEmergencyId: string | null;
  activeEmergencyDescription: string | null;
  activeEmergencyEffects: string | null;
  conservationActive: boolean;
  rationingActive: boolean;
  medicalCareActive: boolean;
  crew: CrewMember[];
  logs: {
    day: number;
    title: string;
    description: string;
    type: 'INFO' | 'WARNING' | 'CRITICAL' | 'SUCCESS';
  }[];
  stats: {
    repairsCompleted: number;
    emergenciesResolved: number;
    decisionsMade: number;
  };
}

export interface ActionOption {
  id: string;
  title: string;
  description: string;
  cost: {
    spareParts?: number;
    power?: number;
  };
  benefit: string;
  risk: string;
  isAvailable: (state: GameState) => boolean;
  disabledReason?: (state: GameState) => string;
  execute: (state: GameState) => GameState;
}

export interface EmergencyEvent {
  id: string;
  title: string;
  triggerDay: number;
  description: string;
  effects: string;
  apply: (state: GameState) => GameState;
}
