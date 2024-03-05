import { Button, Checkbox, Modal, Select, Space, Table, Tag, } from 'antd';
import React, { useEffect, useState } from 'react';

const columns = [

    {
        title: 'Question',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Level',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Checkbox></Checkbox>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        address: 'New York No. 1 Lake Park',
        tags: ['nice'],
    },
    {
        key: '2',
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool'],
    },
];



export default function ModalTest({ isOpen, onClickShowModal }) {
    const [open, setOpen] = useState(false)
    const [openGenerate, setOpenGenerate] = useState(false)
    const [openCustom, setOpenCustom] = useState(false)

    const cancelModal = () => {
        setOpen(false)
        onClickShowModal()
        setOpenGenerate(false)
        setOpenCustom(false)
    }

    const handleOk = () => {

    }

    const onChangeGenerate = (e) => {
        cancelModal()
    }
    const onCustom = (e) => {
        console.log(e);
    }

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    return (
        <>
            <Modal title="Generate and Custom to test"
                width={800}
                // okButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ disabled: openCustom || openGenerate ? false : true }}
                open={open} onOk={handleOk} onCancel={cancelModal} >
                <div className='modal__test' >
                    <h2>How do you want to create a test for users to practice?</h2>
                    <div className='modal__test_btn' >
                        <Button disabled={openCustom} onClick={() => setOpenGenerate(!openGenerate)} className='modal__test_btn_generate' type='primary'>Generate</Button>
                        <Button disabled={openGenerate} onClick={() => setOpenCustom(!openCustom)} className='modal__test_btn_custom'>Custom</Button>
                    </div>
                    <div className='modal__test_btn' >
                        {openGenerate &&
                            <Select
                                showSearch
                                style={{
                                    width: 300,
                                }}
                                placeholder="Select"
                                onChange={onChangeGenerate}
                                options={[
                                    {
                                        value: '1',
                                        label: 'Not Identified',
                                    },
                                    {
                                        value: '2',
                                        label: 'Closed',
                                    }
                                ]} />}

                        {openCustom &&
                            <div className='Custom'>
                                <div className='Filter'>
                                    <h4 className='Filter__heading'>Filter</h4>
                                    <div className='Filter__option'>
                                        <div className='Filter__option_item'>
                                            <h4 className='Filter__option_item_heading'>Exam</h4>
                                            <Select
                                                showSearch
                                                style={{
                                                    width: 300,
                                                }}
                                                placeholder="Select to Test"
                                                onChange={onCustom}
                                                options={[
                                                    {
                                                        value: 'Test 1',
                                                        label: 'Test 1',
                                                    },
                                                    {
                                                        value: 'Test 2',
                                                        label: 'Test 2',
                                                    },
                                                    {
                                                        value: 'Test 3',
                                                        label: 'Test 4',
                                                    },
                                                    {
                                                        value: 'Test 4',
                                                        label: 'Test 5',
                                                    },
                                                ]} />
                                        </div>
                                        <div className='Filter__option_item'>
                                            <h4 className='Filter__option_item_heading'>Level</h4>
                                            <Select
                                                showSearch
                                                style={{
                                                    width: 300,
                                                }}
                                                placeholder="Level"
                                                onChange={onCustom}
                                                options={[
                                                    {
                                                        value: 'easy',
                                                        label: 'Easy',
                                                    },
                                                    {
                                                        value: 'medium',
                                                        label: 'Medium',
                                                    },
                                                    {
                                                        value: 'high',
                                                        label: 'High',
                                                    }
                                                ]} />
                                        </div>
                                    </div>
                                </div>
                                <div className='Results'>
                                    <h4 className='Results__heading'>Results: </h4>
                                    <Table columns={columns} dataSource={data} />
                                </div>
                            </div>}
                    </div>
                </div>
            </Modal>
        </>
    )
}
