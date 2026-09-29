import { onBeforeUnmount, onMounted, type Ref } from 'vue'

// Motion runs only while the element is on screen, the tab is visible and the visitor
// has not asked to reduce motion. A change of that preference applies without a reload.
export function useMotion(target: Ref<HTMLElement | null>, play: (on: boolean) => void) {
  let observer: IntersectionObserver | undefined
  let preference: MediaQueryList | undefined
  let inView = false

  const sync = () => play(inView && !document.hidden && !preference?.matches)

  onMounted(() => {
    if (!target.value) return
    preference = matchMedia('(prefers-reduced-motion: reduce)')
    observer = new IntersectionObserver(entries => {
      inView = entries[entries.length - 1].isIntersecting
      sync()
    })
    observer.observe(target.value)
    document.addEventListener('visibilitychange', sync)
    preference.addEventListener('change', sync)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    document.removeEventListener('visibilitychange', sync)
    preference?.removeEventListener('change', sync)
    play(false)
  })
}

export function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
}
