export function safeParseInt(value?: string, min = 0, max = 10000) {
  try {
    if (!value) {
      return min;
    }
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < min) {
      return min;
    } else {
      return parsed > max ? max : parsed;
    }
  } catch (e) {
    return min;
  }
}
