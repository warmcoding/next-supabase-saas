import { i18nConfig } from './config'

export type Locale = (typeof i18nConfig.locales)[number]

export function getLocaleFromHost(host: string): Locale {
    if (process.env.NODE_ENV === 'development') {
        const forced = process.env.NEXT_PUBLIC_FORCE_LOCALE
        if (forced && i18nConfig.locales.includes(forced as Locale)) {
            return forced as Locale
        }
    }

    for (const [prefix, locale] of Object.entries(i18nConfig.domainMap)) {
        if (host.startsWith(prefix)) return locale as Locale
    }

    return i18nConfig.defaultLocale as Locale
}