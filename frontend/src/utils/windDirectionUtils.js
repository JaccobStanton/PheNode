export function convertDegreesToDirection(degrees) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8; // 360 degrees / 8 directions = 45 degrees per direction
  return directions[index];
}
