import type { Session } from '@remix-run/cloudflare';
import { createCloudflareKVSessionStorage } from '@remix-run/cloudflare';

const getSessionStorage = (env: Env) => {
  if (!env.SESSION_SECRET) throw new Error('SESSION_SECRET is not defined');

  return createCloudflareKVSessionStorage({
    cookie: {
      httpOnly: true,
      name: 'remix-on-the-fridge',
      path: '/',
      sameSite: 'lax',
      secrets: [env.SESSION_SECRET],
    },
    kv: env.SESSION_KV,
  });
};

export const commitSession = (session: Session, env: Env) => {
  const sessionStorage = getSessionStorage(env);

  return sessionStorage.commitSession(session);
};

export const destroySession = (session: Session, env: Env) => {
  const sessionStorage = getSessionStorage(env);

  return sessionStorage.destroySession(session);
};

export const getSession = (
  requestOrCookie: Request | string | null,
  env: Env,
) => {
  const cookie =
    typeof requestOrCookie === 'string'
      ? requestOrCookie
      : requestOrCookie?.headers.get('Cookie');

  const sessionStorage = getSessionStorage(env);

  return sessionStorage.getSession(cookie);
};
