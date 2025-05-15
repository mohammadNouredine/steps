export function callFunctionDebounce(callback: () => void, delay: number) {
  const handler = setTimeout(callback, delay);
  return () => clearTimeout(handler);
}
