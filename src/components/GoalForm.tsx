import React, { useEffect, useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import {
  GOAL_STATUS_LABELS,
  GoalStatus,
  StudyGoal,
  StudyGoalFormData,
} from '../types/studyGoal';

interface GoalFormProps {
  editingGoal: StudyGoal | null;
  titleInputRef: React.RefObject<HTMLInputElement | null>;
  onSubmit: (data: StudyGoalFormData) => void;
  onCancelEdit: () => void;
}

interface FormErrors {
  title?: string;
  deadline?: string;
}

const INITIAL_FORM_STATE: StudyGoalFormData = {
  title: '',
  description: '',
  deadline: '',
  status: GoalStatus.NOT_STARTED,
};

export function GoalForm({
  editingGoal,
  titleInputRef,
  onSubmit,
  onCancelEdit,
}: GoalFormProps) {
  const [formData, setFormData] = useState<StudyGoalFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title,
        description: editingGoal.description,
        deadline: editingGoal.deadline,
        status: editingGoal.status,
      });
      setErrors({});
    } else {
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }
  }, [editingGoal]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = 'Informe um título claro para o seu objetivo de estudo.';
    } else if (formData.title.trim().length < 3) {
      nextErrors.title = 'O título deve ter pelo menos 3 caracteres.';
    }

    if (!formData.deadline) {
      nextErrors.deadline = 'Escolha uma data de prazo para ajudar no seu planejamento.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      deadline: formData.deadline,
      status: formData.status,
    });

    if (!editingGoal) {
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }
  };

  const handleClearOrCancel = () => {
    if (editingGoal) {
      onCancelEdit();
    } else {
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }
  };

  const isEditing = Boolean(editingGoal);

  return (
    <section
      id="formulario-objetivo"
      aria-labelledby="form-heading"
      className={`bg-white rounded-xl border p-6 transition-colors ${
        isEditing ? 'border-teal-600 ring-2 ring-teal-600/15' : 'border-slate-200'
      }`}
    >
      <div className="mb-5">
        <h2 id="form-heading" className="text-lg font-bold text-slate-900">
          {isEditing ? 'Editar objetivo de estudo' : 'Novo objetivo de estudo'}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {isEditing
            ? 'Atualize as informações abaixo e salve para manter seu plano em dia.'
            : 'Defina o que você quer estudar, detalhe os tópicos e escolha uma data realista.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Campo: Título */}
        <div>
          <label
            htmlFor="goal-title"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Título do objetivo <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            ref={titleInputRef}
            id="goal-title"
            name="title"
            type="text"
            maxLength={100}
            placeholder="Ex.: Aprender lógica de programação com exercícios"
            value={formData.title}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, title: e.target.value }));
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'goal-title-error' : 'goal-title-hint'}
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-red-500 focus:border-red-600 focus:ring-red-600/20'
                : 'border-slate-300 focus:border-teal-700 focus:ring-teal-700/20'
            }`}
          />
          {errors.title ? (
            <p id="goal-title-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.title}
            </p>
          ) : (
            <p id="goal-title-hint" className="mt-1 text-xs text-slate-500">
              Use frases curtas e diretas sobre o tema que deseja dominar.
            </p>
          )}
        </div>

        {/* Campo: Descrição */}
        <div>
          <label
            htmlFor="goal-description"
            className="block text-sm font-medium text-slate-800 mb-1.5"
          >
            Descrição e passos
          </label>
          <textarea
            id="goal-description"
            name="description"
            rows={3}
            maxLength={400}
            placeholder="Ex.: Assistir às aulas 1 a 4, anotar conceitos de variáveis e resolver 5 exercícios práticos."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 resize-y"
          />
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
            <span>Opcional — ajuda a lembrar por onde começar.</span>
            <span className="tabular-nums">{formData.description.length}/400</span>
          </div>
        </div>

        {/* Campos: Prazo e Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="goal-deadline"
              className="block text-sm font-medium text-slate-800 mb-1.5"
            >
              Prazo <span className="text-red-600" aria-hidden="true">*</span>
            </label>
            <input
              id="goal-deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, deadline: e.target.value }));
                if (errors.deadline) {
                  setErrors((prev) => ({ ...prev, deadline: undefined }));
                }
              }}
              aria-invalid={Boolean(errors.deadline)}
              aria-describedby={errors.deadline ? 'goal-deadline-error' : undefined}
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 ${
                errors.deadline
                  ? 'border-red-500 focus:border-red-600 focus:ring-red-600/20'
                  : 'border-slate-300 focus:border-teal-700 focus:ring-teal-700/20'
              }`}
            />
            {errors.deadline && (
              <p
                id="goal-deadline-error"
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.deadline}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="goal-status"
              className="block text-sm font-medium text-slate-800 mb-1.5"
            >
              Status atual
            </label>
            <select
              id="goal-status"
              name="status"
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as GoalStatus,
                }))
              }
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 cursor-pointer"
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
        </div>

        {/* Botões de ação */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            <Check className="w-4 h-4" aria-hidden="true" />
            <span>{isEditing ? 'Salvar alterações' : 'Cadastrar objetivo'}</span>
          </button>

          {(isEditing || formData.title || formData.description || formData.deadline) && (
            <button
              type="button"
              onClick={handleClearOrCancel}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{isEditing ? 'Cancelar edição' : 'Limpar'}</span>
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
