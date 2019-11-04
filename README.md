# 安装
` npm install rc-form-array --save `

# 使用

` import { createFormArray } from 'rc-form-array'; `

## 创建
  
  `createFormArray<T>(list: T[], minLen = 0)`
  
  示例：`this.state = { students: createFormArray([]) };`

## 新增
  
  `add(...newItems: T[]): FormArray<T>`

  示例：`this.setState({ students: students.add({ name: 'xiaoming', age: 18 }) });`
  
## 删除

  `delete(...keys: number[]): FormArray<T>`

  示例：`this.setState({ students: students.delete(0) });`

## 获取

  `get(key: number): T`

  示例：`students.get(0)`

## 更新

  `set(key: number, item: T): FormArray<T>`

  `set(key: number, fn: (item: T) => T): FormArray<T>`

  示例：`this.setState({ students: students.set(0, { name: 'xiaohong', age: 18 }) });`

  `this.setState({ students: students.set(0, (student) => ({ ...student, name: 'xiaohong' })) });`

## 渲染

  `render(fn: (value: T, key: number, index: number) => any)`

  示例：
  ````
  students.render((item, key, index) => 
    getFieldDecorator(`students[${key}].name`, {
      initialValue: item && item.name
    })(
      <Input/>
    )
  )
  ````

示例详见[demo](./demo/src/main.tsx);
