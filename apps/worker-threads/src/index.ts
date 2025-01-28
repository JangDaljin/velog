import path from 'path';
import WorkerThread from 'worker_threads';

function worker(): Promise<void> {
  return new Promise((resolve, reject) => {
    const worker = new WorkerThread.Worker(path.join(__dirname, 'worker.js'));

    worker.on('message', (message) => {
      console.log(`Worker[${worker.threadId}] : ${message}`);
      resolve(undefined);
    });
    worker.on('error', (error) => {
      reject(error);
    });
    worker.on('exit', (code) => {
      `Worker stopped with exit code ${code}`;
    });
  });
}

function main(): void {
  Promise.all([worker(), worker(), worker()]);
}
main();
