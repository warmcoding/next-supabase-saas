'use client'

import { useState, useEffect, useTransition } from 'react'
import {
    testConnection,
    listTables,
    fetchAndConvert,
    type MySQLConfig,
} from '../actions'
import { getDefaultMySQLConfig } from '../actions'

export function MigrationForm() {
    const [config, setConfig] = useState<MySQLConfig>({
        host: '',
        port: 3306,
        user: '',
        password: '',
        database: '',
    })

    useEffect(() => {
        getDefaultMySQLConfig().then((d) => {
            setConfig((c) => ({
                ...c,
                host: d.host,
                port: d.port,
                user: d.user,
                database: d.database,
            }))
        })
    }, [])
    const [connected, setConnected] = useState(false)
    const [tables, setTables] = useState<string[]>([])
    const [selectedTable, setSelectedTable] = useState('')
    const [result, setResult] = useState<{
        mysqlDDL: string
        sql: string
        warnings: string[]
    } | null>(null)
    const [error, setError] = useState('')
    const [pending, startTransition] = useTransition()

    const update = (field: keyof MySQLConfig, value: string | number) => {
        setConfig((c) => ({ ...c, [field]: value }))
        setConnected(false)
        setTables([])
        setSelectedTable('')
        setResult(null)
        setError('')
    }

    const handleTest = () => {
        startTransition(async () => {
            setError('')
            const res = await testConnection(config)
            if (!res.ok) {
                setError(res.error)
                return
            }
            setConnected(true)
            const listRes = await listTables(config)
            if (listRes.ok) setTables(listRes.tables)
        })
    }

    const handleGenerate = () => {
        if (!selectedTable) return
        startTransition(async () => {
            setError('')
            const res = await fetchAndConvert(config, selectedTable)
            if (!res.ok) {
                setError(res.error)
                return
            }
            setResult({
                mysqlDDL: res.mysqlDDL,
                sql: res.sql,
                warnings: res.warnings,
            })
        })
    }

    const copySQL = () => {
        if (result) navigator.clipboard.writeText(result.sql)
    }

    return (
        <div className="space-y-8">
            {/* Step 1:  */}
            <section className="rounded-xl border border-neutral-800 p-6 space-y-4">
                <h2 className="text-lg font-medium">1. Connect to MySQL</h2>
                <div className="grid grid-cols-2 gap-3">
                    <input
                        placeholder="Host"
                        value={config.host}
                        onChange={(e) => update('host', e.target.value)}
                        className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm"
                    />
                    <input
                        placeholder="Port"
                        type="number"
                        value={config.port}
                        onChange={(e) => update('port', Number(e.target.value))}
                        className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm"
                    />
                    <input
                        placeholder="User"
                        value={config.user}
                        onChange={(e) => update('user', e.target.value)}
                        className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm"
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        value={config.password}
                        onChange={(e) => update('password', e.target.value)}
                        className="rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm"
                    />
                    <input
                        placeholder="Database"
                        value={config.database}
                        onChange={(e) => update('database', e.target.value)}
                        className="col-span-2 rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm"
                    />
                </div>
                <button
                    onClick={handleTest}
                    disabled={pending || !config.host || !config.user}
                    className="rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-900 disabled:opacity-50"
                >
                    {pending ? 'Connecting...' : 'Test Connection'}
                </button>
                {connected && (
                    <p className="text-sm text-green-400">
                        ✅ Connected — found {tables.length} table(s)
                    </p>
                )}
                {error && <p className="text-sm text-red-400">❌ {error}</p>}
            </section>

            {/* Step 2:  */}
            {connected && tables.length > 0 && (
                <section className="rounded-xl border border-neutral-800 p-6 space-y-4">
                    <h2 className="text-lg font-medium">2. Select Table</h2>
                    <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm"
                    >
                        <option value="">-- Choose a table --</option>
                        {tables.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleGenerate}
                        disabled={pending || !selectedTable}
                        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-900 disabled:opacity-50"
                    >
                        {pending ? 'Generating...' : 'Generate Postgres SQL'}
                    </button>
                </section>
            )}

            {/* Step 3: SQL  */}
            {result && (
                <section className="rounded-xl border border-neutral-800 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium">3. Postgres SQL</h2>
                        <button
                            onClick={copySQL}
                            className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-800"
                        >
                            Copy SQL
                        </button>
                    </div>

                    <pre className="overflow-x-auto rounded-md bg-neutral-950 p-4 text-xs text-neutral-300">
                        {result.sql}
                    </pre>

                    {result.warnings.length > 0 && (
                        <div className="rounded-md border border-amber-900 bg-amber-950/30 p-3">
                            <p className="text-sm font-medium text-amber-400">⚠️ Warnings</p>
                            <ul className="mt-1 list-inside list-disc text-xs text-amber-300">
                                {result.warnings.map((w, i) => (
                                    <li key={i}>{w}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <details className="text-xs text-neutral-500">
                        <summary className="cursor-pointer">View original MySQL DDL</summary>
                        <pre className="mt-2 overflow-x-auto rounded-md bg-neutral-950 p-3 text-neutral-400">
                            {result.mysqlDDL}
                        </pre>
                    </details>

                    <p className="text-xs text-neutral-500">
                        复制 SQL，粘贴到 Supabase SQL Editor 执行。执行时会问 RLS，选{' '}
                        <code className="text-neutral-300">Run and enable RLS</code>。
                    </p>
                </section>
            )}
        </div>
    )
}