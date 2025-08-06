/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_PREFIX: string;
  // 可以根据需要添加更多环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
