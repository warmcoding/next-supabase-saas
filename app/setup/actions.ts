

import { promises as fs } from 'fs'
import path from 'path'

export const CONFIG_ITEMS = [
    { key: 'NEXT_PUBLIC_SUPABASE_URL', label: 'Supabase URL', group: 'supabase', required: true },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', label: 'Supabase Anon Key', group: 'supabase', required: true },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', label: 'Supabase Service Role Key', group: 'supabase', required: true, secret: true },
    { key: 'R2_ACCOUNT_ID', label: 'R2 Account ID', group: 'r2', required: true },
    { key: 'R2_ACCESS_KEY_ID', label: 'R2 Access Key ID', group: 'r2', required: true },
    { key: 'R2_SECRET_ACCESS_KEY', label: 'R2 Secret Access Key', group: 'r2', required: true, secret: true },
    { key: 'R2_BUCKET_NAME', label: 'R2 Bucket Name', group: 'r2', required: true },
    { key: 'MODAL_TOKEN_ID', label: 'Modal Token ID', group: 'modal', required: false },
    { key: 'MODAL_TOKEN_SECRET', label: 'Modal Token Secret', group: 'modal', required: false, secret: true },
] as const

export type ConfigItem = (typeof CONFIG_ITEMS)[number]
export type ConfigStatus = { key: string; label: string; group: string; configured: boolean }

/** 只返回是否已配置，不回显值 */
export async function getConfigStatus(): Promise<ConfigStatus[]> {
    return CONFIG_ITEMS.map((item) => ({
        key: item.key,
        label: item.label,
        group: item.group,
        configured: Boolean(process.env[item.key]?.trim()),
    }))
}
