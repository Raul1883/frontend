declare module "json-source-map" {
  export interface Position {
    line: number;
    column: number;
    pos: number;
  }

  export interface Pointer {
    key?: Position;
    keyEnd?: Position;
    value?: Position;
    valueEnd?: Position;
  }

  export interface ParseResult<T = any> {
    data: T;
    pointers: Record<string, Pointer>;
  }

  export function parse<T = any>(text: string): ParseResult<T>;
}
