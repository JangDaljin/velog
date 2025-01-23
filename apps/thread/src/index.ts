import crypto from 'crypto';

function pbkdf2(i: number) {
  const start = performance.now();
  crypto.pbkdf2('qwer', 'asdf', 300000, 512, 'sha512', () => {
    console.log(`${i} : ${Math.round(performance.now() - start)}ms`);
  });
}

function main() {
  for (let i = 0; i < 10; i++) {
    pbkdf2(i);
  }
}
main();
