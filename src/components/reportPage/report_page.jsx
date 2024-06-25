import {React, useState} from "react";
import './report_page.css';
import CustomNavbar from '../navbar'
import { Button, Input, Form, Modal } from "antd";



const ReportPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
     //Correct information entered
    const onFinish = (values) => {
    console.log('Success:', values);
    
    };

    // False information entered
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    
      const handleOk = () => {
        setIsModalOpen(false);
    };

    return(
        <>
            <CustomNavbar></CustomNavbar>
            <div className="report-page">
                <h1>REPORTS</h1>
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
                    <Button size="large" onClick={showModal}>Günlük</Button>
                    <Button size="large" onClick={showModal}>Haftalık</Button>
                    <Button size="large" onClick={showModal}>Aylık</Button>
                </div>
            </div>
            <Modal title="Başarılı!" 
                open={isModalOpen} onOk={handleOk} onCancel={handleOk} 
                closable={false} 
                cancelButtonProps={{
                    disabled : true
                }}>
                <p id="modal-text">Raporlarınız gönderildi!</p>
            </Modal>
        </>
    )
}





export default ReportPage;