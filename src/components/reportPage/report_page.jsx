import {React} from "react";
import './report_page.css';
import CustomNavbar from '../navbar'
import { Button, Input, Form, ConfigProvider, message } from "antd";



const ReportPage = () => {
    const [messageApi, contextHolder] = message.useMessage();

     //Correct information entered
    const onFinish = (values) => {
    console.log('Success:', values);
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Raporunuz gönderildi!',
        });
    };

    // False information entered
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    return(
        <ConfigProvider
            theme={{
                components:{

                    Form:{
                        labelColor: '#ffffff'
                    }
                }
            }}>
            {contextHolder}
            <CustomNavbar></CustomNavbar>
            <div className="report-page">
                <h1>RAPOR</h1>
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
                    <Button size="large" onClick={success}>Günlük</Button>
                    <Button size="large" onClick={success}>Haftalık</Button>
                    <Button size="large" onClick={success}>Aylık</Button>
                </div>
            </div>
            
        </ConfigProvider>
    )
}





export default ReportPage;