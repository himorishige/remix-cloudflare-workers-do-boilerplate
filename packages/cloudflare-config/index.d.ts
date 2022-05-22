interface Env {
  __STATIC_CONTENT: KVNamespace;

  SESSION_KV: KVNamespace;
  COUNTER: DurableObjectNamespace;

  SESSION_SECRET: string;
}
