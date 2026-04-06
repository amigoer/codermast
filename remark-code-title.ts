/**
 * Remark plugin: support `title="..."` in code fence meta.
 *
 * Converts:
 *   ```go title="lib/foo.ts"
 * into the `[lib/foo.ts]` syntax that @nuxtjs/mdc recognizes as a filename,
 * so the pre component renders a filename header.
 */
import type { Root, Code } from 'mdast'
import { visit } from 'unist-util-visit'

export default function remarkCodeTitle() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code) => {
      if (!node.meta) return
      const match = node.meta.match(/title=(?:"([^"]+)"|'([^']+)'|(\S+))/)
      if (!match) return
      const filename = match[1] || match[2] || match[3]
      if (!filename) return
      // Remove the title="..." from meta
      node.meta = node.meta.replace(match[0], '').trim()
      // Prepend [filename] so @nuxtjs/mdc parses it as filename
      node.meta = node.meta ? `[${filename}] ${node.meta}` : `[${filename}]`
    })
  }
}
