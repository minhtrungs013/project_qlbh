import React, { useCallback, useEffect, useState } from 'react'
import { getAllVocabularyCategory } from '../../../api/service/VocabularyCategory';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Checkbox, Form, Modal, Radio, Space, Table, Tag, message } from 'antd';
import HeaderPage from './HeaderPage';
import ModalCategory from './ModalCategory';
import { deleteCategoryById } from '../../../api/service/Category';
// import { responsiveArray } from 'antd/es/_util/responsiveObserver';

const Category = props => {

    const [data, setData] = useState([])
    const [isOpen, setIsopen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [form] = Form.useForm();
    
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (id, record, index) => { ++index; return index; },
            // render(text, record, index) {
            //     return {
            //       props: {
            //         style: { display: 'flex', justifyContent: 'center' }
            //       },
            //       children: <div>{++index}</div>
            //     };
            //   },
            showSorterTooltip: false,
            
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text) => 
            <Checkbox checked={text}></Checkbox>
        },        
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle" style={{ cursor: "pointer" }}>
                <Tag color='green' onClick={() => onClickUpdate(record)}>Edit</Tag>
                <Tag color='volcano' onClick={() => onClickDelete(record)}>Delete</Tag>
              </Space>
            ),
          },
    ];
    const onOpenModel = () => {
        setIsopen(true);
      };

      const onClickOpenModal = useCallback((record = {}) => {
        const formControl = {
          id: record.id,
          name: record.name,
          isActive: record.isActive,
        }
        form.setFieldsValue(formControl);
        setIsopen(true);
      },[form]);

      const onClickUpdate = useCallback((value) => {
        setId(value.id)
        onClickOpenModal(value);
      },[onClickOpenModal]);


      const reload = useCallback(() => {
        setIsLoading(true)
        getAllVocabularyCategory('vocabularyCategories').then((res) => {
        setData(res.data.data)
          setIsLoading(false)
        })
      },[])

    const getAllCategory = () => {
        setIsLoading(true)
        getAllVocabularyCategory(`vocabularyCategories`)
            .then((res) => {
                setData(res.data.data);
                setIsLoading(false)
            });
    }

    const onClickDelete = (values) => {
        Modal.confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: 'SURE?',
          okText: 'OK',
          cancelText: 'Cancel',
          onOk: () => handleDelete(values),
          confirmLoading: isLoading,
        });
      };
    
    
      const handleDelete = (value) => {
        deleteCategoryById(`vocabularyCategories?id=${value.id}`).then((res) => {
          message.success("SUCCESS");
          reload()
        })
      }

    useEffect(() => {
        getAllCategory()
    }, []);


  return (
    <div>
        <div className='main__application'>
      <HeaderPage title="CATEGORY" onCreate={() => onOpenModel()} />
      <div className='section-wrapper'>
        <Table columns={columns} dataSource={data} loading={isLoading} />
      </div>
      <ModalCategory
        isOpen={isOpen}
        onClose={() => {setIsopen(false); setId("")}}
        title={id ? "Edit form" : "Add new item"}
        reloadData={() => reload()}
        form={form}
        Id={id}
      />
    </div>
    </div>
  )
}

Category.propTypes = {}

export default Category