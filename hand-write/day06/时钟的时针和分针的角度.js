/**
 * @param {string} time
 * @returns {number}
 */
function angle(time) {
  // your code here
  const [hours, minutes] = time.split(':');
  const unitH = 360 / 12;
  const unitM = 360 / 60;

  const angleM = unitM * minutes;
  const angleH = ((hours % 12) * unitH + (minutes / 60) * unitH) % 360;

  const deltaAngle = Math.abs(angleH - angleM);

  return Math.round(deltaAngle > 180 ? 360 - deltaAngle : deltaAngle);
}
