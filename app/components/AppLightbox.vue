<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'

const { state, close } = useLightbox()

const isOpen = computed(() => state.value !== null)

const scale = ref(1)
const tx = ref(0)
const ty = ref(0)
const dragging = ref(false)
const dragStart = ref({ x: 0, y: 0, tx: 0, ty: 0 })

function reset() {
  scale.value = 1
  tx.value = 0
  ty.value = 0
}

watch(isOpen, (v) => {
  if (v) {
    reset()
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = ''
  }
})

function onWheel(e: WheelEvent) {
  e.preventDefault()
  const delta = -e.deltaY * 0.002
  const next = Math.min(6, Math.max(0.3, scale.value + delta * scale.value))
  scale.value = next
}

function onMouseDown(e: MouseEvent) {
  dragging.value = true
  dragStart.value = { x: e.clientX, y: e.clientY, tx: tx.value, ty: ty.value }
}

function onMouseMove(e: MouseEvent) {
  if (!dragging.value) return
  tx.value = dragStart.value.tx + (e.clientX - dragStart.value.x)
  ty.value = dragStart.value.ty + (e.clientY - dragStart.value.y)
}

function onMouseUp() {
  dragging.value = false
}

// Touch: single-finger pan, pinch zoom
const touchState = ref<{ mode: 'pan' | 'pinch' | null, startDist: number, startScale: number, startX: number, startY: number, startTx: number, startTy: number }>({
  mode: null, startDist: 0, startScale: 1, startX: 0, startY: 0, startTx: 0, startTy: 0,
})

function touchDistance(t: TouchList) {
  const dx = t[0].clientX - t[1].clientX
  const dy = t[0].clientY - t[1].clientY
  return Math.hypot(dx, dy)
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length === 1) {
    touchState.value = {
      mode: 'pan',
      startDist: 0,
      startScale: scale.value,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTx: tx.value,
      startTy: ty.value,
    }
  }
  else if (e.touches.length === 2) {
    touchState.value = {
      mode: 'pinch',
      startDist: touchDistance(e.touches),
      startScale: scale.value,
      startX: 0, startY: 0, startTx: 0, startTy: 0,
    }
  }
}

function onTouchMove(e: TouchEvent) {
  if (!touchState.value.mode) return
  e.preventDefault()
  if (touchState.value.mode === 'pan' && e.touches.length === 1) {
    tx.value = touchState.value.startTx + (e.touches[0].clientX - touchState.value.startX)
    ty.value = touchState.value.startTy + (e.touches[0].clientY - touchState.value.startY)
  }
  else if (touchState.value.mode === 'pinch' && e.touches.length === 2) {
    const d = touchDistance(e.touches)
    const ratio = d / touchState.value.startDist
    scale.value = Math.min(6, Math.max(0.3, touchState.value.startScale * ratio))
  }
}

function onTouchEnd() {
  touchState.value.mode = null
}

function onKey(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === '+' || e.key === '=') scale.value = Math.min(6, scale.value * 1.2)
  else if (e.key === '-') scale.value = Math.max(0.3, scale.value / 1.2)
  else if (e.key === '0') reset()
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

function zoomIn() { scale.value = Math.min(6, scale.value * 1.25) }
function zoomOut() { scale.value = Math.max(0.3, scale.value / 1.25) }
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
        @click.self="close"
      >
        <!-- Toolbar -->
        <div class="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            title="缩小 (-)"
            @click="zoomOut"
          >
            <Icon name="i-lucide-minus" class="h-4 w-4" />
          </button>
          <button
            class="flex h-9 min-w-[3.5rem] items-center justify-center rounded-full bg-white/10 px-3 text-xs text-white hover:bg-white/20"
            title="重置 (0)"
            @click="reset"
          >
            {{ Math.round(scale * 100) }}%
          </button>
          <button
            class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            title="放大 (+)"
            @click="zoomIn"
          >
            <Icon name="i-lucide-plus" class="h-4 w-4" />
          </button>
          <button
            class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            title="关闭 (Esc)"
            @click="close"
          >
            <Icon name="i-lucide-x" class="h-5 w-5" />
          </button>
        </div>

        <!-- Hint -->
        <div class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
          拖拽移动 · 滚轮/双指缩放 · Esc 关闭
        </div>

        <!-- Content -->
        <div
          class="h-full w-full overflow-hidden"
          :style="{ cursor: dragging ? 'grabbing' : 'grab' }"
          @wheel="onWheel"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
          @touchstart="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div
            class="flex h-full w-full items-center justify-center select-none"
            :style="{
              transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
              transition: dragging || touchState.mode ? 'none' : 'transform 0.15s',
            }"
          >
            <div
              v-if="state?.svg"
              class="rounded-lg bg-white p-6 shadow-2xl dark:bg-gray-900 [&_svg]:h-auto [&_svg]:max-h-none [&_svg]:w-auto [&_svg]:max-w-none"
              v-html="state.svg"
            />
            <img
              v-else-if="state?.src"
              :src="state.src"
              :alt="state.alt"
              class="max-h-none max-w-none rounded-lg shadow-2xl"
              draggable="false"
            >
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
