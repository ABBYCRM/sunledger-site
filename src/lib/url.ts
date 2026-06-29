// Slug + URL helpers.

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isValidUsStateAbbr(s: string): boolean {
  return /^[A-Z]{2}$/.test(s);
}
