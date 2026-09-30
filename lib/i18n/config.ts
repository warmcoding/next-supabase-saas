export const i18nConfig = {
    locales: ['en', 'zh'] as const,
    defaultLocale: 'en',
    domainMap: {
        'cn.': 'zh',
        'en.': 'en',
    } as Record<string, 'en' | 'zh'>,
}