import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {updateNewEntry} from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from 'react';
import {successNotification, errorNotification} from "./Notification";

const {Option} = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function UpdateEntryDrawerForm({showDrawer, setShowDrawer, fetchEntries}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = entry => {
        setSubmitting(true)
        console.log(JSON.stringify(entry, null, 2))
        updateNewEntry(entry)
            .then(() => {
                console.log("entry added")
                onCLose();
                successNotification(
                    "entry successfully updated",
                    `${entry.content} was updated to the system`
                    )
                fetchEntries();
            }).catch(err => {
                console.log(err);
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [statusCode: ${res.status}] [${res.error}]`,
                        "bottomLeft"
                    )
                });
            }).finally(() => {
                setSubmitting(false);
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new entry"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{required: true, message: 'Please enter entry content'}]}
                    >
                        <Input placeholder="Please enter enter content"/>
                    </Form.Item>
                </Col>

            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="remark"
                        label="Remark"
                        rules={[{required: false, message: 'Please enter entry remark'}]}
                    >
                        <Input placeholder="Please enter entry remark"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default UpdateEntryDrawerForm;