/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Bearer pk_live_… key for GET /purchases/:id */
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
