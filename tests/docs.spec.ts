import { test, expect } from '@playwright/test'

test('root home introduces the platform and opens either language', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  const home = page.locator('.docs-home')
  await expect(home.locator('h1')).toHaveText('AI agents for your company')
  await expect(home.locator('h1')).toHaveCSS('font-weight', '700')
  await expect(home.locator('.home-route')).toHaveCount(3)
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme })
    await expect(page.locator('html')).toHaveClass(colorScheme === 'dark' ? /dark/ : /^(?!.*dark)/)
    await expect(home.getByRole('link', { name: 'Read in English' })).toBeVisible()
    await expect(home.getByRole('link', { name: 'Читать на русском' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
    await page.screenshot({ path: `test-results/root-${testInfo.project.name}-${colorScheme}.png`, fullPage: true })
  }
  await home.getByRole('link', { name: 'Читать на русском' }).click()
  await expect(page).toHaveURL(/\/ru\/$/)
  await expect(page.locator('h1')).toHaveText('Платформа AI-агентов компании')
  await page.goto('/')
  await home.getByRole('link', { name: 'Read in English' }).click()
  await expect(page).toHaveURL(/\/en\/$/)
  await expect(page.locator('h1')).toHaveText('AI agents for your company')
  expect(errors).toEqual([])
})

for (const lang of ['ru', 'en']) {
  test(`${lang}: home, reading and theme`, async ({ page }, testInfo) => {
    const errors: string[] = []
    page.on('pageerror', e => errors.push(e.message))
    await page.goto(`/${lang}/`)
    await expect(page.locator('.VPNavBarTitle a')).toHaveAccessibleName('Orpheus')
    await expect(page.locator('h1')).toHaveText(lang === 'ru' ? 'Платформа AI-агентов компании' : 'AI agents for your company')
    await page.emulateMedia({ colorScheme: 'light' })
    await page.screenshot({ path: `test-results/home-${lang}-${testInfo.project.name}-light.png`, fullPage: true })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
    await page.locator('.home-primary').click()
    await expect(page).toHaveURL(new RegExp(`/${lang}/getting-started/requirements.html$`))
    await expect(page.locator('h1')).toContainText(lang === 'ru' ? 'Подготовка' : 'Prepare')
    await page.emulateMedia({ colorScheme: 'dark' })
    await expect(page.locator('html')).toHaveClass(/dark/)
    await page.screenshot({ path: `test-results/guide-${lang}-${testInfo.project.name}-dark.png`, fullPage: true })
    expect(errors).toEqual([])
  })
  test(`${lang}: local search`, async ({ page }) => {
    await page.goto(`/${lang}/`)
    await page.locator('.VPNavBarSearch button').click()
    const search = page.locator('input[type="search"]')
    await search.fill('after_run')
    await expect(page.locator('.VPLocalSearchBox .results li').first()).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(search).not.toBeVisible()
  })
  test(`${lang}: API navigation and schema`, async ({ page }) => {
    await page.goto(`/${lang}/reference/api/`)
    await page.locator('.vp-doc a[href$="create-session.html"]').click()
    await expect(page.locator('h1')).toHaveText(lang === 'ru' ? 'Создание сессии' : 'Create Session')
    await page.locator('.vp-doc a[href$="schema-createsession.html"]').first().click()
    await expect(page.locator('h1')).toHaveText('CreateSession')
    await page.reload()
    await expect(page.locator('h1')).toHaveText('CreateSession')
  })
  test(`${lang}: nested pages highlight their navigation sections`, async ({ page }, testInfo) => {
    const mobile = testInfo.project.name === 'mobile'
    const guide = lang === 'ru' ? 'Руководство' : 'Guide'
    const routes = [
      ['reference/api/get-account-limits', 'API'],
      ['reference/api/schema-accountlimits', 'API'],
      ['reference/api/conventions', 'API'],
      ['integrations/mattermost/workflow', lang === 'ru' ? 'Интеграции' : 'Integrations'],
      ['integrations/custom/helpdesk', lang === 'ru' ? 'Интеграции' : 'Integrations'],
      ['getting-started/launch', lang === 'ru' ? 'Быстрый старт' : 'Quick start'],
      ['configuration/secrets', guide],
      ['reference/profiles', guide],
      ['operations/backup', guide],
      ['web/limits', guide],
    ]
    for (const [path, section] of routes) {
      await page.goto(`/${lang}/${path}.html`)
      if (mobile) await page.locator('.VPNavBarHamburger').click()
      const nav = page.locator(mobile ? '.VPNavScreenMenuLink.active' : '.VPNavBarMenuLink.active')
      await expect(nav).toHaveCount(1)
      await expect(nav).toHaveText(section)
      if (mobile) {
        await page.locator('.VPNavBarHamburger').click()
        await page.locator('.VPLocalNav .menu').click()
      }
      const link = page.locator(`.VPSidebar a[href="/${lang}/${path}.html"]`)
      await expect(link).toBeVisible()
      const pageLink = page.locator(`a[href="/${lang}/${path}.html"]`)
      const group = page.locator('.VPSidebarItem.level-0').filter({ has: pageLink })
      await expect(group).toHaveClass(/has-active/)
      await expect(group).not.toHaveClass(/collapsed/)
      const color = await page.evaluate(() => {
        const probe = document.createElement('span')
        probe.style.color = 'var(--vp-c-brand-1)'
        document.body.append(probe)
        const color = getComputedStyle(probe).color
        probe.remove()
        return color
      })
      await expect(link.locator('.text')).toHaveCSS('color', color)
      await expect(group.locator(':scope > .item > .text')).toHaveCSS('color', color)
      if (path.startsWith('reference/api/') && !path.endsWith('conventions')) {
        const apiGroup = page.locator('.VPSidebarItem.level-1').filter({ has: pageLink })
        await expect(apiGroup).toHaveClass(/has-active/)
        await expect(apiGroup).not.toHaveClass(/collapsed/)
        await expect(apiGroup.locator(':scope > .item > .link > .text')).toHaveCSS('color', color)
      }
    }
  })
}
for (const compact of [false, true]) {
  test(`locale switch keeps language order and article${compact ? ' in compact navigation' : ''}`, async ({ page }, testInfo) => {
    test.skip(compact && testInfo.project.name === 'mobile', 'Compact navigation is a tablet layout')
    if (compact) await page.setViewportSize({ width: 1024, height: 768 })
    const mobile = testInfo.project.name === 'mobile'
    const menu = page.locator(mobile ? '.VPNavScreenTranslations' : compact ? '.VPNavBarExtra' : '.VPNavBarTranslations')
    async function openLanguages() {
      if (mobile) await page.locator('.VPNavBarHamburger').click()
      await menu.locator('button').first().focus()
      await page.keyboard.press('Enter')
      await expect(menu.locator('.language-options')).toBeVisible()
      await expect(menu.locator('.language-option')).toHaveText(['English', 'Русский'])
    }
    await page.goto('/ru/integrations/custom/helpdesk.html')
    await openLanguages()
    await expect(menu.locator('[aria-current="true"]')).toHaveText('Русский')
    await menu.getByRole('link', { name: 'English', exact: true }).click()
    await expect(page).toHaveURL(/\/en\/integrations\/custom\/helpdesk.html$/)
    await expect(page.locator('h1')).toHaveText('Example: helpdesk tickets')
    await page.mouse.move(0, 0)
    await openLanguages()
    await expect(menu.locator('[aria-current="true"]')).toHaveText('English')
    await menu.getByRole('link', { name: 'Русский', exact: true }).click()
    await expect(page).toHaveURL(/\/ru\/integrations\/custom\/helpdesk.html$/)
  })
}
