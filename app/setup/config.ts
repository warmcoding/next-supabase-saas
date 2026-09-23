export const CONFIG_ITEMS = [
    { key: 'NEXT_PUBLIC_SUPABASE_URL', label: 'Supabase URL', group: 'supabase', required: true, secret: false, hint: 'Supabase → Project Settings → API → Project URL' },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', label: 'Supabase Anon Key', group: 'supabase', required: true, secret: false, hint: 'Same page → anon public' },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', label: 'Supabase Service Role Key', group: 'supabase', required: true, secret: true, hint: 'Same page → service_role (never expose)' },
    { key: 'R2_ACCOUNT_ID', label: 'R2 Account ID', group: 'r2', required: true, secret: false, hint: 'Cloudflare Dashboard → Account ID (bottom-right corner)' },
    { key: 'R2_ACCESS_KEY_ID', label: 'R2 Access Key ID', group: 'r2', required: true, secret: false, hint: 'R2 → Manage API Tokens' },
    { key: 'R2_SECRET_ACCESS_KEY', label: 'R2 Secret Access Key', group: 'r2', required: true, secret: true, hint: 'Shown only once when creating the token' },
    { key: 'R2_BUCKET_NAME', label: 'R2 Bucket Name', group: 'r2', required: true, secret: false, hint: 'Name of the bucket you created' },
    { key: 'MODAL_TOKEN_ID', label: 'Modal Token ID', group: 'modal', required: false, secret: false, hint: 'modal.com → Settings → API Tokens' },
    { key: 'MODAL_TOKEN_SECRET', label: 'Modal Token Secret', group: 'modal', required: false, secret: true, hint: 'Same page as above' },
] as const

export type ConfigItem = (typeof CONFIG_ITEMS)[number]
export type ConfigStatus = { key: string; label: string; group: string; configured: boolean }