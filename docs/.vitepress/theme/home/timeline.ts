import { onBeforeUnmount, ref, shallowRef, type Ref } from 'vue'

// Time of the score. Everything on the screen derives from it, so the score can be
// played, paused and moved to any moment in either direction.
export function useTimeline(length: Ref<number>, hold: number, onEnd: () => void) {
  const time = shallowRef(0)
  /** The visitor wants the score to play. */
  const playing = ref(true)
  let allowed = false
  let frameId = 0
  let last = 0

  function frame(now: number) {
    frameId = 0
    if (!allowed || !playing.value) return
    frameId = requestAnimationFrame(frame)
    const next = time.value + Math.min(0.1, (now - last) / 1000)
    last = now
    if (next >= length.value + hold) onEnd()
    else time.value = next
  }

  function run() {
    if (!allowed || !playing.value || frameId) return
    last = performance.now()
    frameId = requestAnimationFrame(frame)
  }

  onBeforeUnmount(() => {
    if (frameId) cancelAnimationFrame(frameId)
  })

  return {
    time,
    playing,
    /** Motion is allowed while the score is on screen and the visitor accepts motion. */
    allow(on: boolean) {
      allowed = on
      run()
    },
    play(on: boolean) {
      playing.value = on
      run()
    },
    seek(value: number) {
      time.value = Math.max(0, Math.min(length.value, value))
    },
  }
}
