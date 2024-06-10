import type { MiddlewareHandler } from 'astro';
// [astro doesn't expose this by default as workaround](https://github.com/withastro/roadmap/discussions/950)
import type { AstroError } from 'astro/errors';

export function isAstroError(value: unknown): value is AstroError {
  return !!value && typeof value === 'object' && 'type' in value && value.type === 'AstroError';
}

export const onRequest: MiddlewareHandler = async (ctx, next) => {
  if (ctx.request.url.indexOf('foo') > 0) {
    try {
      console.log('rewrite to non-existed page');
      await next('/foo');
    }
    catch (error: unknown) {
      // in case of 404/rendering error astro will throw RewriteEncounteredAnError
      if (isAstroError(error) && error.name === 'RewriteEncounteredAnError') {
        // this also should work, we don't want to preserve context, but it doesn't
        console.log('try rewrite to /404');
        await ctx.rewrite('/404');
      }
    }
    return;
  }
  else {
    // rewrite all other to / - doesn't work
    console.log('rewrite to /');
    await next('/');
  }
};