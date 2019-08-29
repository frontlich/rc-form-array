/** 创建自增key */
const getCreateKeyFn = () => { let i = 0; return () => i++ };

/** 确保是数组 */
const ensureArray = <T>(arr: T[]): T[] => arr instanceof Array ? arr : [];

const cloneFormArray = <T>(formArray: FormArray<T>) => {
  const fa = new FormArray<T>();
  fa.createKey = formArray.createKey;
  return fa;
};

export class FormArray<T> {

  _list: Array<{ key: number; value: T; }>;
  createKey = getCreateKeyFn();

  constructor(list: T[] = []) {
    this._list = list.map(this.convert);
  }

  private convert = (item: T) => {
    return { key: this.createKey(), value: item }
  }

  get list() {
    return this._list.map(v => v.value);
  }

  get length() {
    return this._list.length;
  }

  render(fn: (value: T, key: number, index: number) => any) {
    return this._list.map(({ key, value }, index) => fn(value, key, index));
  }

  map<N>(fn: (value: T) => N): FormArray<N> {
    const fa = new FormArray<N>();
    fa.createKey = this.createKey;

    fa._list = this._list.map(({ key, value }) => ({ key, value: fn(value) }));

    return fa;
  }

  add(...newItems: T[]): FormArray<T> {
    const fa = cloneFormArray(this);

    fa._list = [...this._list, ...newItems.map(this.convert)];

    return fa;
  }

  delete(...keys: number[]): FormArray<T> {
    const fa = cloneFormArray(this);

    fa._list = this._list.filter(item => !keys.some(key => key === item.key));

    return fa;
  }
}

export const createFormArray = <T>(list: T[], minLen = 0) => {

  const arr = ensureArray(list);

  const restLen = minLen - arr.length;

  return new FormArray(
    restLen > 0 ?
      [...arr, ...Array.from({ length: restLen }) as T[]] :
      arr
  );
}
