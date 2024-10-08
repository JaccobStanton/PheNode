export function mapSensors(sensors) {
  if (!sensors) {
    return null;
  }
  return sensors.map((sensor) => ({
    _id: sensor._id,
    externalSensorId: sensor.externalSensorId,
    label: sensor.label,
  }));
}
