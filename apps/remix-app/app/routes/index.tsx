import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

type LoaderData = {
  loaderCalls: number;
};

export let loader: LoaderFunction = async ({ context: { env }, request }) => {
  let counter = env.COUNTER.get(env.COUNTER.idFromName('index'));
  let loaderCalls = await counter
    .fetch('https://.../increment')
    .then((response) => response.text())
    .then((text) => Number.parseInt(text, 10));

  return json<LoaderData>({ loaderCalls });
};

export default function Index() {
  let { loaderCalls } = useLoaderData() as LoaderData;

  return (
    <main>
      <hr />
      <footer>
        <p>index loader invocations: {loaderCalls}</p>
      </footer>
    </main>
  );
}
