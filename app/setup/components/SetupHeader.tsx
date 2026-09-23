'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
    { href: '/setup/env', label: 'Environment' },
    { href: '/setup/database', label: 'Database' },
    { href: '/setup/cli', label: 'CLI' },
    { href: '/setup/guide', label: 'Guide' },
] as const

export function SetupHeader() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-black/80 backdrop-blur-md">
            <div className="mx-auto max-w-8xl px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between py-6">
                    <Link
                        href="/setup/env"
                        className="flex items-center gap-3 font-bold tracking-tight text-white group text-lg"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black font-bold text-sm shadow-sm transition-all">
                            ▲
                        </span>
                        <span>Setup Panel</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        {/* <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-900 text-neutral-300 border border-neutral-800">
                            <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
                            Initialization Wizard
                        </span> */}
                    </div>
                </div>

                <nav className="flex gap-2 pb-3 overflow-x-auto no-scrollbar" aria-label="Setup sections">
                    {TABS.map((tab) => {
                        const active =
                            pathname === tab.href || pathname.startsWith(tab.href + '/')

                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                aria-current={active ? 'page' : undefined}
                                className={
                                    'px-6 py-3 text-lg font-medium rounded-xl transition-all duration-200 ' +
                                    (active
                                        ? 'bg-white text-black font-semibold shadow-sm'
                                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900')
                                }
                            >
                                {tab.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </header>
    )
}