import { defineConfig, type DefaultTheme } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { parse } from 'yaml'
import pages from './pages.json'

const api = parse(readFileSync(new URL('../../api/openapi.yaml', import.meta.url), 'utf8')) as {
  paths: Record<string, Record<string, { operationId?: string }>>
  components: { schemas: Record<string, unknown> }
}
function apiSidebar(lang: 'ru' | 'en'): DefaultTheme.SidebarItem {
  const item = (name: string): DefaultTheme.SidebarItem => ({
    text: readFileSync(new URL(`../${lang}/reference/api/${name}.md`, import.meta.url), 'utf8').split('\n')[0].replace(/^# /, ''),
    link: `/${lang}/reference/api/${name}`,
  })
  return {
    text: 'HTTP API', link: `/${lang}/reference/api/`, collapsed: true,
    items: [
      ...Object.values(api.paths).flatMap(path => Object.values(path)
        .filter(operation => operation.operationId)
        .map(operation => item(operation.operationId!.replaceAll('_', '-')))),
      { ...item('schemas'), collapsed: true, items: Object.keys(api.components.schemas).map(name => item(`schema-${name.toLowerCase()}`)) },
    ],
  }
}

const groups = [
  ['guide/', 'Знакомство', 'Introduction'],
  ['getting-started/', 'Быстрый старт', 'Quick start'],
  ['configuration/', 'Настройка агентов', 'Configure agents'],
  ['integrations/mattermost/', 'Mattermost', 'Mattermost'],
  ['integrations/custom/', 'Своя интеграция', 'Custom integrations'],
  ['web/', 'Веб-интерфейс', 'Web interface'],
  ['operations/', 'Эксплуатация', 'Operations'],
  ['reference/', 'Справочник', 'Reference'],
]
function sidebar(lang: 'ru' | 'en'): DefaultTheme.SidebarItem[] {
  const index = lang === 'ru' ? 1 : 2
  return groups.map(([prefix, ru, en]) => ({
    text: lang === 'ru' ? ru : en,
    collapsed: prefix !== 'guide/' && prefix !== 'getting-started/',
    items: [
      ...pages.filter(([path]) => path.startsWith(prefix)).map(page => ({ text: page[index], link: `/${lang}/${page[0]}` })),
      ...(prefix === 'reference/' ? [apiSidebar(lang)] : []),
    ],
  }))
}
function theme(lang: 'ru' | 'en'): DefaultTheme.Config {
  const ru = lang === 'ru'
  return {
    nav: [
      { text: ru ? 'Руководство' : 'Guide', link: `/${lang}/guide/overview`, activeMatch: `^/${lang}/(?:guide/|configuration/|web/|operations/|reference/(?!api/))` },
      { text: ru ? 'Быстрый старт' : 'Quick start', link: `/${lang}/getting-started/requirements`, activeMatch: `^/${lang}/getting-started/` },
      { text: ru ? 'Интеграции' : 'Integrations', link: `/${lang}/integrations/custom/overview`, activeMatch: `^/${lang}/integrations/` },
      { text: 'API', link: `/${lang}/reference/api/`, activeMatch: `^/${lang}/reference/api/` },
    ],
    sidebar: { [`/${lang}/`]: sidebar(lang) },
    outline: { level: [2, 3], label: ru ? 'На этой странице' : 'On this page' },
    docFooter: { prev: ru ? 'Предыдущая страница' : 'Previous page', next: ru ? 'Следующая страница' : 'Next page' },
    editLink: { pattern: 'https://github.com/orpheus-agents/orpheus-agents.github.io/edit/main/docs/:path', text: ru ? 'Предложить исправление' : 'Suggest an edit' },
    darkModeSwitchLabel: ru ? 'Цветовая тема' : 'Appearance',
    darkModeSwitchTitle: ru ? 'Тёмная тема' : 'Switch to dark theme',
    lightModeSwitchTitle: ru ? 'Светлая тема' : 'Switch to light theme',
    sidebarMenuLabel: ru ? 'Навигация' : 'Menu',
    returnToTopLabel: ru ? 'Наверх' : 'Return to top',
    langMenuLabel: ru ? 'Язык' : 'Language',
    skipToContentLabel: ru ? 'К содержимому' : 'Skip to content',
  }
}
const site = 'https://orpheus-agents.github.io'
const descriptions = {
  en: 'The AI agent platform for your company. Deploy, configure and integrate Orpheus.',
  ru: 'Платформа AI-агентов компании. Развёртывание, настройка и интеграции Orpheus.',
}
export default defineConfig({
  title: 'Orpheus',
  description: descriptions.en,
  lang: 'en',
  cleanUrls: false,
  appearance: true,
  vite: {
    resolve: {
      // Keep language order and navigation state consistent across layouts.
      alias: ['VPNavBarTranslations', 'VPNavScreenTranslations', 'VPNavBarExtra', 'VPNavScreenMenuLink'].map(name => ({
        find: new RegExp(`^.*\\/${name}\\.vue$`),
        replacement: fileURLToPath(new URL(`./theme/${name}.vue`, import.meta.url)),
      })),
    },
  },
  sitemap: { hostname: site },
  // Link previews: every page gets its title, description and the card of its language.
  transformHead({ pageData }) {
    if (pageData.isNotFound) return
    const lang = pageData.relativePath.startsWith('ru/') ? 'ru' : 'en'
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')
    const image = `${site}/og-${lang}.png`
    return [
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'Orpheus' }],
      ['meta', { property: 'og:locale', content: lang === 'ru' ? 'ru_RU' : 'en_US' }],
      ['meta', { property: 'og:title', content: pageData.title ? `${pageData.title} | Orpheus` : 'Orpheus' }],
      ['meta', { property: 'og:description', content: pageData.description || descriptions[lang] }],
      ['meta', { property: 'og:url', content: `${site}/${path}` }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:image', content: image }],
    ]
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'preload', href: '/fonts/MartianGroteskSemiExpanded-Bold.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
  ],
  locales: {
    en: { label: 'English', lang: 'en', link: '/en/', themeConfig: theme('en') },
    ru: { label: 'Русский', lang: 'ru', link: '/ru/', description: descriptions.ru, themeConfig: theme('ru') },
  },
  themeConfig: {
    nav: theme('en').nav,
    logo: { alt: 'Orpheus', light: { src: '/brand/orpheus-logo-light.svg', width: 160, height: 25 }, dark: { src: '/brand/orpheus-logo.svg', width: 160, height: 25 } },
    siteTitle: false,
    socialLinks: [{ icon: 'github', link: 'https://github.com/orpheus-agents' }],
    search: { provider: 'local', options: { locales: { ru: { translations: {
      button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск по документации' },
      modal: { displayDetails: 'Подробности', resetButtonTitle: 'Очистить', backButtonTitle: 'Закрыть', noResultsText: 'Ничего не найдено', footer: { selectText: 'выбрать', navigateText: 'перейти', closeText: 'закрыть' } },
    } } } } },
    footer: { message: 'MIT License', copyright: 'Orpheus' },
  },
})
