import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import './index2.css';
import { Drawer, Button, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import {addNewEntry, updateNewEntry} from "./client";
import {successNotification, errorNotification} from "./Notification";

class DrawerForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input0 = React.createRef();
        this.input1 = React.createRef();
        this.input2 = React.createRef();
    }

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

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let varId = this.input0.current.value;
        console.log(varId);

        let varContent = this.input1.current.value;
        // console.log(varContent);
        let varRemark = this.input2.current.value;
        // console.log(varRemark);

        let data = {
            id: varId,
            content: varContent,
            remark: varRemark
        };

        updateNewEntry(data)
            .then(() => {
                console.log("entry added")
                successNotification(
                    "entry successfully updated",
                    `${data.content} was updated to the system`
                )
                this.props.fetchEntries();
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
            this.setState({
                visible: false,
            });
        })
    }

    render() {

        return (
            <>
                <Button type="primary" onClick={this.showDrawer} icon={<EditOutlined />}>
                    Edit
                </Button>
                <Drawer
                    title="Update this entry"
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

                    <div className="center">
                        <form onSubmit={this.handleSubmit}>

                            <input type="text" type="hidden" ref={this.input0}  defaultValue={this.props.rowData.id} onChange={this.handleChange} />

                            <div className="inputbox">
                                <input type="text" ref={this.input1} required="required" defaultValue={this.props.rowData.content} onChange={this.handleChange} />
                                <span>Content</span>
                            </div>
                            <div className="inputbox">
                                <input type="text" ref={this.input2} defaultValue={this.props.rowData.remark} onChange={this.handleChange} />
                                <span>Remark</span>
                            </div>

                            <div className="inputbox">
                                <input type="submit"  value="Submit"/>
                            </div>
                            <div className="inputbox">
                                <input type="button" onClick={this.onClose} value="Cancel"/>
                            </div>
                        </form>
                    </div>

                </Drawer>
            </>
        );
    }
}

export default DrawerForm;