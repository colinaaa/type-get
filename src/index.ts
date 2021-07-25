export type Pattern<
  Obj extends string,
  Prop extends string,
  Splitor extends string = "."
> = `${Obj}${Splitor}${Prop}`;

export type Split<T extends string> = T extends Pattern<infer O, infer P>
  ? [O, ...Split<P>]
  : [T];

// traverse the Node with tuple path ["body", "body", 1]
// Path should be created with Split
export type Trav<
  Node extends {},
  Path extends readonly unknown[],
  Default
> = Path extends readonly [infer K, ...infer R]
  ? K extends keyof Node
    ? R extends []
      ? Node[K]
      : Trav<Node[K], R, Default>
    : Default
  : Default;

function get<O extends {}, K extends keyof O, T>(
  obj: O,
  key: K,
  defaultValue?: T
): O[K];

function get<O extends {}, K extends string, T>(
  obj: O,
  key: K,
  defaultValue?: T
): Trav<O, Split<K>, T>;

function get<O extends {}, K extends readonly string[], T>(
  obj: O,
  key: K,
  defaultValue?: T
): Trav<O, K, T>;

function get(obj: object, key: string | string[], defaultValue?: unknown) {
  if (!Array.isArray(key)) {
    key = key.split(".");
  }

  for (let i = 0, len = key.length; i < len; i++) {
    if (obj === undefined) {
      return defaultValue;
    }

    obj = obj === null ? undefined : obj[key[i]];
  }

  return obj === undefined ? defaultValue : obj;
}

export { get };
