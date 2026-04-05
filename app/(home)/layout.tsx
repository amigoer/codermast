import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      nav={{
        title: 'CoderMast',
      }}
      githubUrl="https://github.com/amigoer/codermast"
    >
      {children}
    </HomeLayout>
  );
}
