import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  FloatButton,
  Form,
  Input,
  Modal,
  Row,
  Space
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
// import { createProduct, updateProduct } from "../../../api/service/VocabularyService";


const arrType = [
  { value: "Listen", label: "Listen" },
  { value: "Read", label: "Read" },
  { value: "Speak", label: "Speak" },
  { value: "Write", label: "Write" },
]


const ModalQuestion = (props) => {
  const { isOpen, title, form, reloadData, onClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const IdItem = form.getFieldValue("id");
  const [form1] = Form.useForm();
  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    if (isOpen) {
      setOptions(arrType)
    }
  }, [isOpen])


  const handleUpdate = useCallback(
    (values) => {
      const formControl = {
        name: values.name,
        type: values.type,
        image: values.image,
      };
      setIsLoading(true);
      // updateProduct(`practices/updateWithoutParts?id=${IdItem}`, formControl)
      //   .then((res) => {
      //     if (res.data) {
      //       handleCancel();
      //       message.success("UPDATE SUCCESS");
      //       reloadData();
      //     }
      //   })
      //   .catch(() => {
      //     message.error("Error");
      //   });
      setIsLoading(false);
    },
    [handleCancel, reloadData]
  );

  const handleCreate = (values) => {
    const formControl = {
      name: values.name,
      type: values.type,
      image: values.image,
    };
    setIsLoading(true);
    // createProduct("practices/createWithoutParts", formControl).then((res) => {
    //   if (res.data) {
    //     reloadData();
    //     handleCancel();
    //     message.success("CREATE SUCCESS");
    //   }
    // });
    setIsLoading(false);
  };

  // const onFinish = (values) => {
  //   if (values.id) {
  //     handleUpdate(values);
  //   } else {
  //     handleCreate(values);
  //   }
  // };

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };


  return (
    <div>
      <Modal
        title={title}
        open={isOpen}
        className="form-create"
        width={1200}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            form="myForm"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Lưu
          </Button>,
        ]}
      >
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          style={{
            maxWidth: 1200,
          }}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Form.List name="questionDetails">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Col span={12}>
                      <Card className="cardGroup">
                        {/* {key.key + 1 === 1 && <Form.Item style={{ position: "absolute", right: "30px", top: "-12px" }}>
                                    <Button type="dashed" onClick={() => add()} style={{ marginRight: "5px" }} icon={<PlusOutlined />}>
                                      Add Sub-Question
                                    </Button>
                                  </Form.Item>} */}
                        {<MinusCircleOutlined style={{ position: "absolute", right: "0", top: "-5px" }} onClick={() => remove(name)} />}

                        <div style={{ marginTop: "15px" }}>
                          <Form.Item
                            label={`Question`}
                            name={[name, 'contentQuestion']}
                          >
                            <Input />
                          </Form.Item>

                          <Row gutter={24} style={{ marginLeft: 0 }}>
                            <Form.List name={[key.name, 'answers']}>
                              {(subFields, subOpt) => (
                                <>
                                  {subFields.map((subField) => (
                                    <Row gutter={24} key={subField.key} style={{ marginLeft: 0 }}>
                                      <Col span={12}>
                                        <Form.Item
                                          label={`Answer A`}
                                          name={[subField.name, 'A']}
                                        >
                                          <Input />
                                        </Form.Item>

                                        <Form.Item
                                          label={`Answer B`}
                                          name={[subField.name, 'B']}
                                        >
                                          <Input />
                                        </Form.Item>

                                      </Col>

                                      <Col span={12}>
                                        <Form.Item

                                          label={`Answer C`}
                                          name={[subField.name, 'C']}
                                        >
                                          <Input />
                                        </Form.Item>

                                        <Form.Item

                                          label={`Answer D`}
                                          name={[subField.name, 'D']}
                                        >
                                          <Input />
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  ))}
                                </>
                              )}
                            </Form.List>
                            <Form.Item
                              label={`Correct Answer`}
                              name={[name, 'correctAnswer']}
                            >
                              <Input />
                            </Form.Item>
                          </Row>
                        </div>
                      </Card>
                    </Col>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

ModalQuestion.propTypes = {};

export default ModalQuestion;
