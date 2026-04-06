export interface LightboxContent {
  /** Raw SVG markup (for mermaid / inline SVG). */
  svg?: string
  /** Image URL (for <img> / markdown images). */
  src?: string
  /** Optional caption/alt. */
  alt?: string
}

export function useLightbox() {
  const state = useState<LightboxContent | null>('lightbox', () => null)

  function open(content: LightboxContent) {
    state.value = content
  }

  function close() {
    state.value = null
  }

  return { state, open, close }
}
