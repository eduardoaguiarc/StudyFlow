import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Pencil,
  Trash2,
} from 'lucide-react';
import { GOAL_STATUS_LABELS, GoalStatus, StudyGoal } from '../types/studyGoal';
import { getDeadlineInfo } from '../utils/dateUtils';

interface GoalCardProps {
  goal: StudyGoal;
  isBeingEdited: boolean;
  onEdit: (goal: StudyGoal) => void;
  onRequestDelete: (goal: StudyGoal) => void;
  onStatusChange: (goal: StudyGoal, nextStatus: GoalStatus) => void;
}

export function GoalCard({
  goal,
  isBeingEdited,
  onEdit,
  onRequestDelete,
  onStatusChange,
}: GoalCardProps) {
  const deadlineInfo = getDeadlineInfo(goal.deadline, goal.status);
  const isCompleted = goal.status === GoalStatus.COMPLETED;

  const renderStatusIndicator = () => {
    switch (goal.status) {
      case GoalStatus.COMPLETED:
        return (
          <span className="inline-flex items-center gap-1.5 font-medium text-teal-700">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{GOAL_STATUS_LABELS[GoalStatus.COMPLETED]}</span>
          </span>
        );
      case GoalStatus.IN_PROGRESS:
        return (
          <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
            <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{GOAL_STATUS_LABELS[GoalStatus.IN_PROGRESS]}</span>
          </span>
        );
      case GoalStatus.NOT_STARTED:
      default:
        return (
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
            <Circle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{GOAL_STATUS_LABELS[GoalStatus.NOT_STARTED]}</span>
          </span>
        );
    }
  };

  return (
    <article
      className={`bg-white rounded-xl border p-5 sm:p-6 transition-colors ${
        isBeingEdited
          ? 'border-teal-600 ring-2 ring-teal-600/15'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Título principal */}
      <div className="flex items-start justify-between gap-4">
        <h3
          className={`text-base sm:text-lg font-bold leading-snug ${
            isCompleted ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-900'
          }`}
        >
          {goal.title}
        </h3>
      </div>

      {/* Metadados limpos sem pílulas, usando separadores tipográficos */}
      <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
        {renderStatusIndicator()}

        <span aria-hidden="true" className="text-slate-300">
          ·
        </span>

        <span className="inline-flex items-center gap-1.5 tabular-nums">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          <span>Prazo: {deadlineInfo.formatted}</span>
        </span>

        {deadlineInfo.relativeHint && (
          <>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span
              className={`inline-flex items-center gap-1 font-medium tabular-nums ${
                deadlineInfo.isOverdue ? 'text-red-600' : 'text-amber-700'
              }`}
            >
              {deadlineInfo.isOverdue && (
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              )}
              <span>{deadlineInfo.relativeHint}</span>
            </span>
          </>
        )}
      </div>

      {/* Descrição do objetivo */}
      {goal.description ? (
        <p className="mt-3 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          {goal.description}
        </p>
      ) : (
        <p className="mt-3 text-sm text-slate-400 italic">
          Nenhuma descrição detalhada adicionada.
        </p>
      )}

      {/* Rodapé do cartão: Atualização rápida de status + Editar + Excluir */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label
            htmlFor={`quick-status-${goal.id}`}
            className="text-xs font-medium text-slate-500 whitespace-nowrap"
          >
            Atualizar status:
          </label>
          <select
            id={`quick-status-${goal.id}`}
            value={goal.status}
            onChange={(e) => onStatusChange(goal, e.target.value as GoalStatus)}
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 hover:border-slate-300 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 cursor-pointer"
          >
            <option value={GoalStatus.NOT_STARTED}>
              {GOAL_STATUS_LABELS[GoalStatus.NOT_STARTED]}
            </option>
            <option value={GoalStatus.IN_PROGRESS}>
              {GOAL_STATUS_LABELS[GoalStatus.IN_PROGRESS]}
            </option>
            <option value={GoalStatus.COMPLETED}>
              {GOAL_STATUS_LABELS[GoalStatus.COMPLETED]}
            </option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(goal)}
            aria-label={`Editar objetivo ${goal.title}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-700"
          >
            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Editar</span>
          </button>

          <button
            type="button"
            onClick={() => onRequestDelete(goal)}
            aria-label={`Excluir objetivo ${goal.title}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-white border border-slate-200 rounded-md hover:bg-red-50 hover:border-red-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-600"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Excluir</span>
          </button>
        </div>
      </div>
    </article>
  );
}
