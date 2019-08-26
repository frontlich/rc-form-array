/** 创建自增key */
const getCreateKeyFn = () => { let i = 0; return () => i++ };

/** 确保是数组 */
const ensureArray = <T>(arr: T[]): T[] => arr instanceof Array ? arr : [];

export class FormArray<T> {

  private _list: Array<{ key: number; value: T; }>;
  private _createKey = getCreateKeyFn();

  constructor(list: T[] = []) {
    this._list = list.map(this.convert);
  }

  private convert = (item: T) => {
    return { key: this._createKey(), value: item }
  }

  get list() {
    return this._list;
  }

  get length() {
    return this._list.length;
  }

  render(fn: (value: T, key: number) => any) {
    return this._list.map(({ key, value }) => fn(value, key));
  }

  map(fn: (value: T) => any) {
    this._list = this._list.map(({ key, value }) => ({ key, value: fn(value) }));
    return this;
  }

  add(...newItems: T[]) {
    this._list = [...this._list, ...newItems.map(this.convert)];
    return this;
  }

  delete(...keys: number[]) {
    this._list = this._list.filter(item => !keys.some(key => key === item.key));
    return this;
  }
}

export const createFormArray = <T>(list: T[], minLen = 1) => {

  const restLen = minLen - list.length;

  return new FormArray(
    restLen > 0 ?
      [...ensureArray(list), ...Array(restLen)] :
      ensureArray(list)
  );
}
