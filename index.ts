/** 获取创建自增key的方法 */
const getCreateKeyFn = () => { let i = 0; return () => i++ };

/** 确保是数组 */
const ensureArray = <T>(arr: T[]): T[] => arr instanceof Array ? arr : [];

/** 克隆新的对象是为了在PureComponent中执行render */
const cloneFormArray = <T>(formArray: FormArray<T>) => {
  const fa = new FormArray<T>();
  fa.createKey = formArray.createKey;
  return fa;
};

export class FormArray<T> {

  _list: Array<{ key: number; value: T; }>;

  /** 创建自增key */
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

  get(key: number) {
    const item = this._list.find(v => v.key === key);
    return item && item.value;
  }

  set(key: number, item: T): FormArray<T>;
  set(key: number, fn: (item: T) => T): FormArray<T>;
  set(key: number, param: any): FormArray<T> {
    const fa = cloneFormArray(this);

    fa._list = this._list.map(v => v.key === key ?
      {
        key,
        value: typeof param === 'function' ? param(v) : param
      } :
      v
    );

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

  /** 
   * 根据数组中key的顺序排序
   * @param keys 表单项的key按自定义顺序组成的数组
   */
  sortByKeys(keys: number[]): FormArray<T> {
    const fa = cloneFormArray(this);

    const sortedArr: Array<{ key: number, value: T }> = [];

    for (const key of keys) {
      this._list = this._list.reduce(
        (arr, c) => {
          (c.key === key ? sortedArr : arr).push(c);
          return arr;
        },
        [] as Array<{ key: number, value: T }>
      );
    }

    fa._list = [...sortedArr, ...this._list];

    return fa;
  }
}

/**
 * 创建表单数组对象
 * @param list 表单数据列表
 * @param minLen 表单项最小个数
 */
export const createFormArray = <T>(list: T[], minLen = 0) => {

  const arr = ensureArray(list);

  const restLen = minLen - arr.length;

  return new FormArray(
    restLen > 0 ?
      [...arr, ...Array.from({ length: restLen }) as T[]] :
      arr
  );
}
