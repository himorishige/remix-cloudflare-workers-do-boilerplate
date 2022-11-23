# Remix Starter Kit

This is Turborepo boilerplate for Remix on Cloudflare workers with DO + Session KV

## What's inside?

- Remix
- Turborepo
- Cloudflare Workers
- Durable Objects
- Wokers KV
- Tailwind CSS
- ESLint
- Prettier
- Playwright

## Setup

```
$ npm install
$ yarn install
```

```
$ cd packages/worker
$ wrangler secret put SESSION_SECRET
$ wrangler kv:namespace create "SESSION_KV"
$ wrangler kv:namespace create --preview "SESSION_KV"
```

- Append kv's id and preview_id to `packages/worker/wrangler.toml`.
### CI/CD

- Append account_id to `packages/worker/wrangler.toml`.
- Append [Cloudflare API Token](https://dash.cloudflare.com/profile/api-tokens) to GitHub Actions Secrets(`CF_API_TOKEN`).

## Development

```
$ yarn build // only first time
$ yarn dev
```

### package install example

#### repo

```
$ yarn workspace remix-app add tiny-invariant
```

#### root

```
$ yarn add -W tiny-invariant
```

## Deploy

```
$ yarn deploy
```

## Turborepo
### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```