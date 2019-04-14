declare module 'koa-static-cache' {
  import * as Koa from 'koa';
  function staticCache (dir: string, opts?: {
    dir?: string;
    maxAge?: number;
    cacheControl?: string;
    buffer?: boolean;
    gzip?: boolean;
    usePrecompiledGzip?: boolean;
    alias?: Object;
    prefix?: string;
    dynamic?: boolean;
    filter?: () => boolean | string[];
    preload?: boolean;
    files?: Object;
  }, files?: Object): Koa.Middleware;
  namespace staticCache {}
  export = staticCache;
}
