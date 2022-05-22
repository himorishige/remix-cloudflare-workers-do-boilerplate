import type { LoaderFunction, ActionFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';

import { destroySession, getSession } from '~/session.server';

type LoaderData = {
  username: string;
};

export const action: ActionFunction = async ({ context: { env }, request }) => {
  const session = await getSession(request, env);
  await destroySession(session, env);
  return redirect('/');
};

export const loader: LoaderFunction = async ({
  context: { env },
  params: { boardId },
  request,
}) => {
  boardId = boardId?.trim();
  const session = await getSession(request, env);
  const username = session.get('username') as string | undefined;

  if (!username) {
    return redirect('/');
  }

  return json<LoaderData>({ username });
};

export default function Private() {
  const { username } = useLoaderData() as LoaderData;

  return (
    <main>
      <p>username: {username}</p>
      <Form method="post">
        <button
          type="submit"
          className="flex justify-center items-center py-2 px-4 font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 rounded border-0 focus:outline-none"
        >
          Logout
        </button>
      </Form>
    </main>
  );
}
