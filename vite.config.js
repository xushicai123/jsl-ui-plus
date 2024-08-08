import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path'; // 确保导入 resolve 函数

export default defineConfig({
  plugins: [vue(), dts({
    insertTypesEntry: true
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'jsl-ui-plus',
      fileName: (format) => `jsl-ui-plus.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包的依赖
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});