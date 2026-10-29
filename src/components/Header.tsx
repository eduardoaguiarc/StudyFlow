import { Plus } from 'lucide-react';
import { GoalStatus, StatusFilter } from '../types/studyGoal';

interface HeaderProps {
  activeFilter: StatusFilter;
  onSelectFilter: (filter: StatusFilter) => void;
  onFocusNewGoal: () => void;
}

export function Header({ activeFilter, onSelectFilter, onFocusNewGoal }: HeaderProps) {
  const handleNavFilter = (filter: StatusFilter) => {
    onSelectFilter(filter);
    const listEl = document.getElementById('lista-objetivos');
    if (listEl) {
      listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zona 1: Marca (elemento de texto único) */}
        <a
          href="#topo"
          className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 rounded-xs"
        >
          StudyFlow
        </a>

        {/* Zona 2: Links de navegação limpos em linha única */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => handleNavFilter('TODOS')}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === 'TODOS'
                ? 'border-teal-700 text-slate-900'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Todos os objetivos
          </button>
          <button
            type="button"
            onClick={() => handleNavFilter(GoalStatus.IN_PROGRESS)}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === GoalStatus.IN_PROGRESS
                ? 'border-teal-700 text-slate-900'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Em andamento
          </button>
          <button
            type="button"
            onClick={() => handleNavFilter(GoalStatus.COMPLETED)}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeFilter === GoalStatus.COMPLETED
                ? 'border-teal-700 text-slate-900'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Concluídos
          </button>
          <a
            href="#como-comecar"
            className="py-1 border-b-2 border-transparent hover:text-slate-900 hover:border-slate-300 transition-colors whitespace-nowrap shrink-0"
          >
            Dicas de estudo
          </a>
        </nav>

        {/* Zona 3: Ação primária única */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onFocusNewGoal}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Novo objetivo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
