import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

type LoaderData = {
  loaderCalls: number;
};

export const loader: LoaderFunction = async ({ context: { env } }) => {
  const counter = env.COUNTER.get(env.COUNTER.idFromName('index'));
  const loaderCalls = await counter
    .fetch('https://.../increment')
    .then((response) => response.text())
    .then((text) => Number.parseInt(text, 10));

  return json<LoaderData>({ loaderCalls });
};

export default function Index() {
  const { loaderCalls } = useLoaderData() as LoaderData;

  return (
    <main>
      <hr />
      <footer>
        <p>index loader invocations: {loaderCalls}</p>
      </footer>
    </main>
  );
}
