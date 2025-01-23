import cluster, { Worker } from 'cluster';
import crypto from 'crypto';
import os from 'os';

function main(): void {
  if (cluster.isPrimary) {
    runOnPrimary();
  } else {
    runOnWorker();
  }
}

function runOnPrimary(): void {
  console.log(`[${process.pid}] Primary Started`);
  for (let i = 0; i < 1; i++) {
    const worker = fork();
    worker.on('message', (message) => {
      console.log(`${message}(from Worker)`);
    });
  }
}

function runOnWorker(): void {
  console.log(`[${process.pid}] Worker Started`);
  for (let i = 0; i < 80; i++) {
    pbkdf2(i);
  }
}

function fork(): Worker {
  const worker = cluster.fork();

  worker.on('message', (message) => {
    console.log(`[${process.pid}] ${message}`);
  });

  worker.on('exit', () => {
    console.log(`[${process.pid}] Exit`);
    fork();
  });

  return worker;
}

function pbkdf2(i: number) {
  const start = performance.now();
  crypto.pbkdf2('qwer', 'asdf', 300000, 512, 'sha512', () => {
    console.log(
      `[${process.pid}] ${i} : ${Math.round(performance.now() - start)}ms`,
    );
  });
}

main();
