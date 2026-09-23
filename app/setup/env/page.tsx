import { getConfigStatus } from '../actions'
import { saveConfig } from '../save-action'
import { CONFIG_ITEMS } from '../config'

export const dynamic = 'force-dynamic'

const GROUP_LABEL: Record<string, string> = {
    supabase: 'Supabase (Database & Auth)',
    r2: 'Cloudflare R2 (Object Storage)',
    modal: 'Modal (Tasks / AI Processing)',
}

export default async function EnvPage({
    searchParams,
}: {
    searchParams: Promise<{ group?: string }>
}) {
    const { group } = await searchParams
    const status = await getConfigStatus()
    const statusMap = new Map(status.map((s) => [s.key, s.configured]))
    const groups = ['supabase', 'r2', 'modal'] as const
    const activeGroups = group
        ? groups.filter((g) => g === group)
        : groups
    const missingRequired = CONFIG_ITEMS.filter((i) => i.required && !statusMap.get(i.key))

    return (
        <div className="space-y-10">
            <section className="border-b border-neutral-800 pb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Environment Variables</h1>
                        <p className="mt-2 text-sm text-neutral-400">
                            Configure your platform credentials securely. Sensitive values are written only to the server&apos;s <code className="text-white bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded font-mono text-xs">.env.local</code> file and will not be exposed.
                        </p>
                    </div>
                </div>
                <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
                    {missingRequired.length === 0 ? (
                        <div className="flex items-center gap-2 text-sm text-white">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black font-bold text-xs">✓</span>
                            <span className="font-medium">All required environment variables are fully configured!</span>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                            <div className="flex items-center gap-2 text-neutral-200">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-white font-bold text-xs">!</span>
                                <span className="font-medium">
                                    {missingRequired.length} required item{missingRequired.length > 1 ? 's' : ''} missing:
                                </span>
                            </div>
                            <span className="text-xs text-neutral-400 bg-black px-3 py-1 rounded-lg border border-neutral-800 font-mono">
                                {missingRequired.map((i) => i.label).join(', ')}
                            </span>
                        </div>
                    )}
                </div>
            </section>
            <form action={saveConfig} className="space-y-8">
                {activeGroups.map((group) => {
                    const items = CONFIG_ITEMS.filter((i) => i.group === group)
                    return (
                        <section
                            key={group}
                            className="rounded-2xl border border-neutral-800/80 bg-neutral-950/60 p-8 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800/80">
                                <h2 className="text-lg font-semibold text-white tracking-wide">
                                    {GROUP_LABEL[group]}
                                </h2>
                            </div>

                            <div className="grid gap-6">
                                {items.map((item) => {
                                    const configured = statusMap.get(item.key)
                                    return (
                                        <div key={item.key} className="space-y-2.5">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-1.5 font-medium text-neutral-200">
                                                    <span>{item.label}</span>
                                                    {item.required && (
                                                        <span className="text-white font-bold" title="Required">*</span>
                                                    )}
                                                </div>
                                                <div>
                                                    {configured ? (
                                                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-neutral-900 text-white border border-neutral-700 font-mono">
                                                            ✓ Configured
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800 font-mono">
                                                            Not Configured
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <input
                                                type={item.secret ? 'password' : 'text'}
                                                name={item.key}
                                                placeholder={configured ? 'Configured (leave blank to keep unchanged)' : item.key}
                                                autoComplete="off"
                                                className="w-full rounded-xl border border-neutral-800 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-mono"
                                            />

                                            <p className="text-xs text-neutral-400 leading-relaxed">{item.hint}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    )
                })}
                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        className="rounded-xl bg-white hover:bg-neutral-200 px-7 py-3 text-sm font-semibold text-black shadow-sm transition-all"
                    >
                        Save to .env.local
                    </button>
                </div>
            </form>
        </div>
    )
}