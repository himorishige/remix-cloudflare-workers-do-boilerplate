import type { LoaderFunction, MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} from '@remix-run/react';
import type { PropsWithChildren } from 'react';
import styles from './styles/app.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

type LoaderData = {
  loaderCalls: number;
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export let loader: LoaderFunction = async ({ context: { env } }) => {
  let counter = env.COUNTER.get(env.COUNTER.idFromName('root'));
  let counterResponse = await counter.fetch('https://.../increment');
  let loaderCalls = Number.parseInt(await counterResponse.text());

  return json<LoaderData>({ loaderCalls });
};

const Document = ({ children }: PropsWithChildren<{}>) => {
  let matches = useMatches();
  let root = matches.find((match) => match.id === 'root');
  let data = root?.data as LoaderData | undefined;

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <h1 className="text-3xl font-bold underline">
            <Link to="/">Remix App</Link>
          </h1>
        </header>
        {children}
        {data && (
          <>
            <hr />
            <footer>root loader invocations: {data.loaderCalls}</footer>
          </>
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  let { status, statusText } = useCatch();

  return (
    <Document>
      <main>
        <h1>{status}</h1>
        {statusText && <p>{statusText}</p>}
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.log(error);

  return (
    <Document>
      <main>
        <h1>Oops, looks like something went wrong 😭</h1>
      </main>
    </Document>
  );
}
