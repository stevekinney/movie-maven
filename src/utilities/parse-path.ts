export const parsePath = (
  pattern: string,
  url: string,
): Record<string, string | undefined> => {
  const patternParts = pattern.split('/').filter(Boolean);
  const urlParts = url.split('/').filter(Boolean);

  const params: Record<string, string | undefined> = {};

  patternParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const key = part.slice(1);
      const value = urlParts[index];
      params[key] = value;
    }
  });

  return params;
};
