import { MigrationForm } from './_components/MigrationForm'

export default function DatabasePage() {
    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-2xl font-semibold">Database</h1>
                <p className="mt-2 text-sm text-neutral-400">
                    Connect to your MySQL database, pick a table, and generate the
                    equivalent Postgres DDL for Supabase.
                </p>
            </section>

            <MigrationForm />
        </div>
    )
}