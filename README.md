# 安装
` npm install rc-form-array --save `

# 使用

` import { createFormArray } from 'rc-form-array'; `

  ## 新增

  `add(...newItems: T[]): FormArray<T>`
  
  ## 删除

  `delete(...keys: number[]): FormArray<T>`

  ## 获取

  `get(key: number): T`

  ## 更新

  `set(key: number, item: T): FormArray<T>`

  ## 渲染

  `render(fn: (value: T, key: number, index: number) => any)`

示例详见[demo](./demo/src/main.tsx);
