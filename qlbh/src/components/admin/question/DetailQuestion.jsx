import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Space,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./styleQuestion.css";
import Loading from "../../shared/Loading/Loading";
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
// import AudioTemplate from "../../shared/Audio/Audio";
import HeaderPage from "../category/HeaderPage";
import { getAllData } from "../../../api/service/api";

const DetailQuestion = (props) => {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  let { id, objectTypeId } = useParams();
  const [form] = Form.useForm();
  const { Text } = Typography;

  const getDataQuestion = () => {
    setLoading(true)
    getAllData(`questions?objectTypeId=${objectTypeId}`).then((res) => {
      const arrQuestionById = res.data.data.filter(f => f.id === id)
        setDataQuestion(arrQuestionById);
        setLoading(false)      
    });
  };

  useEffect(() => {
    if (id) {
      getDataQuestion()
    }
  }, [id]);

  const handleBack = useMemo(() => {
    return <HeaderPage onBack={true} />;
  }, []);


  const btnEdit = useMemo(
    () => (
      <div style={{ position: 'absolute', right: '0', top: '-12px' }}>
        <Button
          style={{ marginRight: '5px' }}
          size="small"
          type={isUpdate ? 'default' : 'primary'}
          onClick={() => setIsUpdate(!isUpdate)}
        >
          {isUpdate ? 'Cancel' : 'Edit'}
        </Button>
        {isUpdate && (
          <Button
            size="small"
            type="primary"
            key="submit"
            htmlType="submit"
            form="myForm"
            icon={<SaveOutlined />}
            // onClick={(values) => handleUpdate(values)}
          >
            Save
          </Button>
        )}
      </div>
    ),
    [isUpdate],
  );

  const addQuestion = useCallback(() => {
    
  },[])

  const btnAddQuestion = useMemo(
    () => (
      <div style={{ position: 'absolute', right: '0', top: '-12px' }}>
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          style={{ marginRight: '5px' }}
          size="small"
          onClick={() => setIsUpdate(!isUpdate)}
        >
          Add question
        </Button>
      </div>
    ),
    [isUpdate],
  );

  const renderForm = useMemo(() => {
    return (
      <Form
        id="myForm"
        form={form}
        labelAlign={"left"}
        wrapperCol={{ span: 18 }}
      >
        <Row>
          <Col span={24}>
            <Card className="cardGroup">
              <div className="wrapperText">Audio Question</div>
              {btnEdit}
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
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card className="cardGroup">
              <div className="wrapperText">Question</div>
                {btnAddQuestion}



              {/* <Row gutter={24}>
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
                          <div style={{display: 'flex'}}>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{
                                display: "flex",
                                margin: 8,
                              }}
                              align="baseline"
                            >
                              <Row>
                                <Col style={{width:"500px"}}>
                                  <Form.Item
                                    {...restField}
                                    label={`Question ${key + 1}`}
                                    name={[restField.name, "textQuestion"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing question for audio",
                                      },
                                    ]}
                                  >
                                    {
                                      isUpdate ? <Input placeholder="Question for audio" /> : 
                                      <Text strong>{dataQuestion[0]?.questions[0]?.textQuestion === [] ? '-' : dataQuestion[0]?.questions[0]?.textQuestion}</Text>
                                    }
                                    
                                  </Form.Item>

                                  <Form.Item label="Answer A" name={[restField.name, "answerA"]}>
                                    {isUpdate ? <Input /> : <Text strong>{dataQuestion[0]?.questions[0]?.answerA === [] ? '-' : dataQuestion[0]?.questions[0]?.answerA}</Text>}
                                  </Form.Item>
                                  <Form.Item label="Answer B" name={[restField.name, "answerB"]}>
                                    {isUpdate ? <Input /> : <Text strong>{dataQuestion[0]?.questions[0]?.answerB === [] ? '-' : dataQuestion[0]?.questions[0]?.answerB}</Text>}
                                  </Form.Item>

                                  <Form.Item label="Answer C" name={[restField.name, "answerC"]}>
                                    {isUpdate ? <Input /> : <Text strong>{dataQuestion[0]?.questions[0]?.answerC === [] ? '-' : dataQuestion[0]?.questions[0]?.answerC}</Text>}
                                  </Form.Item>
                                  <Form.Item label="Answer D" name={[restField.name, "answerD"]}>
                                    {isUpdate ? <Input /> : <Text strong>{dataQuestion[0]?.questions[0]?.answerD === [] ? '-' : dataQuestion[0]?.questions[0]?.answerD}</Text>}
                                  </Form.Item>
                                  <Form.Item label="Correct Answer" name={[restField.name, "correctAnswer"]}>
                                    {isUpdate ? <Input /> : <Text strong>{dataQuestion[0]?.questions[0]?.correctAnswer === [] ? '-' : dataQuestion[0]?.questions[0]?.correctAnswer}</Text>}
                                  </Form.Item>
                                </Col>
                              </Row>
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </Space>
                          ))}
                          </div>
                        </Col>
                      </Row>
                    )}
                  </Form.List>
                </Col>
              </Row> */}

            </Card>
          </Col>
        </Row>
      </Form>
    );
  }, [form, btnEdit, isUpdate, dataQuestion]);

  return (
    <div>
      {handleBack}
      {loading ? <Loading /> : renderForm}
    </div>
  );
};

DetailQuestion.propTypes = {};

export default DetailQuestion;
