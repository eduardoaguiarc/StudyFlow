import { GoalStatus, StudyGoal } from '../types/studyGoal';

interface SummaryStripProps {
  goals: StudyGoal[];
}

export function SummaryStrip({ goals }: SummaryStripProps) {
  const totalCount = goals.length;
  const notStartedCount = goals.filter((g) => g.status === GoalStatus.NOT_STARTED).length;
  const inProgressCount = goals.filter((g) => g.status === GoalStatus.IN_PROGRESS).length;
  const completedCount = goals.filter((g) => g.status === GoalStatus.COMPLETED).length;

  const totalLabel =
    totalCount === 1
      ? '1 objetivo cadastrado'
      : `${totalCount} objetivos cadastrados`;

  return (
    <section aria-label="Resumo dos objetivos de estudo" className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Organize o que você deseja aprender, um passo de cada vez
            </h1>
            <p className="mt-2 text-base text-slate-600 leading-relaxed">
              Transforme conteúdos extensos em metas simples e claras. Seus objetivos ficam salvos
              automaticamente neste navegador.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-700 tabular-nums shrink-0" aria-live="polite">
            Total registrado: <strong className="font-semibold text-slate-900">{totalLabel}</strong>
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-slate-200">
          <div className="sm:pr-6">
            <dt className="text-sm text-slate-500">Objetivos cadastrados</dt>
            <dd className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
              {totalCount}
            </dd>
          </div>

          <div className="sm:px-6">
            <dt className="text-sm text-slate-500">Não iniciados</dt>
            <dd className="mt-1 text-2xl sm:text-3xl font-bold text-slate-700 font-mono tabular-nums">
              {notStartedCount}
            </dd>
          </div>

          <div className="sm:px-6">
            <dt className="text-sm text-slate-500">Em andamento</dt>
            <dd className="mt-1 text-2xl sm:text-3xl font-bold text-amber-700 font-mono tabular-nums">
              {inProgressCount}
            </dd>
          </div>

          <div className="sm:pl-6">
            <dt className="text-sm text-slate-500">Concluídos</dt>
            <dd className="mt-1 text-2xl sm:text-3xl font-bold text-teal-700 font-mono tabular-nums">
              {completedCount}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
