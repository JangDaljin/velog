import { exec, fork, spawn } from 'child_process';
import path from 'path';

function spawnChildProcess(): void {
  const childProcess = spawn('ls', ['-al']);
  childProcess.stdout.on('data', (data) => {
    console.log(Buffer.from(data, 'ascii').toString('utf-8'));
  });

  childProcess.stderr.on('data', (data) => {
    console.log(`ERROR 발생 ${JSON.stringify(data)}`);
  });

  childProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
spawnChildProcess();

function execChildProcess(): void {
  exec(
    `#! /bin/zsh

    echo "Hello World!"

    BAR=10
    FOO="qwer"
    echo $BAR
    echo $FOO`,
    (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
    },
  );
}
execChildProcess();

function forkChildProcess(): void {
  const worker = fork(path.join(__dirname, 'worker.js'));
  worker.on('message', (message) => {
    console.log(`Worker: ${message}`);
    worker.send('Roger');
    //1초후 종료
    setTimeout(() => {
      worker.kill();
    }, 1000);
  });
  worker.on('exit', (code) =>
    console.log(`child process exited with code ${code}`),
  );
}
forkChildProcess();
