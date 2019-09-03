export declare class FormArray<T> {
    _list: Array<{
        key: number;
        value: T;
    }>;
    /** 创建自增key */
    createKey: () => number;
    constructor(list?: T[]);
    private convert;
    readonly list: T[];
    readonly length: number;
    render(fn: (value: T, key: number, index: number) => any): any[];
    map<N>(fn: (value: T) => N): FormArray<N>;
    get(key: number): T | undefined;
    set(key: number, item: T): FormArray<T>;
    set(key: number, fn: (item: T) => T): FormArray<T>;
    add(...newItems: T[]): FormArray<T>;
    delete(...keys: number[]): FormArray<T>;
}
/**
 * 创建表单数组对象
 * @param list 表单数据列表
 * @param minLen 表单项最小个数
 */
export declare const createFormArray: <T>(list: T[], minLen?: number) => FormArray<T>;
//# sourceMappingURL=index.d.ts.map