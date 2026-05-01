export function timeFormatter(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);

  return `${hours}h. ${minutes}m.`;
}
