import React, { useState, useLayoutEffect } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { changePassword } from '../../apis/authApi';


const FormChange = (props) => {

    const onFinish = (values) => {
        if (values.password == values.confirmPassword) {
            changePassword(values.password)
                .then(() => notification["success"]({
                    message: "Đổi mật khẩu thành công",
                    placement: "topRight",
                }))
                .catch(() => notification["error"]({
                    message: "Đổi mật khẩu thất bại",
                    placement: "topRight",
                }))
            props.setIsDone(true);
        }
        else {
            notification["error"]({
                message: "Mật khẩu không trùng khớp",
                placement: "topRight",
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item

                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item

                label="confirm Password"
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Confim your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Change Password
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormChange