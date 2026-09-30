import { headers } from 'next/headers'
import { getLocaleFromHost } from './get-locale'
import { getMessages } from './messages'

export async function getServerI18n() {
    const headersList = await headers()
    const host = headersList.get('host') || ''
    const locale = getLocaleFromHost(host)
    return { locale, messages: getMessages(locale) }
}