/* eslint-disable */

interface Foo {
  a: string;
  b: number;
  c?: boolean;
}

type Bar = {
  a: string;
  b: number;
  c?: boolean;
};

type JsonValue<T = unknown> =
  | string
  | number
  | boolean
  | null
  | Record<string, T>
  | Array<T>;

function main(arg: JsonValue) {
  if (arg !== null && Array.isArray(arg) && 'a' in arg && 'b' in arg) {
    //가능
    const _ = arg as Foo;
    void _;
  }
  //에러
  // const foo = arg as Foo;
  //가능
  const foo2 = arg as unknown as Foo;
  //가능
  const foo3 = arg as Foo | null;

  //가능
  const bar = arg as Bar;

  void foo2;
  void foo3;
  void bar;
}
main(null);
