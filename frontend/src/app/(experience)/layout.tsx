import { ReactNode } from 'react';

interface ExperienceLayoutProps {
  children: ReactNode;
}

export default function ExperienceLayout({ children }: ExperienceLayoutProps) {
  return (
    <div className="hide-scrollbar">
      {children}
    </div>
  );
}
