import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  getAdminPassword,
  signAdminSession,
} from '@/lib/adminAuth';

export const runtime = 'nodejs';

function safeCompare(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, 'utf8');
    const bb = Buffer.from(b, 'utf8');
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const configured = getAdminPassword();
  if (!configured) {
    return NextResponse.json(
      { error: 'Admin password is not configured (set Admin_Pass in env).' },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (!safeCompare(password, configured)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = signAdminSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, adminCookieOptions());
  return res;
}
