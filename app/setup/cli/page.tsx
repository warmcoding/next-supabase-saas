const SCRIPTS = [
    { id: 'link', label: 'supabase link', desc: 'Link to the remote project' },
    { id: 'db-push', label: 'supabase db push', desc: 'Push migrations to remote' },
    { id: 'db-reset', label: 'supabase db reset', desc: 'Reset local + migrations + seed' },
    { id: 'gen-types', label: 'supabase gen types', desc: 'Generate TypeScript types' },
]

export default function CliPage() {
    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-2xl font-semibold">CLI Scripts</h1>
                <p className="mt-2 text-sm text-neutral-400">
                    Run common commands with one click. Logs stream in real time.
                </p>
            </section>

            <div className="space-y-3">
                {SCRIPTS.map((s) => (
                    <div
                        key={s.id}
                        className="flex items-center justify-between rounded-lg border border-neutral-800 p-4"
                    >
                        <div>
                            <div className="font-mono text-sm">{s.label}</div>
                            <div className="text-xs text-neutral-500">{s.desc}</div>
                        </div>
                        <button
                            className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-800"
                            disabled
                            title="Pending Server Action integration"
                        >
                            Run
                        </button>
                    </div>
                ))}
            </div>

            <p className="text-xs text-neutral-600">
                Once wired to Server Actions, each button will run in-page and stream its output here.
            </p>
        </div>
    )
}