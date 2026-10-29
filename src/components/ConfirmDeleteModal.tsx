import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { StudyGoal } from '../types/studyGoal';

interface ConfirmDeleteModalProps {
  goalToDelete: StudyGoal | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({
  goalToDelete,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!goalToDelete) return;

    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goalToDelete, onCancel]);

  if (!goalToDelete) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 id="delete-modal-title" className="text-base font-bold text-slate-900">
              Confirmar exclusão do objetivo
            </h2>
            <p id="delete-modal-description" className="mt-2 text-sm text-slate-600 leading-relaxed">
              Tem certeza de que deseja excluir o objetivo{' '}
              <strong className="font-semibold text-slate-900">
                &ldquo;{goalToDelete.title}&rdquo;
              </strong>
              ? Esta ação não poderá ser desfeita.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Sim, excluir objetivo
          </button>
        </div>
      </div>
    </div>
  );
}
