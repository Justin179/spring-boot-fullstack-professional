import React, {useState, useEffect} from 'react'
import {deleteEntry, getAllEntries} from "./client";
import {
    Layout,
    Menu,
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Radio, Popconfirm,
    Form, Input, Checkbox, Drawer
} from 'antd';

import {
    LoadingOutlined,
    PlusOutlined,
    EditOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import EntryDrawerForm from "./EntryDrawerForm";
import DrawerForm from "./Drawer"

import './App.css';
import {errorNotification, successNotification} from "./Notification";

const {Header, Content, Footer} = Layout;


const removeEntry = (entryId, callback) => {

    deleteEntry(entryId).then(() => {
        successNotification( "Entry deleted", `Entry with ${entryId} was deleted`);
        callback();
    }).catch(err => {
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "There was an issue",
                `${res.message} [statusCode: ${res.status}] [${res.error}]`
            )
        });
    })
}


function setShowDrawer(entry) {
    // var mountNode = document.getElementById('container');

}

// table component
const columns = fetchEntries => [

    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Remark',
        dataIndex: 'remark',
        key: 'remark',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, entry) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${entry.content}`}
                    onConfirm={() => removeEntry(entry.id, fetchEntries)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                &emsp; &emsp;
                <Button onClick={() => setShowDrawer(entry)}
                         icon={<EditOutlined />} >
                    Edit
                </Button>


                <DrawerForm/>


            </Radio.Group>

    }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {

    const [entries, setEntries] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchEntries = () =>
        getAllEntries()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEntries(data);

            }).catch(err => {
                console.log(err.response);
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [statusCode: ${res.status}] [${res.error}]`
                    )
                });
            }).finally(() => setFetching(false))

    useEffect(() => {
        console.log("component is mounted");
        fetchEntries();
    }, []);

    // middle list -> Table
    const renderEntries = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (entries.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Entry
                </Button>
                <EntryDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchEntries={fetchEntries}
                />
                <Empty/>
            </>
        }
        return <>
            <EntryDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchEntries={fetchEntries}
            />
            <Table
                dataSource={entries}
                columns={columns(fetchEntries)}
                bordered
                title={() =>
                    <>
                        <Tag>Number of entries</Tag>
                        <Badge count={entries.length} className="site-badge-count-4"/>
                        &emsp;
                        <Button onClick={() => setShowDrawer(!showDrawer)}
                            type="primary"  shape="round" icon={<PlusOutlined/>} size="small">
                            Add New Entry
                        </Button>
                        &emsp;
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size="small">
                            Download (待作)
                        </Button>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={entry => entry.id}
            />
        </>
    }


    // layout component
    return <Layout style={{minHeight: '50vh'}}>
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Daily Entries</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    {renderEntries()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Daily Entry ©2021 Created by Justin</Footer>
        </Layout>
    </Layout>
}

export default App;