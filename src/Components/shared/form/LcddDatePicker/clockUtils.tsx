import { width, height, ctrlRadius } from './clockConstants';

export const getCtrlCenter: (
  externalMargin: number,
  angle: number,
  clockCenter?: { x: number; y: number },
) => { cx: number; cy: number } = (externalMargin, angle, clockCenter = { x: width / 2, y: height / 2 }) => ({
  cx: clockCenter.x + (clockCenter.x - externalMargin - ctrlRadius) * Math.sin((angle * Math.PI) / 180),
  cy: clockCenter.y - (clockCenter.y - externalMargin - ctrlRadius) * Math.cos((angle * Math.PI) / 180),
});

export const getAngle: (mouseX: number, mouseY: number) => number = (mouseX, mouseY) => {
  const a = height / 2;
  const b = Math.sqrt((mouseX - width / 2) ** 2 + (mouseY - height / 2) ** 2);
  const c = Math.sqrt((mouseX - width / 2) ** 2 + mouseY ** 2);
  return (
    (2 * Math.PI + Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b)) * +`${mouseX - width / 2 >= 0 ? 1 : -1}`)
        % (2 * Math.PI)
  );
};
