import { defineConfig } from 'tsup'

const isProduction = process.argv.join(' ').includes('--env.NODE_ENV production')

export default defineConfig({
  entry: ['src/extension.ts'],
  format: ['cjs'],
  target: 'node18',
  clean: true,
  minify: isProduction,
  external: [
    'vscode',
  ],
})
