type Nullable<T> = T | null;

export function getText(formData: FormData, key: string): Nullable<string> {
  const val = formData.get(key);
  return typeof val === "string" ? val.trim() || null : null;
}

export function getNumber(formData: FormData, key: string): Nullable<number> {
  const txt = formData.get(key)?.toString().trim();
  if (!txt) return null;
  const num = Number(txt);
  return isNaN(num) ? null : num;
}

export function getDate(formData: FormData, key: string): Nullable<Date> {
  const txt = formData.get(key)?.toString().trim();
  if (!txt) return null;
  const d = new Date(txt);
  return isNaN(d.getTime()) ? null : d;
}

export function getEnum<T>(
  formData: FormData,
  key: string,
  enumObj: Record<string, T>
): Nullable<T> {
  const txt = formData.get(key)?.toString().trim();
  if (!txt) return null;
  const vals = Object.values(enumObj) as T[];
  return (vals as unknown[]).includes(txt) ? (txt as unknown as T) : null;
}
