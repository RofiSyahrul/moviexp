const ONE_HOUR_MINUTES = 60;

export function convertRuntime(runtime: number): string | null {
  if (runtime <= 0) return null;

  const hours = Math.floor(runtime / ONE_HOUR_MINUTES);
  const remainingMinutes = runtime % ONE_HOUR_MINUTES;

  if (hours === 0) return `${remainingMinutes}m`;

  return `${hours}h ${remainingMinutes}m`;
}
