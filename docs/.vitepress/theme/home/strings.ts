// Strings behind the hero and the final call to action. A sheet of fine lines lies flat
// and rises over the relief of the Orpheus ring. Pulses run along the strings the way
// tasks run through the platform. The cursor plucks every string it crosses, and the
// wave travels along that string and fades.
// Strings are drawn from the far one to the near one. Each near string covers what lies
// behind the ridge it forms, so the relief reads as a solid shape.

export interface Relief {
  /** Centre of the ring, px. */
  x: number
  y: number
  /** Half of the ring width, px. */
  size: number
}

export interface Fade {
  /** The strings fade from top to bottom instead of from left to right. */
  vertical?: boolean
  /** Opacity along the axis: pairs of position and opacity, both 0 to 1. */
  stops: [number, number][]
}

export interface StringsOptions {
  /** Where the ring sits for a host of the given size. No ring when it returns null. */
  relief?: (width: number, height: number) => Relief | null
  /** Positions of the strings from the top, px. An even sheet by default. */
  levels?: (width: number, height: number) => number[]
  /** Where the strings stay quiet, so the text over them stays easy to read. */
  fade?: (width: number, height: number) => Fade
  /** Number of pulses per 1000 px of width. */
  traffic?: number
}

export interface Strings {
  play(on: boolean): void
  theme(): void
  layout(): void
  /** Pluck a string at a point. `push` is the speed of the pluck, px a second. */
  pluck(string: number, x: number, push: number): void
  destroy(): void
}

interface Pulse {
  string: number
  x: number
  speed: number
  height: number
  width: number
}

/** Distance between the points of a string, px. */
const STEP = 4
/** Proportions of the mark as shares of half its width: corner radius, opening and its corner radius. */
const OUTER_CORNER = 0.38
const OPENING = 0.412
const OPENING_CORNER = 0.06
/** Wave speed, points a second. */
const WAVE = 210
/** Most pixels a canvas may hold. */
const PIXELS = 3_600_000
/** Pulses alone need fewer frames than a plucked string, ms between frames. */
const CALM = 30

export function createStrings(canvas: HTMLCanvasElement, host: HTMLElement, options: StringsOptions = {}): Strings {
  const context = canvas.getContext('2d')
  let width = 0
  let height = 0
  let ratio = 1
  let levels: number[] = []
  let cols = 0
  let count = 0
  let relief: Relief | null = null
  // Rest position of every point, lifted by the relief, and the height of the relief there.
  let rest = new Float32Array(0)
  let lift = new Float32Array(0)
  let offset = new Float32Array(0)
  let speed = new Float32Array(0)
  let energy = new Float32Array(0)
  let line = new Float32Array(0)
  let pulses: Pulse[] = []
  let colors = { bg: '#f7f6f3', line: '#e0dbd3', ink: '#0e0e10', accent: '#00ad71' }
  let raised = new Uint8Array(0)
  let last = 0
  let drawn = 0
  let frameId = 0
  let playing = false
  let pointerX: number | null = null
  let pointerY: number | null = null
  let seed = 23

  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  function theme() {
    const style = getComputedStyle(host)
    const read = (name: string) => style.getPropertyValue(name).trim()
    colors = { bg: read('--bg'), line: read('--line'), ink: read('--ink'), accent: read('--accent') }
    if (!playing) render()
  }

  // Distance to the edge of a hexagon with a vertex on top and rounded corners.
  // Negative inside. `apothem` is half of the width.
  function hexagon(x: number, y: number, apothem: number, corner: number) {
    const inner = apothem - corner
    let px = Math.abs(y)
    let py = Math.abs(x)
    const side = Math.min(-0.866025404 * px + 0.5 * py, 0)
    px -= 2 * side * -0.866025404
    py -= 2 * side * 0.5
    px -= Math.max(-0.577350269 * inner, Math.min(0.577350269 * inner, px))
    py -= inner
    return Math.hypot(px, py) * Math.sign(py) - corner
  }

  // Height of the ring at a point, 0 to 1. Proportions follow the mark: a round tube
  // between the outer hexagon and the opening.
  function ringHeight(x: number, y: number) {
    if (!relief) return 0
    const px = (x - relief.x) / relief.size
    const py = (y - relief.y) / relief.size
    const outer = hexagon(px, py, 1, OUTER_CORNER)
    if (outer >= 0) return 0
    const opening = hexagon(px, py, OPENING, OPENING_CORNER)
    if (opening <= 0) return 0
    const across = opening / (opening - outer) * 2 - 1
    return Math.sqrt(1 - across * across)
  }

  function spawn(anywhere: boolean) {
    if (!count) return
    const string = Math.floor(random() * count)
    const size = 0.6 + random() * 0.8
    pulses.push({
      string,
      x: anywhere ? random() * width : -120,
      speed: 46 + random() * 70,
      height: 5 + size * 5,
      width: 26 + size * 26,
    })
  }

  function layout() {
    width = host.clientWidth
    height = host.clientHeight
    if (!context || !width || !height) return
    // The canvas keeps within a pixel budget, so wide screens stay smooth.
    ratio = Math.min(2, window.devicePixelRatio || 1, Math.max(1, Math.sqrt(PIXELS / (width * height))))
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const spacing = width < 700 ? 10 : 12
    levels = options.levels?.(width, height) ?? Array.from({ length: Math.ceil(height / spacing) + 1 }, (_, index) => index * spacing)
    cols = Math.ceil(width / STEP) + 1
    count = levels.length
    relief = options.relief?.(width, height) ?? null
    rest = new Float32Array(count * cols)
    lift = new Float32Array(count * cols)
    offset = new Float32Array(count * cols)
    speed = new Float32Array(count * cols)
    energy = new Float32Array(count)
    line = new Float32Array(cols)
    const rise = relief ? relief.size * 0.3 : 0
    raised = new Uint8Array(count)
    for (let string = 0; string < count; string++) {
      const y = levels[string]
      for (let col = 0; col < cols; col++) {
        const level = ringHeight(col * STEP, y)
        lift[string * cols + col] = level
        rest[string * cols + col] = y - level * rise
        if (level > 0) raised[string] = 1
      }
    }
    // Strings stay quiet behind the text. The browser applies the mask, not the canvas.
    const quiet = options.fade?.(width, height)
    const mask = quiet
      ? `linear-gradient(to ${quiet.vertical ? 'bottom' : 'right'}, ${quiet.stops.map(([position, opacity]) => `rgba(0, 0, 0, ${opacity}) ${position * 100}%`).join(', ')})`
      : ''
    canvas.style.setProperty('-webkit-mask-image', mask)
    canvas.style.setProperty('mask-image', mask)
    pulses = []
    const traffic = Math.round((options.traffic ?? 7) * width / 1000)
    for (let index = 0; index < traffic; index++) spawn(true)
    render()
  }

  function pluck(string: number, at: number, push: number) {
    if (string < 0 || string >= count) return
    const base = string * cols
    const centre = at / STEP
    const from = Math.max(1, Math.floor(centre - 18))
    const to = Math.min(cols - 2, Math.ceil(centre + 18))
    for (let col = from; col <= to; col++) {
      const distance = (col - centre) / 6
      speed[base + col] += push * Math.exp(-distance * distance)
    }
    energy[string] = 1
  }

  function step(delta: number) {
    // The scheme is stable while a wave covers less than one point a pass.
    const passes = Math.max(1, Math.ceil(delta * WAVE / 0.7))
    const dt = delta / passes
    const pull = WAVE * WAVE * dt
    const damping = Math.exp(-1.9 * dt)
    for (let string = 0; string < count; string++) {
      if (energy[string] < 0.004) {
        energy[string] = 0
        continue
      }
      const base = string * cols
      let peak = 0
      for (let pass = 0; pass < passes; pass++) {
        for (let col = 1; col < cols - 1; col++) {
          const index = base + col
          speed[index] = (speed[index] + pull * (offset[index - 1] - 2 * offset[index] + offset[index + 1])) * damping
        }
        for (let col = 1; col < cols - 1; col++) {
          const index = base + col
          offset[index] += speed[index] * dt
          const size = Math.abs(offset[index])
          if (size > peak) peak = size
        }
      }
      energy[string] = Math.min(1, peak / 9)
      if (energy[string] < 0.004) {
        offset.fill(0, base, base + cols)
        speed.fill(0, base, base + cols)
      }
    }
    for (const pulse of pulses) pulse.x += pulse.speed * delta
    const alive = pulses.filter(pulse => pulse.x < width + 160)
    const missing = pulses.length - alive.length
    pulses = alive
    for (let index = 0; index < missing; index++) spawn(false)
  }

  // Adds a string to the current path. Points on a straight run are left out.
  function trace(from: number, to: number) {
    context!.moveTo(from * STEP, line[from])
    for (let col = from + 1; col < to; col++) {
      if (line[col] !== line[col - 1] || line[col] !== line[col + 1]) context!.lineTo(col * STEP, line[col])
    }
    context!.lineTo(to * STEP, line[to])
  }

  function stroke(color: string, opacity: number, from: number, to: number, weight = 1) {
    context!.beginPath()
    trace(from, to)
    context!.globalAlpha = opacity
    context!.strokeStyle = color
    context!.lineWidth = weight
    context!.stroke()
  }

  function render() {
    if (!context || !width) return
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.clearRect(0, 0, width, height)
    context.lineJoin = 'round'
    const ringFrom = relief ? Math.max(0, Math.floor((relief.x - relief.size) / STEP) - 1) : 0
    const ringTo = relief ? Math.min(cols - 1, Math.ceil((relief.x + relief.size) / STEP) + 1) : -1
    const moving: Pulse[][] = Array.from({ length: count }, () => [])
    for (const pulse of pulses) moving[pulse.string].push(pulse)
    // Strings at rest go into one path. It is drawn before the next string that needs its own pass.
    let calm = false
    const flush = () => {
      if (!calm) return
      context.globalAlpha = 1
      context.strokeStyle = colors.line
      context.lineWidth = 1
      context.stroke()
      calm = false
    }
    for (let string = 0; string < count; string++) {
      const base = string * cols
      const y = levels[string]
      const plucked = energy[string] > 0
      if (!raised[string] && !plucked && !moving[string].length) {
        if (!calm) context.beginPath()
        calm = true
        context.moveTo(0, y)
        context.lineTo(width, y)
        continue
      }
      flush()
      for (let col = 0; col < cols; col++) line[col] = plucked ? rest[base + col] + offset[base + col] : rest[base + col]
      for (const pulse of moving[string]) {
        const from = Math.max(0, Math.floor((pulse.x - pulse.width * 2.4) / STEP))
        const to = Math.min(cols - 1, Math.ceil((pulse.x + pulse.width * 2.4) / STEP))
        for (let col = from; col <= to; col++) {
          const distance = (col * STEP - pulse.x) / pulse.width
          line[col] -= pulse.height * Math.exp(-distance * distance * 2.2)
        }
      }
      // The ridge of a near string hides the strings behind it.
      if (raised[string]) {
        context.beginPath()
        context.moveTo(ringFrom * STEP, y + 1)
        for (let col = ringFrom; col <= ringTo; col++) context.lineTo(col * STEP, line[col])
        context.lineTo(ringTo * STEP, y + 1)
        context.closePath()
        context.fillStyle = colors.bg
        context.globalAlpha = 1
        context.fill()
      }
      stroke(colors.line, 1, 0, cols - 1)
      if (raised[string]) {
        // Strings get darker with the height of the relief under them.
        let from = -1
        for (let col = ringFrom; col <= ringTo + 1; col++) {
          const on = col <= ringTo && lift[base + col] > 0.02
          if (on && from < 0) from = Math.max(ringFrom, col - 1)
          if (!on && from >= 0) {
            let top = 0
            for (let inner = from; inner < col; inner++) top = Math.max(top, lift[base + inner])
            stroke(colors.ink, 0.22 + 0.5 * top, from, Math.min(ringTo, col))
            from = -1
          }
        }
      }
      if (plucked) stroke(colors.accent, Math.min(1, energy[string] * 1.6), 0, cols - 1)
      for (const pulse of moving[string]) {
        const from = Math.max(0, Math.floor((pulse.x - pulse.width * 1.5) / STEP))
        const to = Math.min(cols - 1, Math.ceil((pulse.x + pulse.width * 1.5) / STEP))
        if (to > from) stroke(colors.accent, 1, from, to, 1.5)
      }
    }
    flush()
  }

  function frame(now: number) {
    frameId = 0
    if (!playing) return
    frameId = requestAnimationFrame(frame)
    // Pulses move slowly and need half of the frames. A plucked string gets every frame.
    if (now - drawn < CALM && !energy.some(value => value > 0)) return
    const delta = Math.min(0.05, (now - last) / 1000)
    last = now
    drawn = now
    step(delta)
    render()
  }

  function play(on: boolean) {
    if (on === playing) return
    playing = on
    if (on) {
      last = performance.now()
      if (!frameId) frameId = requestAnimationFrame(frame)
    } else {
      pointerX = pointerY = null
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (!playing || !count) return
    const bounds = canvas.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    if (pointerX !== null && pointerY !== null && y !== pointerY) {
      const col = Math.max(0, Math.min(cols - 1, Math.round(x / STEP)))
      const push = Math.max(-520, Math.min(520, (y - pointerY) * 26))
      for (let string = 0; string < count; string++) {
        const position = rest[string * cols + col]
        if ((pointerY - position) * (y - position) <= 0) pluck(string, x, push)
      }
    }
    pointerX = x
    pointerY = y
  }

  function onPointerLeave() {
    pointerX = pointerY = null
  }

  host.addEventListener('pointermove', onPointerMove)
  host.addEventListener('pointerleave', onPointerLeave)
  const observer = new ResizeObserver(layout)
  observer.observe(host)
  theme()
  layout()

  return {
    play,
    theme,
    layout,
    pluck,
    destroy() {
      playing = false
      if (frameId) cancelAnimationFrame(frameId)
      observer.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
    },
  }
}
