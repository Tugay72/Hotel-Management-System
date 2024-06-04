import React from "react";
import "./login_page.css"
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';

const loginDetails = [{
    email : "someone@example.com",
    password : "123456"
}];



export default function LoginPage () {
    
    const navigate = useNavigate();

    //Correct information entered
    const onFinish = (values) => {
        console.log('Success:', values);
        
        //Login deatils check
        if (values.email === loginDetails[0].email && values.password === loginDetails[0].password){
            console.log("Login Successful!")
            navigate('/homapage');
    
            //Continue from here to login and take us to home page!
        }
        else{
            console.log("Check your information again!");
        }
    
      };

      // False information entered
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className="App">
            <span id="form-container">
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}

                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">

                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        labelAlign="left"
                        rules={[
                            {
                            required: true,
                            type: 'email',
                            message: 'Please input your e-mail!'
                            },
                        ]}
                        >
                    
                    <Input/>
                    </Form.Item>

                    <Form.Item
                    label="Password"
                    labelAlign="left"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}>
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                    
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </span>
        </div>
    );
}