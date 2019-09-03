# 安装
` npm install rc-form-array --save `

# 使用

` import { createFormArray } from 'rc-form-array'; `

## 创建 `createFormArray<T>(list: T[], minLen = 0)`

  `const fa = createFormArray([]);`

## 新增 `add(...newItems: T[]): FormArray<T>`
  
  `fa.add({ name: 'xiaoming' })`
  
## 删除 `delete(...keys: number[]): FormArray<T>`

  `fa.delete(key)`

## 获取 `get(key: number): T`

  `fa.get(0)`

## 更新 `set(key: number, item: T): FormArray<T>`

  `fa.set(0, { name: 'xiaohong' })`

## 渲染 `render(fn: (value: T, key: number, index: number) => any)`

  ````
  fa.render((item, key, index) => 
    getFieldDecorator(`students[${key}].name`, {
      initialValue: item && item.name
    })(
      <Input/>
    )
  )
  ````

示例详见[demo](./demo/src/main.tsx);
