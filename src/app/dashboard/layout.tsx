import type { Metadata } from 'next';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardAuthWrapper from '@/components/dashboard/DashboardAuthWrapper';

export const metadata: Metadata = {
  title: 'AISANCE Drive | Fleet Intelligence Dashboard',
  description: 'Real-time driver behavior intelligence, comfort analytics, and fleet performance insights.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardAuthWrapper>
      <DashboardSidebar />
      <main style={{
        marginLeft: 260,
        flex: 1,
        minHeight: '100vh',
        background: 'var(--bg-secondary)',
      }}>
        {children}
      </main>
    </DashboardAuthWrapper>
  );
}
