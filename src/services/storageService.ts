import { GoalStatus, StudyGoal, StudyGoalFormData } from '../types/studyGoal';

const STORAGE_KEY = 'studyflow:goals:v1';

function isValidGoalStatus(value: unknown): value is GoalStatus {
  return (
    value === GoalStatus.NOT_STARTED ||
    value === GoalStatus.IN_PROGRESS ||
    value === GoalStatus.COMPLETED
  );
}

function isValidStudyGoal(item: unknown): item is StudyGoal {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.description === 'string' &&
    typeof candidate.deadline === 'string' &&
    isValidGoalStatus(candidate.status) &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.updatedAt === 'string'
  );
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `goal-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const storageService = {
  getAll(): StudyGoal[] {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isValidStudyGoal);
    } catch (error) {
      console.error('Erro ao carregar objetivos do localStorage:', error);
      return [];
    }
  },

  saveAll(goals: StudyGoal[]): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
    }
  },

  create(data: StudyGoalFormData): StudyGoal[] {
    const current = this.getAll();
    const now = new Date().toISOString();
    const newGoal: StudyGoal = {
      id: generateId(),
      title: data.title.trim(),
      description: data.description.trim(),
      deadline: data.deadline,
      status: data.status,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newGoal, ...current];
    this.saveAll(updated);
    return updated;
  },

  update(id: string, data: StudyGoalFormData): StudyGoal[] {
    const current = this.getAll();
    const now = new Date().toISOString();
    const updated = current.map((goal) =>
      goal.id === id
        ? {
            ...goal,
            title: data.title.trim(),
            description: data.description.trim(),
            deadline: data.deadline,
            status: data.status,
            updatedAt: now,
          }
        : goal
    );
    this.saveAll(updated);
    return updated;
  },

  remove(id: string): StudyGoal[] {
    const current = this.getAll();
    const updated = current.filter((goal) => goal.id !== id);
    this.saveAll(updated);
    return updated;
  },
};
