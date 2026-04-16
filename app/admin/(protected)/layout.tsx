import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/adminAuth';
import AdminTopBar from '@/components/admin/AdminTopBar';

export const dynamic = 'force-dynamic';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminSession(token)) {
    redirect('/admin/login');
  }

  return (
    <>
      <AdminTopBar />
      <main className="pb-16">{children}</main>
    </>
  );
}
