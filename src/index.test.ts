import { get } from ".";

function expectType<T>(_: T): void {}

interface Obj {
  undef: undefined;
  zero: number;
  one: number;
  n: null;
  f: boolean;
  a: {
    two: number;
    b: {
      three: number;
      c: {
        four: number;
      };
    };
  };
  func: (p: number, q: string | boolean) => number;
}

describe("type-get", () => {
  const obj: Obj = {
    undef: undefined,
    zero: 0,
    one: 1,
    n: null,
    f: false,
    a: {
      two: 2,
      b: {
        three: 3,
        c: {
          four: 4,
        },
      },
    },
    func: (p: number, q: string | boolean) => (q ? p + 1 : p - 1),
  };

  it("should get correct property", () => {
    expect(get(obj, "a.b.c.four")).toBe(4);
    expectType<number>(get(obj, "a.b.c.four"));
    expect(get(obj, ["a", "b"])).toMatchObject({
      c: {
        four: 4,
      },
    });
    expectType<Obj["a"]["b"]>(get(obj, ["a", "b"]));
    expect(get(obj, "undef")).toBeUndefined();
    expectType<undefined>(get(obj, "undef"));
    expect(get(obj, ["undef"])).toBeUndefined();
    expectType<Obj["undef"]>(get(obj, ["undef"]));
    expect(get(obj, "n")).toBeNull();
    expectType<null>(get(obj, "n"));
    expect(get(obj, "n.foo.bar")).toBeUndefined();
  });

  it("should return undefined for bad key", () => {
    expectType<unknown>(get(obj, ["n", "foo", "bar"]));
    expectType<number>(get(obj, ["n", "foo", "bar"], 123));
    expectType<unknown>(get(obj, "n.foo.bar"));
    expectType<number>(get(obj, "n.foo.bar", 123));
    expect(get(obj, ["n", "foo", "bar"])).toBeUndefined();
    expect(get(obj, ["foo", "bar"])).toBeUndefined();
  });

  it("should return defaultValue when it's undefined", () => {
    expectType<string>(get(obj, "foo.bar", "default"));
    expect(get(obj, ["n", "foo", "bar"], "default")).toBe("default");
    expect(get(obj, ["foo", "bar"], "default")).toBe("default");
    expect(get(obj, ["foo", "bar"], "default")).toBe("default");
  });

  it("should not return defaultValue when it's null", () => {
    expectType<null>(get(obj, "n", "default"));
    expect(get(obj, "n", "default")).not.toBe("default");
    expect(get(obj, "n", "default")).toBeNull();
  });
});
