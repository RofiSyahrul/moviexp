import type { AstroGlobal } from 'astro';

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type LiteralUnion<LiteralType, BaseType extends Primitive> =
  | LiteralType
  | (BaseType & Record<never, never>);

export type ServerResponse<P extends object> =
  | { props: P }
  | Response;

export type GetServerResponse<P extends object> = (
  astro: AstroGlobal,
) => ServerResponse<P> | Promise<ServerResponse<P>>;

export interface SEOMeta {
  description: string;
  imageURL?: string;
  title: string;
}
