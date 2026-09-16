export type JsonObject = Record<
  string,
  string | number | null | boolean | JsonObject[] | { [key: string]: JsonObject }
>
