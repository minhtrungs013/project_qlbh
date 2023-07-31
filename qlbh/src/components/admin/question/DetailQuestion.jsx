import { Button, Card, Checkbox, Col, Form, Input, Row, Upload } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByTestId } from "../../../api/service/Question";
import "./styleQuestion.css";
import ButtonBack from "../../shared/ButtonBack";
import Loading from "../../shared/Loading/Loading";
import { UploadOutlined } from "@ant-design/icons";
import AudioTemplate from "../../shared/Audio/Audio";

const DetailQuestion = (props) => {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const [form] = Form.useForm();
  const audioSrc = 'https://example.com/audio.mp3'; 
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

  const getQuestionById = async () => {
    setLoading(true);
    // const result = await getQuestionByTestId(`getQuestionByTestId?id=${id}`);
    const result = await getQuestionByTestId("questions");
    if (result) {
      setDataQuestion(result.data.data);
      form.setFieldsValue(result.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getQuestionById();
    }
  }, [id]);

  const handleBack = useMemo(() => {
    return (
      <div className="groupbtn" style={styleButton}>
        <ButtonBack url="/question" />
      </div>
    );
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
              <div className="wrapperText">Info</div>

              <Row>
                <Col span={8}>
                  <Form.Item hidden={true} name="id">
                    <Input />
                  </Form.Item>

                  <Form.Item label="Text" name="textQuestion">
                    <Input />
                  </Form.Item>
                </Col>

                <Col>
                  <Form.Item name="checkbox-group" label="Option">
                    <Checkbox.Group>
                      <Row>
                        <Col span={12}>
                          <Checkbox
                            value="A"
                            style={{
                              lineHeight: "32px",
                            }}
                          >
                            A
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox
                            value="B"
                            style={{
                              lineHeight: "32px",
                            }}
                            disabled
                          >
                            B
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox
                            value="C"
                            style={{
                              lineHeight: "32px",
                            }}
                          >
                            C
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox
                            value="D"
                            style={{
                              lineHeight: "32px",
                            }}
                          >
                            D
                          </Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {/* --------------- */}
        <Row>
          <Col span={24}>
            <Card className="cardGroup">
              <div className="wrapperText">Question</div>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    label="Text Question"
                    // validateStatus="error"
                    hasFeedback
                    help="Should have something"
                  >
                    <Input.TextArea allowClear showCount />
                  </Form.Item>
                </Col>

                <Col >
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
                
                {/* <Col span={8}>
                  <Form.Item
                    name="upload"
                    label="Image"
                    valuePropName="fileList"
                  >
                    <Upload name="audio" action="/upload.do" listType="picture">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                </Col> */}
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
