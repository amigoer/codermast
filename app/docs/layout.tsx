import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{
        title: 'CoderMast',
      }}
      githubUrl="https://github.com/amigoer/codermast"
    >
      {children}
    </DocsLayout>
  );
}
