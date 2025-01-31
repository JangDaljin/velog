import robot from 'robotjs';

function main() {
  //10초마다
  robot.setMouseDelay(1000 * 10);

  rollingPointer();
}

function rollingPointer(): void {
  const { width, height } = robot.getScreenSize();

  const centerWidth = width / 2;
  const centerHeight = height / 2;

  const r = Math.min(width, height) / 8;

  //12시부터 시작
  for (let i = 270; ; i += 1, i %= 360) {
    const x = centerWidth + absEps(Math.cos(toRadian(i))) * r;
    const y = centerHeight + absEps(Math.sin(toRadian(i))) * r;
    robot.moveMouse(x, y);
  }
}

function absEps(n: number): number {
  if (Math.abs(n) < Number.EPSILON) {
    return 0;
  }
  return n;
}

function toRadian(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

main();
