export default function DatabasePage() {
    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-2xl font-semibold">Database</h1>
                <p className="mt-2 text-sm text-neutral-400">
                    Create table schemas, manage RLS policies, run migrations and seed data.
                </p>
            </section>

            <section className="rounded-xl border border-neutral-800 p-6 space-y-3">
                <h2 className="text-lg font-medium">Upcoming Features</h2>
                <ul className="text-sm text-neutral-400 space-y-1">
                    <li>· Migration file list + applied status</li>
                    <li>· RLS policy template generator</li>
                    <li>· Seed data import</li>
                    <li>· Schema visualization</li>
                </ul>
            </section>
        </div>
    )
}