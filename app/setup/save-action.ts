'use server'

import { promises as fs } from 'fs'
import path from 'path'
import { CONFIG_ITEMS } from './config'

export async function saveConfig(formData: FormData) {
    const envPath = path.join(process.cwd(), '.env.local')
    let current = ''
    try {
        current = await fs.readFile(envPath, 'utf-8')
    } catch {
        // 忽略
    }

    const lines = current ? current.split('\n') : []
    const map = new Map<string, string>()
    for (const line of lines) {
        const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
        if (m) map.set(m[1], m[2])
    }

    for (const item of CONFIG_ITEMS) {
        const val = formData.get(item.key)
        if (typeof val === 'string' && val.trim()) {
            map.set(item.key, val.trim())
        }
    }

    const output = Array.from(map.entries())
        .map(([k, v]) => `${k}=${v}`)
        .join('\n')

    await fs.writeFile(envPath, output + '\n', 'utf-8')
}