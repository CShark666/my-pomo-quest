export function timeFormatter(ms: number) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.min(59, Math.ceil((ms % 3600000) / 60000));

    return `${hours}h. ${minutes}m.`;
}
