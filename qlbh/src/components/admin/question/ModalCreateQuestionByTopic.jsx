import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import React, { useCallback } from 'react'
import { useMemo } from "react";
import { useState } from 'react';
import Loading from "../../shared/Loading/Loading";
import { createData } from "../../../api/service/api";
import { useParams } from "react-router-dom";

 export const arrLevel = [
  {value: "easy", label: "easy"},
  {value: "medium", label: "medium"},
  {value: "hard", label: "hard"}
]

// const arrTypeQuestion = [
//   {value: "practice", label: "Practice"},
//   {value: "toeic", label: "Toeic"},
//   {value: "vocabulary", label: "Vocabulary"},
//   {value: "grammar", label: "Grammar"}
// ]


const ModalCreateQuestionByTopic = (props) => {
  const { isOpen, title, reloadData, onClose } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  let { id } = useParams();

  const handleCancel = useCallback(() => {
    onClose();
    form.resetFields();
  },[form, onClose]);


  const handleCreate = useCallback((values) => {
      const formValues = form.getFieldsValue();
      const questionsArray =  formValues.questions !== undefined && formValues.questions.map((question) => {
        const { textQuestion, answerA, answerB, answerC, answerD, correctAnswer } = question;
        return {textQuestion, answerA, answerB, answerC, answerD, correctAnswer};
      });
      
      const imageArr = values?.images && values?.images?.fileList !== undefined && values.images.fileList.map(image => {
        return image.name
      })
  
      const formControl = {
        type: 'practice',
        objectTypeId: id,
        level: values.level,
        audioQuestion: values.audioQuestion.file.name ? values.audioQuestion.file.name : null,
        images: imageArr ? imageArr : null,
        questions: questionsArray,
      };
      setIsLoading(true)
      createData(`questions/create`, formControl).then((res) => {
        if (res.data) {
          message.success("CREATE SUCCESSFULLY");
          setIsLoading(false)
          reloadData()
          handleCancel()
        }
      })
      .catch(() => {
        message.error("Error");
      });

  },[form, handleCancel, id, reloadData])

  const onFinish = useCallback((values) => {
      handleCreate(values);
  },[handleCreate]);


  const renderForm = useMemo(() => {
    return (
      <Form
        id="myForm"
        form={form}
        labelAlign={"left"}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
      >
        <Row>
          <Col span={12}>
            <Card className="cardGroup">
              <div className="wrapperText">Audio Question</div>
              <Row gutter={24}>
                <Col span={10}>
                  <Form.Item
                    name="audioQuestion"
                    label="Audio Question"
                    valuePropName="audioQuestion"
                  >
                    <Upload name="audioQuestion" action="/audioQuestion.do" listType="picture">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={12}>
             <Form.Item
                name="level"
                label="Level of Question"
                valuePropName="level"
              >
                <Select
                  allowClear
                  options={arrLevel}
                ></Select>
              </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card className="cardGroup">
              <div className="wrapperText">Image</div>
              <Row gutter={24}>
                <Col span={12}>
                <Form.Item
                    name="images"
                    label="Image"
                    valuePropName="images"
                  >
                    <Upload name="images" action="/images.do" listType="picture">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row>
          <Form.List name="questions">
              {(fields, { add, remove }) => (
                            <>
                              <Row>
                                <Col span={24}>
                                {<Form.Item className="cardGroup">
                                    <Button type="primary" onClick={() => add()} style={{ marginRight: "5px" }} icon={<PlusOutlined />}>
                                      Add Sub-Question
                                    </Button>
                              </Form.Item>}
                                </Col>
                              </Row>
                              <Row>
                              {fields.map((key, name) => (
                                 <Col span={fields.length === 1 ? 24 : 12}>
                                <Card className="cardGroup">
                                  <div className="wrapperText">{`Question ${key.key + 1}`}</div>
                                  {<MinusCircleOutlined style={{ position: "absolute", right: "0", top: "-5px" }} onClick={() => remove(name)} />}
                                  

                                  <div style={{marginTop: "15px"}}>
                                  <Form.Item
                                  // key={key.key}
                                  label={`Question`}
                                  name={[name, 'textQuestion']}
                                >
                                  <Input />
                                </Form.Item>

                                <Row gutter={24}>
                                  <Col span={12}>
                                    <Form.Item
                                    // key={key.key}
                                    label={`Answer A`}
                                    name={[name, 'answerA']}
                                    >
                                      <Input />
                                  </Form.Item>

                                  <Form.Item
                                    // key={key.key}
                                    label={`Answer B`}
                                    name={[name, 'answerB']}
                                    >
                                      <Input />
                                  </Form.Item>

                                  <Form.Item
                                    // key={key.key}
                                    label={`Correct Answer`}
                                    name={[name, 'correctAnswer']}
                                    >
                                      <Input />
                                  </Form.Item>
                                  </Col>

                                  <Col span={12}>
                                    <Form.Item
                                    // key={key.key}
                                    label={`Answer C`}
                                    name={[name, 'answerC']}
                                    >
                                      <Input />
                                  </Form.Item>

                                  <Form.Item
                                    // key={key.key}
                                    label={`Answer D`}
                                    name={[name, 'answerD']}
                                    >
                                      <Input />
                                  </Form.Item>
                                  </Col>
                                </Row>
                                </div>
                                </Card>
                                </Col>
                              ))}
                              </Row>
                            </>
                          )}
          </Form.List>

        </Row>
      </Form>
    );
  }, [form, onFinish]);

  return (
    <div>
      <Modal
        title={title}
        open={isOpen}
        className="form-create"
        width={1000}
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
          </Button>
        ]}
      >
        {isLoading ? <Loading /> : renderForm}
      </Modal>
    </div>
  )
}

ModalCreateQuestionByTopic.propTypes = {}

export default ModalCreateQuestionByTopic