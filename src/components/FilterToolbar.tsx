import { Search, X } from 'lucide-react';
import { GOAL_STATUS_LABELS, GoalStatus, StatusFilter } from '../types/studyGoal';

interface FilterToolbarProps {
  activeFilter: StatusFilter;
  searchQuery: string;
  filteredCount: number;
  totalCount: number;
  onFilterChange: (filter: StatusFilter) => void;
  onSearchChange: (query: string) => void;
}

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'TODOS', label: 'Todos' },
  { value: GoalStatus.NOT_STARTED, label: GOAL_STATUS_LABELS[GoalStatus.NOT_STARTED] },
  { value: GoalStatus.IN_PROGRESS, label: GOAL_STATUS_LABELS[GoalStatus.IN_PROGRESS] },
  { value: GoalStatus.COMPLETED, label: GOAL_STATUS_LABELS[GoalStatus.COMPLETED] },
];

export function FilterToolbar({
  activeFilter,
  searchQuery,
  filteredCount,
  totalCount,
  onFilterChange,
  onSearchChange,
}: FilterToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Seus objetivos de estudo</h2>
          <p className="text-xs text-slate-500 tabular-nums mt-0.5">
            Exibindo {filteredCount} de {totalCount}{' '}
            {totalCount === 1 ? 'objetivo cadastrado' : 'objetivos cadastrados'}
          </p>
        </div>

        {/* Busca por texto */}
        <div className="relative w-full sm:w-64">
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar objetivo..."
            aria-label="Buscar objetivo por título ou descrição"
            className="w-full pl-9 pr-8 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Limpar busca"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded-xs cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Filtro segmentado interativo por status */}
      <div
        role="group"
        aria-label="Filtrar objetivos por status"
        className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto"
      >
        {FILTER_OPTIONS.map((option) => {
          const isActive = activeFilter === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onFilterChange(option.value)}
              aria-pressed={isActive}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-700 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
