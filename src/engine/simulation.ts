import { GameState, EmergencyEvent, ActionOption } from '../types';

export const INITIAL_STATE: GameState = {
  screen: 'INTRO',
  day: 1,
  rescueEta: 14,
  crewCount: 4,
  status: 'STABLE',
  water: 72,
  oxygen: 84,
  food: 78,
  power: 66,
  habitatPressure: 92,
  crewHealth: 95,
  spareParts: 3,
  habitatStatus: 'DAMAGED',
  waterRecycling: 'DEGRADED',
  solarArray: 'PARTIALLY FUNCTIONAL',
  oxygenLeak: true,
  pressureLeak: false,
  activeEmergencyId: 'oxygen_leak_initial',
  activeEmergencyDescription: 'Emergency seal breach detected in Sector 3 habitat airlock wall. Oxygen is venting into the lunar exosphere.',
  activeEmergencyEffects: 'Oxygen depletes 1.5x faster until sealed.',
  conservationActive: false,
  rationingActive: false,
  medicalCareActive: false,
  crew: [
    { id: '1', name: 'Commander Alex Vance', role: 'Mission Commander', status: 'HEALTHY', health: 98 },
    { id: '2', name: 'Dr. Elena Rostova', role: 'Systems Engineer', status: 'HEALTHY', health: 96 },
    { id: '3', name: 'Marcus Chen', role: 'Medical Officer', status: 'HEALTHY', health: 95 },
    { id: '4', name: 'Suki Tanaka', role: 'Communications Specialist', status: 'HEALTHY', health: 93 },
  ],
  logs: [
    {
      day: 1,
      title: 'EMERGENCY HABITAT REACHED',
      description: 'LTV transfer vehicle failure stranded crew on Lunar surface. Rescue scheduled in 14 days.',
      type: 'WARNING'
    },
    {
      day: 1,
      title: 'OXYGEN LEAK DETECTED',
      description: 'Sector 3 airlock seal degraded. Oxygen bleed-off active.',
      type: 'CRITICAL'
    }
  ],
  stats: {
    repairsCompleted: 0,
    emergenciesResolved: 0,
    decisionsMade: 0
  }
};

export const EMERGENCY_EVENTS: EmergencyEvent[] = [
  {
    id: 'solar_storm',
    title: 'SOLAR RADIATION STORM',
    triggerDay: 3,
    description: 'Coronal mass ejection heading toward lunar surface. Solar array output spikes then overloads, draining grid power.',
    effects: 'Power generation reduced by 25% for 2 days. Habitat pressure stressed.',
    apply: (state) => ({
      ...state,
      power: Math.max(0, state.power - 15),
      habitatStatus: 'DAMAGED',
      activeEmergencyId: 'solar_storm',
      activeEmergencyDescription: 'Solar Radiation Storm active. Power grid under high stress.',
      activeEmergencyEffects: 'Power generation reduced. Repair solar array to stabilize.',
      logs: [
        { day: state.day, title: 'SOLAR RADIATION STORM DETECTED', description: 'Coronal mass ejection impacts lunar array.', type: 'CRITICAL' },
        ...state.logs
      ]
    })
  },
  {
    id: 'water_pump_failure',
    title: 'WATER RECYCLING PUMP FAILURE',
    triggerDay: 6,
    description: 'Primary filtration turbine in water recovery unit seized due to lunar dust accumulation.',
    effects: 'Water recycling output halted completely until repaired.',
    apply: (state) => ({
      ...state,
      waterRecycling: 'FAILED',
      activeEmergencyId: 'water_pump_failure',
      activeEmergencyDescription: 'Water recycling turbine seized. Daily water recovery offline.',
      activeEmergencyEffects: 'Water depletion rate doubled unless repaired with 1 spare part.',
      logs: [
        { day: state.day, title: 'WATER RECYCLING FAILURE', description: 'Filtration turbine seized. Water recovery offline.', type: 'CRITICAL' },
        ...state.logs
      ]
    })
  },
  {
    id: 'pressure_seal_rupture',
    title: 'HABITAT PRESSURE DROP',
    triggerDay: 9,
    description: 'Thermal expansion stress caused secondary micro-fracture in command module viewport seal.',
    effects: 'Habitat pressure dropping steadily. Crew fatigue increasing.',
    apply: (state) => ({
      ...state,
      pressureLeak: true,
      habitatPressure: Math.max(0, state.habitatPressure - 12),
      activeEmergencyId: 'pressure_seal_rupture',
      activeEmergencyDescription: 'Viewport seal micro-fracture. Cabin pressure bleeding off.',
      activeEmergencyEffects: 'Habitat pressure decreases each day until patched.',
      logs: [
        { day: state.day, title: 'PRESSURE SEAL RUPTURE', description: 'Command module viewport micro-fracture detected.', type: 'CRITICAL' },
        ...state.logs
      ]
    })
  },
  {
    id: 'rescue_delay',
    title: 'MISSION CONTROL: RESCUE DELAYED',
    triggerDay: 11,
    description: 'Orbital mechanics anomaly and telemetry handover delay forces transposition burn postponement.',
    effects: 'Rescue ETA extended by 3 days.',
    apply: (state) => ({
      ...state,
      rescueEta: state.rescueEta + 3,
      logs: [
        { day: state.day, title: 'RESCUE APPROACH DELAYED', description: 'Mission Control update: Rescue delayed by 3 days. Maintain life support.', type: 'WARNING' },
        ...state.logs
      ]
    })
  }
];

export const ACTIONS: ActionOption[] = [
  {
    id: 'conserve_power',
    title: 'Emergency Power Conservation',
    description: 'Shut down non-essential lab experiments, dim internal lighting, and cycle life-support heaters.',
    cost: {},
    benefit: 'Reduces daily power consumption by 50%.',
    risk: 'Slight increase in crew fatigue and drop in comfort.',
    isAvailable: (state) => !state.conservationActive,
    execute: (state) => ({
      ...state,
      conservationActive: true,
      power: Math.min(100, state.power + 5),
      stats: { ...state.stats, decisionsMade: state.stats.decisionsMade + 1 },
      logs: [{ day: state.day, title: 'COMMANDER ENABLED EMERGENCY CONSERVATION', description: 'Power conservation protocol engaged across habitat modules.', type: 'INFO' }, ...state.logs]
    })
  },
  {
    id: 'repair_solar',
    title: 'Repair Solar Array',
    description: 'EVA spacewalk to clean photovoltaic panels and replace fried regulator circuits.',
    cost: { spareParts: 1 },
    benefit: 'Restores solar array to OPTIMAL generation capacity.',
    risk: 'Consumes 1 spare part.',
    isAvailable: (state) => state.spareParts >= 1 && state.solarArray !== 'OPTIMAL',
    disabledReason: (state) => state.spareParts < 1 ? 'Requires 1 Spare Part' : 'Solar Array already optimal',
    execute: (state) => ({
      ...state,
      spareParts: state.spareParts - 1,
      solarArray: 'OPTIMAL',
      power: Math.min(100, state.power + 25),
      stats: { ...state.stats, repairsCompleted: state.stats.repairsCompleted + 1, decisionsMade: state.stats.decisionsMade + 1 },
      logs: [{ day: state.day, title: 'SOLAR ARRAY REPAIRED', description: 'Photovoltaic panels cleaned and regulator replaced. Generation restored.', type: 'SUCCESS' }, ...state.logs]
    })
  },
  {
    id: 'repair_recycling',
    title: 'Repair Water Recycling',
    description: 'Overhaul water recovery filtration turbine and flush particulate clogs.',
    cost: { spareParts: 1 },
    benefit: 'Restores water recycling to full efficiency, preventing water depletion.',
    risk: 'Consumes 1 spare part.',
    isAvailable: (state) => state.spareParts >= 1 && state.waterRecycling !== 'FUNCTIONAL',
    disabledReason: (state) => state.spareParts < 1 ? 'Requires 1 Spare Part' : 'Water recycling already functional',
    execute: (state) => ({
      ...state,
      spareParts: state.spareParts - 1,
      waterRecycling: 'FUNCTIONAL',
      water: Math.min(100, state.water + 15),
      stats: { ...state.stats, repairsCompleted: state.stats.repairsCompleted + 1, decisionsMade: state.stats.decisionsMade + 1 },
      logs: [{ day: state.day, title: 'WATER RECYCLING REPAIRED', description: 'Filtration turbine overhauled. Recovery efficiency at 100%.', type: 'SUCCESS' }, ...state.logs]
    })
  },
  {
    id: 'repair_oxygen_leak',
    title: 'Seal Oxygen / Pressure Leak',
    description: 'Apply high-durability polymer resin patch over airlock / viewport fractures.',
    cost: { spareParts: 1 },
    benefit: 'Stops active oxygen bleed or pressure drop immediately.',
    risk: 'Consumes 1 spare part.',
    isAvailable: (state) => state.spareParts >= 1 && (state.oxygenLeak || state.pressureLeak),
    disabledReason: (state) => state.spareParts < 1 ? 'Requires 1 Spare Part' : 'No active leaks to seal',
    execute: (state) => ({
      ...state,
      spareParts: state.spareParts - 1,
      oxygenLeak: false,
      pressureLeak: false,
      activeEmergencyId: state.activeEmergencyId === 'oxygen_leak_initial' ? null : state.activeEmergencyId,
      activeEmergencyDescription: state.activeEmergencyId === 'oxygen_leak_initial' ? 'All habitat systems stable.' : state.activeEmergencyDescription,
      stats: { ...state.stats, repairsCompleted: state.stats.repairsCompleted + 1, emergenciesResolved: state.stats.emergenciesResolved + 1, decisionsMade: state.stats.decisionsMade + 1 },
      logs: [{ day: state.day, title: 'HULL LEAK SEALED', description: 'Polymer patch cured successfully. Cabin pressure and oxygen stabilized.', type: 'SUCCESS' }, ...state.logs]
    })
  },
  {
    id: 'ration_supplies',
    title: 'Enforce Strict Rationing',
    description: 'Reduce daily caloric and water intake to minimum survival thresholds.',
    cost: {},
    benefit: 'Reduces daily food and water consumption by 40%.',
    risk: 'Gradually reduces crew health and morale over time.',
    isAvailable: (state) => !state.rationingActive,
    execute: (state) => ({
      ...state,
      rationingActive: true,
      stats: { ...state.stats, decisionsMade: state.stats.decisionsMade + 1 },
      logs: [{ day: state.day, title: 'STRICT RATIONING ENFORCED', description: 'Crew placed on rigorous calorie and water restriction protocols.', type: 'INFO' }, ...state.logs]
    })
  },
  {
    id: 'medical_care',
    title: 'Conduct Crew Medical Triage',
    description: 'Administer electrolyte supplements and therapeutic rest to fatigued crew members.',
    cost: { power: 10 },
    benefit: 'Restores crew health by +8 points.',
    risk: 'Consumes 10 power units.',
    isAvailable: (state) => state.power >= 10 && state.crewHealth < 95,
    disabledReason: (state) => state.power < 10 ? 'Requires 10 Power' : 'Crew health already optimal',
    execute: (state) => ({
      ...state,
      power: state.power - 10,
      crewHealth: Math.min(100, state.crewHealth + 8),
      crew: state.crew.map(c => ({ ...c, health: Math.min(100, c.health + 8), status: c.health + 8 > 80 ? 'HEALTHY' : c.health + 8 > 50 ? 'FATIGUED' : 'CRITICAL' })),
      stats: { ...state.stats, decisionsMade: state.stats.decisionsMade + 1 },
      logs: [{ day: state.day, title: 'MEDICAL TRIAGE ADMINISTERED', description: 'Crew received targeted medical care and electrolyte therapy.', type: 'SUCCESS' }, ...state.logs]
    })
  },
  {
    id: 'inspect_systems',
    title: 'Deep System Diagnostics',
    description: 'Run full telemetry diagnostic sweep to discover hidden structural faults or salvage spare parts.',
    cost: {},
    benefit: 'Has a chance to recover 1 spare part or reveal optimization routes.',
    risk: 'Consumes minor sensor power.',
    isAvailable: (state) => state.power >= 5,
    disabledReason: () => 'Requires 5 Power',
    execute: (state) => {
      const foundPart = Math.random() < 0.6;
      return {
        ...state,
        power: state.power - 5,
        spareParts: foundPart ? state.spareParts + 1 : state.spareParts,
        stats: { ...state.stats, decisionsMade: state.stats.decisionsMade + 1 },
        logs: [
          {
            day: state.day,
            title: 'DIAGNOSTIC SWEEP COMPLETED',
            description: foundPart ? 'Salvaged 1 usable spare part from discarded housing unit!' : 'Diagnostics completed. All circuits operating at measured parameters.',
            type: foundPart ? 'SUCCESS' : 'INFO'
          },
          ...state.logs
        ]
      };
    }
  }
];

export function advanceDay(state: GameState): GameState {
  const nextDay = state.day + 1;
  const nextRescueEta = Math.max(0, state.rescueEta - 1);

  // Check for scheduled emergency events on this day
  const matchingEvent = EMERGENCY_EVENTS.find(e => e.triggerDay === nextDay);
  let intermediateState = matchingEvent ? matchingEvent.apply({ ...state, day: nextDay, rescueEta: nextRescueEta }) : { ...state, day: nextDay, rescueEta: nextRescueEta };

  // Resource consumption formulas with dependencies
  const powerDrain = intermediateState.conservationActive ? 4 : 8;
  const solarGen = intermediateState.solarArray === 'OPTIMAL' ? 14 : intermediateState.solarArray === 'PARTIALLY FUNCTIONAL' ? 8 : 4;
  let nextPower = Math.max(0, Math.min(100, intermediateState.power + solarGen - powerDrain));

  // Water calculations
  const waterConsumption = intermediateState.rationingActive ? 3 : 6;
  const recyclingOutput = intermediateState.waterRecycling === 'FUNCTIONAL' ? 5 : intermediateState.waterRecycling === 'DEGRADED' ? 2 : 0;
  // Reduced power decreases water recycling efficiency
  const effectiveRecycling = nextPower < 30 ? Math.floor(recyclingOutput / 2) : recyclingOutput;
  let nextWater = Math.max(0, Math.min(100, intermediateState.water + effectiveRecycling - waterConsumption));

  // Oxygen calculations
  const oxygenConsumption = 5;
  const oxygenReplenishment = nextPower > 20 ? 6 : 2;
  const leakDrain = intermediateState.oxygenLeak ? 8 : 0;
  let nextOxygen = Math.max(0, Math.min(100, intermediateState.oxygen + oxygenReplenishment - oxygenConsumption - leakDrain));

  // Food calculations
  const foodConsumption = intermediateState.rationingActive ? 3 : 5;
  let nextFood = Math.max(0, Math.min(100, intermediateState.food - foodConsumption));

  // Habitat pressure
  let nextPressure = intermediateState.habitatPressure;
  if (intermediateState.pressureLeak) {
    nextPressure = Math.max(0, nextPressure - 8);
  }

  // Crew health impact
  let healthDelta = 0;
  if (nextWater < 25) healthDelta -= 8;
  if (nextOxygen < 25) healthDelta -= 12;
  if (nextFood < 20) healthDelta -= 5;
  if (nextPressure < 40) healthDelta -= 10;
  if (intermediateState.rationingActive && nextDay % 2 === 0) healthDelta -= 2;

  let nextHealth = Math.max(0, Math.min(100, intermediateState.crewHealth + healthDelta));

  // Update crew members status
  const updatedCrew = intermediateState.crew.map(c => {
    const memberHealth = Math.max(0, Math.min(100, c.health + healthDelta));
    return {
      ...c,
      health: memberHealth,
      status: memberHealth > 75 ? 'HEALTHY' as const : memberHealth > 40 ? 'FATIGUED' as const : memberHealth > 15 ? 'EXHAUSTED' as const : 'CRITICAL' as const
    };
  });

  // Determine Mission Status
  let missionStatus: GameState['status'] = 'STABLE';
  if (nextWater <= 15 || nextOxygen <= 15 || nextFood <= 10 || nextPressure <= 20 || nextHealth <= 15) {
    missionStatus = 'CRITICAL';
  } else if (nextWater <= 35 || nextOxygen <= 40 || nextFood <= 30 || nextHealth <= 60 || intermediateState.activeEmergencyId) {
    missionStatus = 'WARNING';
  }

  // Check Win / Loss
  if (nextRescueEta === 0) {
    if (nextHealth > 20 && nextOxygen > 10 && nextWater > 10) {
      return {
        ...intermediateState,
        screen: 'VICTORY',
        status: 'RESCUED',
        water: nextWater,
        oxygen: nextOxygen,
        food: nextFood,
        power: nextPower,
        habitatPressure: nextPressure,
        crewHealth: nextHealth,
        crew: updatedCrew,
        logs: [
          { day: nextDay, title: 'RESCUE SHIP ARRIVED IN ORBIT', description: 'Ascent module successfully docked with rescue vehicle. All surviving crew safe.', type: 'SUCCESS' },
          ...intermediateState.logs
        ]
      };
    } else {
      return {
        ...intermediateState,
        screen: 'DEFEAT',
        status: 'FAILED',
        water: nextWater,
        oxygen: nextOxygen,
        food: nextFood,
        power: nextPower,
        habitatPressure: nextPressure,
        crewHealth: nextHealth,
        crew: updatedCrew,
        logs: [
          { day: nextDay, title: 'RESCUE ARRIVED TOO LATE', description: 'Rescue craft rendezvoused, but habitat life support had collapsed.', type: 'CRITICAL' },
          ...intermediateState.logs
        ]
      };
    }
  }

  // Defeat check if resources hit zero
  if (nextOxygen === 0 || nextPressure === 0 || nextHealth === 0 || nextWater === 0) {
    return {
      ...intermediateState,
      screen: 'DEFEAT',
      status: 'FAILED',
      water: nextWater,
      oxygen: nextOxygen,
      food: nextFood,
      power: nextPower,
      habitatPressure: nextPressure,
      crewHealth: nextHealth,
      crew: updatedCrew,
      logs: [
        { day: nextDay, title: 'CATASTROPHIC MISSION FAILURE', description: 'Critical life support parameters depleted. Habitat uninhabitable.', type: 'CRITICAL' },
        ...intermediateState.logs
      ]
    };
  }

  return {
    ...intermediateState,
    water: nextWater,
    oxygen: nextOxygen,
    food: nextFood,
    power: nextPower,
    habitatPressure: nextPressure,
    crewHealth: nextHealth,
    crew: updatedCrew,
    status: missionStatus,
    logs: [
      { day: nextDay, title: `MISSION DAY ${nextDay} LOG`, description: `Resources updated. Water: ${nextWater}%, Oxygen: ${nextOxygen}%, Power: ${nextPower}%.`, type: 'INFO' },
      ...intermediateState.logs
    ]
  };
}
