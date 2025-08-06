import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

export default defineConfig({
	plugins: [preact()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
    dedupe: ["preact", "preact/hooks"],
	},
  build: {
    lib: {
      // 指定你的入口文件
      entry: path.resolve(__dirname, 'src/index.tsx'),
      // 打包成 ESM 模块
      formats: ['es'],
      fileName: 'seel-insurance.js',
    },
    rollupOptions: {
      // 指定哪些依赖要外部引入，而不是打包进 lib 中
      external: ['preact'],
    },
    target: 'es2015',
  },
});
