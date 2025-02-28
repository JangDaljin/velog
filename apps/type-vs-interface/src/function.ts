/* eslint-disable */

interface IFunction {
  (a: number, b: number): string;
}

type TFunction = (a: number, b: number) => string;

const fa: IFunction = (a, b) => `${a} + ${b}`;
const fb: TFunction = (a, b) => `${a} + ${b}`;

const fc = fa;
const fd = fb;

console.log(fa(1, 2));
console.log(fb(3, 4));
console.log(fc(5, 6));
console.log(fd(7, 8));
