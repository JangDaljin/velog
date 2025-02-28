/* eslint-disable */

interface ITuple {
  0: string;
  1: number;

  [Symbol.iterator](): IterableIterator<string | number>;
}

type TTuple = [string, number];

const a: ITuple = ['a', 1];
const b: TTuple = ['b', 2];

const c = b;
const d = a;

const [n1, s1] = a;
for (const v of a) {
  console.log(v);
}

const [n2, s2] = b;
for (const v of b) {
  console.log(v);
}

void c, d, n1, s1, n2, s2;
