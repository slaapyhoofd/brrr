export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const _arr = [...arr];
  const index = _arr.indexOf(value);
  if (index > -1) {
    _arr.splice(index, 1);
  }
  return _arr;
}
