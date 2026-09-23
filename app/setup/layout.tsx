import { SetupHeader } from './components/SetupHeader'

export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white text-base flex flex-col selection:bg-white selection:text-black">
      <SetupHeader />
      <main className="flex-1 mx-auto w-full max-w-8xl px-6 sm:px-8 lg:px-12 py-10">
        <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-2xl shadow-2xl p-8 sm:p-12">
          {children}
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-neutral-500 border-t border-neutral-900">
        Next Supabase SaaS Boilerplate &bull; Setup Wizard
      </footer>
    </div>
  )
}