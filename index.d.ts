export declare class FormArray<T> {
    private _list;
    private _createKey;
    constructor(list?: T[]);
    private convert;
    readonly list: {
        key: number;
        value: T;
    }[];
    readonly length: number;
    render(fn: (value: T, key: number) => any): any[];
    map(fn: (value: T) => any): this;
    add(...newItems: T[]): this;
    delete(...keys: number[]): this;
}
export declare const createFormArray: <T>(list: T[], minLen?: number) => FormArray<any>;
//# sourceMappingURL=index.d.ts.map