import { ReactNode } from 'react';

interface PlatformLayoutProps {
  children: ReactNode;
}

export default function PlatformLayout({ children }: PlatformLayoutProps) {
  return (
    <div className="min-h-screen bg-void">
      {children}
    </div>
  );
}
