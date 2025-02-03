import robot from 'robotjs';

function main(): void {
  tick();
}

function tick(): void {
  const { width, height } = robot.getScreenSize();
  const { x, y } = robot.getMousePos();

  let nextX = 0;
  let nextY = 0;
  if (x === width) {
    nextX = x - 1;
  } else {
    nextX = x + 1;
  }

  if (y === height) {
    nextY = y - 1;
  } else {
    nextY = y + 1;
  }

  robot.moveMouse(nextX, nextY);
  robot.moveMouse(x, y);

  setTimeout(() => {
    tick();
  }, 1000 * 30);
}

main();
