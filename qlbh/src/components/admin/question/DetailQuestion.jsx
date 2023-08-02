import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Space,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByTestId } from "../../../api/service/Question";
import "./styleQuestion.css";
import ButtonBack from "../../shared/ButtonBack";
import Loading from "../../shared/Loading/Loading";
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AudioTemplate from "../../shared/Audio/Audio";
import HeaderPage from "../category/HeaderPage";
import { getAllData } from "../../../api/service/api";

const DetailQuestion = (props) => {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const [form] = Form.useForm();
  const audioSrc = "https://example.com/audio.mp3";
  const styleButton = {
    margin: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  };

  const arrType = [
    { value: "Listen", label: "Listen" },
    { value: "Read", label: "Read" },
    { value: "Speak", label: "Speak" },
    { value: "Write", label: "Write" },
  ];

  const getQuestionById = () => {
    setLoading(true);
    getAllData(`questions?objectTypeId=${id}`).then((res) => {
      // chua co
      setDataQuestion(res.data.data);
      form.setFieldsValue(res.data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (id) {
      // getQuestionById();
    }
  }, [id]);

  const handleBack = useMemo(() => {
    return <HeaderPage onBack={true} />;
  }, []);

  const renderForm = useMemo(() => {
    return (
      <Form
        id="myForm"
        form={form}
        // labelCol={{ span: 15 }}
        labelAlign={"left"}
        // layout="vertical"
        // labelWrap={true}
        wrapperCol={{ span: 18 }}
      >
        <Row>
          <Col span={24}>
            <Card className="cardGroup">
              <div className="wrapperText">Audio Question</div>
              <Row gutter={24}>
                <Col span={10}>
                  <Form.Item
                    name="upload"
                    label="Audio Question"
                    valuePropName="fileList"
                  >
                    <Upload name="audio" action="/upload.do" listType="picture">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                    {/* <AudioTemplate audioSrc={audioSrc} /> */}
                  </Form.Item>
                </Col>
              </Row>

              {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item> */}
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card className="cardGroup">
              <div className="wrapperText">Question</div>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <Row gutter={24}>
                        <Col span={8}>
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              icon={<PlusOutlined />}
                            >
                              Add question
                            </Button>
                          </Form.Item>
                        </Col>
                        <Col span={16}>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{
                                display: "flex",
                                marginBottom: 8,
                              }}
                              align="baseline"
                            >
                              <Row>
                                <Col>
                                  <Form.Item
                                    {...restField}
                                    label={`Question ${key + 1}`}
                                    name={[restField.name, "first"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing question for audio",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Question for audio" />
                                  </Form.Item>
                                </Col>
                                <Col>
                                  <Form.Item label="Answer A">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item label="Answer B">
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col>
                                  <Form.Item label="Answer C">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item label="Answer D">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item label="Correct Answer">
                                    <Input />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </Space>
                          ))}
                        </Col>
                      </Row>
                    )}
                  </Form.List>
                </Col>
              </Row>

            </Card>
          </Col>
        </Row>
      </Form>
    );
  }, [form]);

  return (
    <div>
      {handleBack}
      {loading ? <Loading /> : renderForm}
    </div>
  );
};

DetailQuestion.propTypes = {};

export default DetailQuestion;
