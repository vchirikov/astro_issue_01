import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  base: 'base',
  // rewriting to `/` doesn't work with `never`
  trailingSlash: 'never',
  experimental: {
    rewriting: true
  }
});
