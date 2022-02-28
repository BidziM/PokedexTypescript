const decimeterToMeter = (value: number) =>
  parseFloat(String(value / 10)).toFixed(2);

const hectogramsToKilograms = (value: number) =>
  parseFloat(String(value / 10)).toFixed(2);

export default {
  decimeterToMeter,
  hectogramsToKilograms,
};
