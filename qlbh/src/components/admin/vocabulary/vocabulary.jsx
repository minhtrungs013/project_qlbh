import React, { useCallback, useEffect, useState } from "react";
// import { getAllVocabularyCategory } from "../../../api/service/VocabularyCategory";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Checkbox, Form, Modal, Radio, Space, Table, Tag, message } from "antd";
import ModalCategory from "./ModalVocabulary";
// import { deleteCategoryById } from "../../../api/service/Category";
import HeaderPage from "../category/HeaderPage";
// import {
//   deleteProductById,
//   getAllVocabulary,
// } from "../../../api/service/VocabularyService";

const Vocabulary = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mean",
      dataIndex: "mean",
      key: "mean",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Pronounce",
      dataIndex: "pronounce",
      key: "pronounce",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "parentName",
      key: "parentName",
      render: (name) => (
        <>
          {name !== null && name?.map((item, index) => {
            return (
              <Tag color={'green'} key={index}>
                {item.name}
              </Tag>
            );
          })}
        </>
      ),
    },

    // {
    //     title: "Category",
    //     dataIndex: "categoryIds",
    //     key: "categoryIds",
    //     render: (name) => (
    //       <>
    //         {name !== null && name?.map((item, index) => {
    //           return (
    //             <Tag color={'green'} key={index}>
    //               {item}
    //             </Tag>
    //           );
    //         })}
    //       </>
    //     ),
    //   },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => <Checkbox checked={text}></Checkbox>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" style={{ cursor: "pointer" }}>
          <Tag color="green" onClick={() => onClickUpdate(record)}>
            Edit
          </Tag>
          <Tag color="volcano" onClick={() => onClickDelete(record)}>
            Delete
          </Tag>
        </Space>
      ),
    },
  ];
  const onOpenModel = () => {
    setIsopen(true);
  };

  const onClickOpenModal = useCallback(
    (record = {}) => {
      const formControl = {
        id: record.id,
        word: record.word,
        mean: record.mean,
        pronounce: record.pronounce,
        categoryIds: record.categoryIds ? record.categoryIds : [],
        isActive: record.isActive,
      };
      form.setFieldsValue(formControl);
      setIsopen(true);
    },
    [form]
  );

  const onClickUpdate = useCallback(
    (value) => {
      setId(value.id);
      onClickOpenModal(value);
    },
    [onClickOpenModal]
  );

  const reload = useCallback(() => {
    setIsLoading(true);
    // getAllVocabulary("vocabularies").then((res) => {
    //   // getAllDataVocabulary()
    //   setData(res.data.data);
    //   setIsLoading(false);
    // });
  }, []);

  // const getAllDataVocabulary = () => {
  //   setIsLoading(true)
  //   getAllVocabulary(`vocabularies`).then((res) => {
  //     if (res) {
  //       getAllVocabularyCategory(`vocabularyCategories`).then((resCate) => {
  //         res.data.data.forEach((e, i, arr) => {
  //           let idCategory = ""
  //           e.categoryIds !== null && e.categoryIds.forEach(item => {return idCategory = item})
  //           arr[i]["parentName"] = e.categoryIds !== null ? 
  //           resCate.data.data.filter((f) => f.id === idCategory) : [];
  //         });
  //         setData(res.data.data);
  //         setIsLoading(false)
  //       });

  //       // getAllVocabularyCategory(`vocabularyCategories`).then((category) => {
  //       //   let newArr = [];
  //       //   let _category = category.data.data
  //       //   res.data.data.forEach((e, i, arr) => {
  //       //       if(e.categoryIds !== null) {
  //       //         for (let i = 0; i < e.categoryIds.length; i++) {
  //       //           const element = e.categoryIds[i];
  //       //           for (let j = 0; j < _category.length; j++) {
  //       //             const item = _category[j];
  //       //             if(element === item.id){
  //       //               newArr.push(item)
  //       //             }
  //       //           }
  //       //         }
  //       //       }
  //       //     arr[i]["parentName"] = e.categoryIds !== null ? newArr : []
  //       //   })
  //       //   setData(res.data.data);
  //       //   setIsLoading(false)
  //       // })          
  //     }
  //   });
  // };

  const onClickDelete = (values) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "SURE?",
      okText: "OK",
      cancelText: "Cancel",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  };

  const handleDelete = (value) => {
    // deleteProductById(`vocabularies?id=${value.id}`).then((res) => {
    //   message.success("SUCCESS");
    //   reload();
    // });
  };

  // useEffect(() => {
  //   getAllDataVocabulary();
  // }, []);

  return (
    <div>
      <div className="main__application">
        <HeaderPage title="VOCABULARY" onCreate={() => onOpenModel()} />
        <div className="section-wrapper">
          <Table columns={columns} dataSource={data} rowKey={"id"} loading={isLoading} />
        </div>
        <ModalCategory
          isOpen={isOpen}
          onClose={() => {
            setIsopen(false);
            setId("");
          }}
          title={id ? "Edit form" : "Add new item"}
          reloadData={() => reload()}
          form={form}
        />
      </div>
    </div>
  );
};

Vocabulary.propTypes = {};

export default Vocabulary;
