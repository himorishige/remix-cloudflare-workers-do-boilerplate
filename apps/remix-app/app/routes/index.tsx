import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import { getSession } from '~/session.server';

type LoaderData = {
  loaderCalls: number;
  username?: string;
};

export const loader: LoaderFunction = async ({ context: { env }, request }) => {
  const sessionPromise = getSession(request, env);

  const counter = env.COUNTER.get(env.COUNTER.idFromName('index'));
  const loaderCalls = await counter
    .fetch('https://.../increment')
    .then((response) => response.text())
    .then((text) => Number.parseInt(text, 10));

  const session = await sessionPromise;
  const username = (session.get('username') || undefined) as string | undefined;

  return json<LoaderData>({ loaderCalls, username });
};

export default function Index() {
  const { loaderCalls, username } = useLoaderData() as LoaderData;

  return (
    <main>
      <Form method="post" id="username-form" action="/login">
        <div className="flex">
          <input
            name="username"
            type="text"
            placeholder="Choose a Username"
            required
            maxLength={32}
            className="py-1 px-3 w-full text-base leading-8 text-gray-700 bg-white rounded border border-sky-300 focus:border-indigo-500 outline-none focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 ease-in-out"
            defaultValue={username}
          />
          <button
            type="submit"
            className="flex justify-center items-center py-2 px-4 font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 rounded border-0 focus:outline-none"
            data-testid="login-button"
          >
            Login
          </button>
        </div>
      </Form>
      <hr />
      <footer>
        <p>index loader invocations: {loaderCalls}</p>
      </footer>
    </main>
  );
}
