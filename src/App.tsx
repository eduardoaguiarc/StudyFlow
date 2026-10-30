/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { StudyAssistant } from './components/StudyAssistant';
import { BeginnerTipsSection } from './components/BeginnerTipsSection';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { EmptyState } from './components/EmptyState';
import { FilterToolbar } from './components/FilterToolbar';
import { GoalCard } from './components/GoalCard';
import { GoalForm } from './components/GoalForm';
import { Header } from './components/Header';
import { SummaryStrip } from './components/SummaryStrip';
import { storageService } from './services/storageService';
import {
  GoalStatus,
  StatusFilter,
  StudyGoal,
  StudyGoalFormData,
} from './types/studyGoal';

export default function App() {
  const [goals, setGoals] = useState<StudyGoal[]>(() => storageService.getAll());
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null);
  const [goalPendingDelete, setGoalPendingDelete] = useState<StudyGoal | null>(null);
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!feedbackMessage) return;
    const timer = window.setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [feedbackMessage]);

  // Sincronização caso outra aba atualize o localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setGoals(storageService.getAll());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const focusFormInput = () => {
    const formElement = document.getElementById('formulario-objetivo');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    window.setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);
  };

  const handleFocusNewGoal = () => {
    setEditingGoal(null);
    focusFormInput();
  };

  const handleSubmitGoal = (data: StudyGoalFormData) => {
    if (editingGoal) {
      const updated = storageService.update(editingGoal.id, data);
      setGoals(updated);
      setEditingGoal(null);
      setFeedbackMessage('Objetivo atualizado com sucesso.');
    } else {
      const updated = storageService.create(data);
      setGoals(updated);
      setFeedbackMessage('Novo objetivo cadastrado com sucesso.');
    }
  };

  const handleStartEdit = (goal: StudyGoal) => {
    setEditingGoal(goal);
    focusFormInput();
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
  };

  const handleQuickStatusChange = (goal: StudyGoal, nextStatus: GoalStatus) => {
    const updated = storageService.update(goal.id, {
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline,
      status: nextStatus,
    });
    setGoals(updated);
    if (editingGoal && editingGoal.id === goal.id) {
      setEditingGoal({ ...editingGoal, status: nextStatus });
    }
    setFeedbackMessage('Status atualizado.');
  };

  const handleRequestDelete = (goal: StudyGoal) => {
    setGoalPendingDelete(goal);
  };

  const handleConfirmDelete = () => {
    if (!goalPendingDelete) return;
    const deletedId = goalPendingDelete.id;
    const updated = storageService.remove(deletedId);
    setGoals(updated);
    if (editingGoal && editingGoal.id === deletedId) {
      setEditingGoal(null);
    }
    setGoalPendingDelete(null);
    setFeedbackMessage('Objetivo excluído da sua lista.');
  };

  const handleCancelDelete = () => {
    setGoalPendingDelete(null);
  };

  const handleResetFilters = () => {
    setActiveFilter('TODOS');
    setSearchQuery('');
  };

  const filteredGoals = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return goals.filter((goal) => {
      const matchesStatus =
        activeFilter === 'TODOS' || goal.status === activeFilter;

      const matchesSearch =
        !normalizedQuery ||
        goal.title.toLowerCase().includes(normalizedQuery) ||
        goal.description.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesSearch;
    });
  }, [goals, activeFilter, searchQuery]);

  return (
    <div id="topo" className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        onFocusNewGoal={handleFocusNewGoal}
      />

      <SummaryStrip goals={goals} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <StudyAssistant goals={goals} />
        {feedbackMessage && (
          <div
            role="status"
            aria-live="polite"
            className="mb-6 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-teal-50 border border-teal-200 text-sm font-medium text-teal-900"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna do Formulário (Criação / Edição) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <GoalForm
              editingGoal={editingGoal}
              titleInputRef={titleInputRef}
              onSubmit={handleSubmitGoal}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* Coluna da Listagem de Cartões */}
          <section
            id="lista-objetivos"
            aria-label="Lista de objetivos de estudo"
            className="lg:col-span-7 space-y-6"
          >
            <FilterToolbar
              activeFilter={activeFilter}
              searchQuery={searchQuery}
              filteredCount={filteredGoals.length}
              totalCount={goals.length}
              onFilterChange={setActiveFilter}
              onSearchChange={setSearchQuery}
            />

            {filteredGoals.length === 0 ? (
              <EmptyState
                hasAnyGoals={goals.length > 0}
                onFocusNewGoal={handleFocusNewGoal}
                onResetFilters={handleResetFilters}
              />
            ) : (
              <div className="space-y-4">
                {filteredGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    isBeingEdited={editingGoal?.id === goal.id}
                    onEdit={handleStartEdit}
                    onRequestDelete={handleRequestDelete}
                    onStatusChange={handleQuickStatusChange}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <BeginnerTipsSection />

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>StudyFlow — Organização simples para estudantes iniciantes.</span>
          <span>Seus objetivos são armazenados localmente no seu navegador.</span>
        </div>
      </footer>

      <ConfirmDeleteModal
        goalToDelete={goalPendingDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
