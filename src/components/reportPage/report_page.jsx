import {React, useState} from "react";
import './report_page.css';
import CustomNavbar from '../navbar'
import { Button, Input, Form } from "antd";



const ReportPage = () => {
     //Correct information entered
     const onFinish = (values) => {
        console.log('Success:', values);
        
      };

      // False information entered
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
        <>
            <CustomNavbar></CustomNavbar>
            <div className="report-page">
                
                <div id="report-container">
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 750}}

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
                    </Form>
                    <Button size="large">Günlük</Button>
                    <Button size="large">Haftalık</Button>
                    <Button size="large">Aylık</Button>
                </div>
            </div>
        </>
    )
}





export default ReportPage;