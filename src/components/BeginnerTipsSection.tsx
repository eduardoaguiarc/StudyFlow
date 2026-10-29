export function BeginnerTipsSection() {
  return (
    <section
      id="como-comecar"
      aria-labelledby="tips-heading"
      className="border-t border-slate-200 bg-white mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl">
          <h2 id="tips-heading" className="text-xl font-bold text-slate-900 text-balance">
            Como criar bons objetivos de estudo sem sobrecarga
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            Três práticas simples para manter a constância quando você está começando a estudar um novo assunto.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              01. Divida temas grandes em partes menores
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Em vez de cadastrar &ldquo;Aprender Inglês&rdquo; ou &ldquo;Estudar Matemática&rdquo;,
              prefira metas específicas como &ldquo;Praticar 20 verbos essenciais no presente&rdquo;.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              02. Defina prazos gentis e realistas
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Escolha datas que caibam na sua rotina real da semana. Se imprevistos acontecerem,
              basta editar o prazo e continuar avançando.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">
              03. Foque em um ou dois objetivos por vez
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Mantenha como &ldquo;Em andamento&rdquo; apenas o que você está estudando nesta semana e
              deixe os próximos temas como &ldquo;Não iniciado&rdquo;.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
