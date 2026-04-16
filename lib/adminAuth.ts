import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE_NAME = 'btc_admin_session';

const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

/** Password from env (exact key per project: `Admin_Pass`). */
export function getAdminPassword(): string | undefined {
  const raw = process.env.Admin_Pass ?? process.env.ADMIN_PASS;
  return raw?.trim() || undefined;
}

export function signAdminSession(): string {
  const secret = getAdminPassword();
  if (!secret) {
    throw new Error('Admin_Pass is not set');
  }
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const nonce = randomBytes(8).toString('hex');
  const payload = JSON.stringify({ exp, nonce });
  const payloadB64 = Buffer.from(payload, 'utf8').toString('base64url');
  const sig = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${sig}`;
}

export function verifyAdminSession(token: string | undefined | null): boolean {
  if (!token || !token.includes('.')) return false;
  const secret = getAdminPassword();
  if (!secret) return false;
  const dot = token.indexOf('.');
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!payloadB64 || !sig) return false;
  const expectedSig = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  try {
    if (sig.length !== expectedSig.length) return false;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return false;
  } catch {
    return false;
  }
  try {
    const parsed = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as {
      exp?: number;
    };
    if (typeof parsed.exp !== 'number' || parsed.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: MAX_AGE_SEC,
  };
}
