import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Upload,
  Typography,
} from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import "./styleQuestion.css";
import Loading from "../../shared/Loading/Loading";
import { UploadOutlined, PlusOutlined, SaveOutlined, MinusCircleOutlined } from "@ant-design/icons";
// import AudioTemplate from "../../shared/Audio/Audio";
import HeaderPage from "../category/HeaderPage";
import { getAllData } from "../../../api/service/api";
import { dataTestQuestion } from "./dataTestQuestion";
import './style.css'

let arrQues = {
  textQuestion: "",
  answerA: "",
  answerB: "",
  answerC: "",
  answerD: "",
  correctAnswer: ""
}

const DetailQuestion = (props) => {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  let { id, objectTypeId } = useParams();
  const [form] = Form.useForm();
  const { Text } = Typography;

  const getDataQuestion = () => {
    setLoading(true);
    getAllData(`questions?objectTypeId=${objectTypeId}`).then((res) => {
      // eslint-disable-next-line no-unused-vars
      const arrQuestionById = res.data.data.filter((f) => f.id === id);
      setDataQuestion(dataTestQuestion);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (id) {
      getDataQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBack = useMemo(() => {
    return <HeaderPage onBack={true} />;
  }, []);

  const btnEdit = useMemo(
    () => (
      <div style={{ position: "absolute", right: "0", top: "-12px" }}>
        <Button
          style={{ marginRight: "5px" }}
          size="small"
          type={isUpdate ? "default" : "primary"}
          onClick={() => setIsUpdate(!isUpdate)}
        >
          {isUpdate ? "Cancel" : "Edit"}
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
    [isUpdate]
  );

  const renderAddQuestions = useCallback(() => {
    const _dataQuestion = [...dataQuestion]
    _dataQuestion.map((item, index) => {
      return item.questions.push(arrQues) 
    })
    setDataQuestion(_dataQuestion)
  },[dataQuestion]);

  const removeQuestionByIndex = (index) => {
    const updatedQuestions = [...dataQuestion[0].questions];
    updatedQuestions.splice(index, 1); // Remove the question at the specified index
    setDataQuestion([ {...dataQuestion, questions: updatedQuestions} ]);
  };

  const btnAddQuestion = useMemo(() => (
      <div style={{ position: "absolute", right: "0", top: "-12px" }}>
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          style={{ marginRight: "5px" }}
          size="small"
          onClick={() => renderAddQuestions()}
        > Add question </Button>
      </div>
    ),[renderAddQuestions]);

    const BtnRemove = (index) => {
      return <div style={{ position: "absolute", right: "0", top: "-12px" }}>
         <MinusCircleOutlined onClick={() => removeQuestionByIndex(index.index)} />
      </div>
    }
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

        <Row gutter={24}>
           {dataQuestion.length && dataQuestion[0].questions.length && dataQuestion[0].questions.map((itemQuestion, i) => {
                  return (
                    <Col span={8}>
                    <React.Fragment>
                        <Card className="cardGroup">
                          <div className="wrapperText">{`Question ${i + 1}`}</div>
                          {i + 1 === 1 && btnAddQuestion}
                          { i + 1 !== 1 && <BtnRemove index={i} />}
                          <Form.Item
                            key={i}
                            label={`Question`}
                            name={"questions"}
                          >
                            <Text strong>{itemQuestion.textQuestion}</Text>
                          </Form.Item>
                          <Row gutter={24}>
                            <Col span={12}>
                              <Form.Item label="Answer A" name="answerA">
                                    {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.answerA === "" ? '-' : itemQuestion?.answerA}</Text>}
                              </Form.Item>
                              <Form.Item label="Answer B" name="answerB">
                                    {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.answerB === "" ? '-' : itemQuestion?.answerB}</Text>}
                              </Form.Item>
                              <Form.Item label="Correct Answer" name="correctAnswer">
                                    {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.correctAnswer === "" ? '-' : itemQuestion?.correctAnswer}</Text>}
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item label="Answer C" name="answerC">
                                      {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.answerC === "" ? '-' : itemQuestion?.answerC}</Text>}
                                </Form.Item>
                                <Form.Item label="Answer D" name="answerD">
                                      {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.answerD === "" ? '-' : itemQuestion?.answerD}</Text>}
                                </Form.Item>
                            </Col>
                          </Row>
                        </Card>
                    </React.Fragment>
                    </Col>
                  );
                })}
        </Row>
      </Form>
    );
  }, [form, btnEdit, dataQuestion, btnAddQuestion, isUpdate]);

  return (
    <div>
      {handleBack}
      {loading ? <Loading /> : renderForm}
    </div>
  );
};

DetailQuestion.propTypes = {};

export default DetailQuestion;
