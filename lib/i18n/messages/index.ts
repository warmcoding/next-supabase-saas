import baseEn from './base/en.json'
import baseZh from './base/zh.json'

export const messages = {
    en: baseEn,
    zh: baseZh,
} as const

export type Messages = typeof messages.en

export function getMessages(locale: string): Messages {
    return (messages as Record<string, Messages>)[locale] ?? messages.en
}