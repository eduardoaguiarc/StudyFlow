import { BookOpen, Plus, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  hasAnyGoals: boolean;
  onFocusNewGoal: () => void;
  onResetFilters: () => void;
}

export function EmptyState({
  hasAnyGoals,
  onFocusNewGoal,
  onResetFilters,
}: EmptyStateProps) {
  if (!hasAnyGoals) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-10 text-center">
        <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">
          Você ainda não cadastrou nenhum objetivo de estudo
        </h3>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Comece pequeno! Cadastre o primeiro tema que você deseja aprender no formulário ao
          lado para visualizar seu progresso com tranquilidade.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={onFocusNewGoal}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Criar meu primeiro objetivo</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
      <h3 className="text-base font-bold text-slate-900">
        Nenhum objetivo encontrado para este filtro
      </h3>
      <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto">
        Tente buscar por outro termo ou exiba novamente todos os objetivos cadastrados.
      </p>
      <div className="mt-5">
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-slate-600"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Limpar filtros e mostrar todos</span>
        </button>
      </div>
    </div>
  );
}
