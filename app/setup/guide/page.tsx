export default function GuidePage() {
    return (
        <div className="space-y-10 text-sm leading-relaxed">
            <section>
                <h1 className="text-2xl font-semibold mb-4">Platform Setup Guide</h1>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-medium">Supabase</h2>
                <ol className="list-decimal list-inside space-y-1 text-neutral-400">
                    <li>Sign in to supabase.com and open your Project</li>
                    <li>Go to Settings → API in the left sidebar</li>
                    <li>Copy <code>Project URL</code> → paste into <code>NEXT_PUBLIC_SUPABASE_URL</code></li>
                    <li>Copy <code>anon public</code> → paste into <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                    <li>Copy <code>service_role</code> → paste into <code>SUPABASE_SERVICE_ROLE_KEY</code> (keep it secret)</li>
                </ol>
                <a
                    href="https://supabase.com/dashboard/project/_/settings/api"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-blue-400 hover:underline"
                >
                    Open Supabase API settings →
                </a>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-medium">Cloudflare R2</h2>
                <ol className="list-decimal list-inside space-y-1 text-neutral-400">
                    <li>Open Cloudflare Dashboard → R2</li>
                    <li>Copy the <code>Account ID</code> from the bottom-right corner</li>
                    <li>Go to R2 → Manage API Tokens → create a Token (Object Read &amp; Write)</li>
                    <li>Save the <code>Access Key ID</code> and <code>Secret Access Key</code> (shown only once)</li>
                    <li>Create a bucket and fill its name into <code>R2_BUCKET_NAME</code></li>
                </ol>
                <a
                    href="https://dash.cloudflare.com/?to=/:account/r2/api-tokens"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-blue-400 hover:underline"
                >
                    Open R2 API Tokens →
                </a>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-medium">Modal</h2>
                <ol className="list-decimal list-inside space-y-1 text-neutral-400">
                    <li>Sign in to modal.com</li>
                    <li>Go to Settings → API Tokens → create a new one</li>
                    <li>Copy the <code>Token ID</code> and <code>Token Secret</code></li>
                </ol>
                <a
                    href="https://modal.com/settings/tokens"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-blue-400 hover:underline"
                >
                    Open Modal Tokens →
                </a>
            </section>
        </div>
    )
}