import { generateId } from '../lib/uuid';

export interface Phase {
  id: string;
  name: string;
  color: string;
  order_index: number;
  is_system_phase: boolean;
  created_at?: string;
}

export const PHASE_COLORS = {
  PETROL: '#0d9488',
  TURQUOISE: '#14b8a6',
  LIGHT_TURQUOISE: '#5eead4',
  GOLD: '#fbbf24',
};

export const SYSTEM_PHASE_IDS = {
  GRUNDLAGEN: 'phase-grundlagen',
  DETAILPLANUNG: 'phase-detailplanung',
  FEINABSTIMMUNG: 'phase-feinabstimmung',
};

export function createDefaultPhases(): Phase[] {
  return [
    {
      id: SYSTEM_PHASE_IDS.GRUNDLAGEN,
      name: 'Grundlagen',
      color: PHASE_COLORS.PETROL,
      order_index: 0,
      is_system_phase: true,
      created_at: new Date().toISOString(),
    },
    {
      id: SYSTEM_PHASE_IDS.DETAILPLANUNG,
      name: 'Detailplanung',
      color: PHASE_COLORS.TURQUOISE,
      order_index: 1,
      is_system_phase: true,
      created_at: new Date().toISOString(),
    },
    {
      id: SYSTEM_PHASE_IDS.FEINABSTIMMUNG,
      name: 'Feinabstimmung',
      color: PHASE_COLORS.LIGHT_TURQUOISE,
      order_index: 2,
      is_system_phase: true,
      created_at: new Date().toISOString(),
    },
  ];
}

export function calculatePhaseForTask(
  taskDueDate: string | undefined,
  weddingDate: string | undefined,
  planningStartDate: string | undefined
): string | undefined {
  if (!taskDueDate || !weddingDate) {
    return undefined;
  }

  const taskDate = new Date(taskDueDate);
  const wedding = new Date(weddingDate);
  const planningStart = planningStartDate ? new Date(planningStartDate) : new Date();

  const totalDays = Math.floor((wedding.getTime() - planningStart.getTime()) / (1000 * 60 * 60 * 24));
  const daysUntilTask = Math.floor((wedding.getTime() - taskDate.getTime()) / (1000 * 60 * 60 * 24));

  const firstThird = totalDays * (2 / 3);
  const secondThird = totalDays * (1 / 3);

  if (daysUntilTask >= firstThird) {
    return SYSTEM_PHASE_IDS.GRUNDLAGEN;
  } else if (daysUntilTask >= secondThird) {
    return SYSTEM_PHASE_IDS.DETAILPLANUNG;
  } else {
    return SYSTEM_PHASE_IDS.FEINABSTIMMUNG;
  }
}

export function getPhaseColor(phase: Phase | undefined, isCompleted: boolean): string {
  if (isCompleted) {
    return PHASE_COLORS.GOLD;
  }
  return phase?.color || PHASE_COLORS.TURQUOISE;
}

export function createCustomPhase(name: string, color: string, existingPhases: Phase[]): Phase {
  const maxOrder = Math.max(...existingPhases.map(p => p.order_index), -1);
  return {
    id: generateId(),
    name,
    color,
    order_index: maxOrder + 1,
    is_system_phase: false,
    created_at: new Date().toISOString(),
  };
}
