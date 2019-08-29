import React, { PureComponent, Fragment } from 'react';
import { render } from 'react-dom';
import {
  ConfigProvider, Form, Row, Col,
  Input, Button, Icon, Card,
  Tooltip, DatePicker, Radio, message
} from 'antd';
import { FormComponentProps } from 'antd/es/form';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';

import { createFormArray } from '../../index';

import 'antd/dist/antd.css';

const GENDER = {
  MALE: 1,
  FEMALE: 2
}

const DEFAULT_BIRTH_YEAR = moment().subtract(6, 'y'); // 默认的出生年份

const formLayout = {
  labelCol: {
    sm: 24, xl: 6
  },
  wrapperCol: {
    sm: 24, xl: 18
  }
}

interface Student {
  name?: string;
  birthday?: string;
  gender?: number;
}

const mockStudents: Student[] = [
  { name: '小明', birthday: '2013-01-01', gender: GENDER.MALE },
  { name: '小红', birthday: '2014-02-02', gender: GENDER.FEMALE },
  { name: '小强', birthday: '2013-10-13', gender: GENDER.MALE }
];

class FormDemo extends PureComponent<FormComponentProps> {

  state = {
    students: createFormArray(mockStudents),
    submitData: {}
  }

  handleSave = () => {

    const { form: { validateFieldsAndScroll } } = this.props;

    validateFieldsAndScroll((err, value) => {
      if (err) { return message.warn('请检查表单中的错误'); }

      const submitData = {
        ...value,
        students: value.students.filter((v: any) => v).map((item: any) => {
          return {
            ...item,
            birthday: item.birthday && item.birthday.format('YYYY-MM-DD')
          }
        })
      }

      console.log(submitData);

      this.setState({ submitData });
    });

  }

  render() {
    const { students, submitData } = this.state;
    const { form: { getFieldDecorator, getFieldsValue } } = this.props;

    return (
      <Row>
        <Col span={12}>
          <Card title='学生列表'>
            <Form>
              {
                students.render((student, key) => {
                  return (
                    <Row key={key} gutter={20}>
                      <Col span={8}>
                        <Form.Item label='姓名' {...formLayout}>
                          {
                            getFieldDecorator(`students[${key}].name`, {
                              initialValue: student.name,
                              rules: [
                                { required: true, whitespace: true, message: '请填写姓名' },
                                { pattern: /^[\u2E80-\u9FFF·\s]+$/, message: '姓名不合法' }
                              ]
                            })(<Input placeholder='请填写姓名' />)
                          }
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label='出生日期' {...formLayout}>
                          {
                            getFieldDecorator(`students[${key}].birthday`, {
                              initialValue: student.birthday ? moment(student.birthday) : undefined
                            })(
                              <DatePicker defaultPickerValue={DEFAULT_BIRTH_YEAR} />
                            )
                          }
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item label='性别' {...formLayout}>
                          {
                            getFieldDecorator(`students[${key}].gender`, {
                              initialValue: student.gender || 1
                            })(
                              <Radio.Group>
                                <Radio value={GENDER.MALE}>男</Radio>
                                <Radio value={GENDER.FEMALE}>女</Radio>
                              </Radio.Group>
                            )
                          }
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        {
                          students.length > 1 &&
                          <Tooltip title='删除'>
                            <Icon type='delete'
                              onClick={() => {
                                this.setState({
                                  students: students.delete(key)
                                });
                              }}
                              style={{ marginTop: 12 }} />
                          </Tooltip>
                        }
                      </Col>
                    </Row>
                  )
                })
              }
            </Form>

            <Button type='link'
              onClick={() => {
                this.setState({
                  students: students.add({})
                })
              }}>添加学生</Button>

            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <Button type='primary' onClick={this.handleSave}>保存</Button>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='表单数据'>
            <pre>
              {JSON.stringify(getFieldsValue(), null, ' ')}
            </pre>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='提交数据' extra='点击保存时提交的数据'>
            <pre>
              {JSON.stringify(submitData, null, ' ')}
            </pre>
          </Card>
        </Col>
      </Row>
    )
  }
}

const DemoComponent = Form.create()(FormDemo);

render(
  <ConfigProvider locale={zh_CN}>
    <DemoComponent />
  </ConfigProvider>,
  document.getElementById('root')
);
