export enum GoalStatus {
  NOT_STARTED = 'NAO_INICIADO',
  IN_PROGRESS = 'EM_ANDAMENTO',
  COMPLETED = 'CONCLUIDO',
}

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  deadline: string; // Formato ISO local YYYY-MM-DD
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface StudyGoalFormData {
  title: string;
  description: string;
  deadline: string;
  status: GoalStatus;
}

export type StatusFilter = 'TODOS' | GoalStatus;

export const GOAL_STATUS_LABELS: Record<GoalStatus, string> = {
  [GoalStatus.NOT_STARTED]: 'Não iniciado',
  [GoalStatus.IN_PROGRESS]: 'Em andamento',
  [GoalStatus.COMPLETED]: 'Concluído',
};
