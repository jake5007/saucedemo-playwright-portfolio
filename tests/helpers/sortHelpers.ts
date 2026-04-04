export function sortStringsAscending(items: string[]): string[] {
  return [...items].sort((a, b) => a.localeCompare(b));
}

export function sortStringsDescending(items: string[]): string[] {
  return [...items].sort((a, b) => b.localeCompare(a));
}

export function sortNumbersAscending(items: number[]): number[] {
  return [...items].sort((a, b) => a - b);
}

export function sortNumbersDescending(items: number[]): number[] {
  return [...items].sort((a, b) => b - a);
}
