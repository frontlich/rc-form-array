export declare class FormArray<T> {
    _list: Array<{
        key: number;
        value: T;
    }>;
    createKey: () => number;
    constructor(list?: T[]);
    private convert;
    readonly list: T[];
    readonly length: number;
    render(fn: (value: T, key: number, index: number) => any): any[];
    map<N>(fn: (value: T) => N): FormArray<N>;
    get(key: number): T | undefined;
    set(key: number, item: T): FormArray<T>;
    add(...newItems: T[]): FormArray<T>;
    delete(...keys: number[]): FormArray<T>;
}
export declare const createFormArray: <T>(list: T[], minLen?: number) => FormArray<T>;
//# sourceMappingURL=index.d.ts.map