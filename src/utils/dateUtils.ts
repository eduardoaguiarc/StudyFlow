import { GoalStatus } from '../types/studyGoal';

export interface DeadlineInfo {
  formatted: string;
  relativeHint: string | null;
  isOverdue: boolean;
  isDueSoon: boolean;
}

export function parseLocalDate(dateString: string): Date | null {
  if (!dateString) return null;
  const parts = dateString.split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

export function getTodayInputString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDeadlineInfo(dateString: string, status: GoalStatus): DeadlineInfo {
  const target = parseLocalDate(dateString);
  if (!target) {
    return {
      formatted: 'Sem prazo definido',
      relativeHint: null,
      isOverdue: false,
      isDueSoon: false,
    };
  }

  const formatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(target);

  if (status === GoalStatus.COMPLETED) {
    return {
      formatted,
      relativeHint: null,
      isOverdue: false,
      isDueSoon: false,
    };
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return {
      formatted,
      relativeHint: overdueDays === 1 ? 'Atrasado há 1 dia' : `Atrasado há ${overdueDays} dias`,
      isOverdue: true,
      isDueSoon: false,
    };
  }

  if (diffDays === 0) {
    return {
      formatted,
      relativeHint: 'Vence hoje',
      isOverdue: false,
      isDueSoon: true,
    };
  }

  if (diffDays === 1) {
    return {
      formatted,
      relativeHint: 'Vence amanhã',
      isOverdue: false,
      isDueSoon: true,
    };
  }

  if (diffDays <= 7) {
    return {
      formatted,
      relativeHint: `Em ${diffDays} dias`,
      isOverdue: false,
      isDueSoon: true,
    };
  }

  return {
    formatted,
    relativeHint: null,
    isOverdue: false,
    isDueSoon: false,
  };
}
