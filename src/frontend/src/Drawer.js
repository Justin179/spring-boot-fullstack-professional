import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Drawer, Form, Button, Col, Row, Input, Select, Spin, Space } from 'antd';
import { PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import {addNewEntry} from "./client";
import {successNotification, errorNotification} from "./Notification";

const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class DrawerForm extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        let data = {
            content: "John Smith",
            remark: "Jus"
        };

        addNewEntry(data)
            .then(() => {
                console.log("entry added")
                successNotification(
                    "entry successfully added",
                    ` was added to the system`
                )
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
        })
    }


    render() {
        return (
            <>
                <Button type="primary" onClick={this.showDrawer} icon={<PlusOutlined />}>
                    New account
                </Button>
                <Drawer
                    title="Create a new account"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={this.onClose}>Cancel</Button>
                            <Button onClick={this.onClose} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }
                >

                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                </Drawer>
            </>
        );
    }
}

export default DrawerForm;