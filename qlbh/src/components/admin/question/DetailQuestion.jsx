import {
  Button,
  Card,
  Col,
  FloatButton,
  Form,
  Input,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import React, {
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
import { getAllData, updateData } from "../../../api/service/api";
import './style.css'
import { useCallback } from "react";
import { arrLevel } from "./ModalCreateQuestionByTopic";

const DetailQuestion = (props) => {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [isUpdate, setIsUpdate] = useState(false);
  let { id, objectTypeId } = useParams();
  const [form] = Form.useForm();

  const getDataQuestion = () => {
    setLoading(true);
    getAllData(`questions?objectTypeId=${objectTypeId}`).then((res) => {
      const arrQuestionById = res.data.data.filter((f) => f.id === id);
      setDataQuestion(arrQuestionById);
      const formControl = {
        id: arrQuestionById[0].id,
        audioQuestion: arrQuestionById[0].audioQuestion,
        images: arrQuestionById[0].images,
        level: arrQuestionById[0].level,
        objectTypeId: arrQuestionById[0].objectTypeId,
        type: arrQuestionById[0].type,
        questions: arrQuestionById[0].questions,
      };
      form.setFieldsValue(formControl)
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

  const handleUpdate = useCallback(() => {
    if(dataQuestion){
      const formValues = form.getFieldsValue();
      const questionsArray =  formValues.questions !== undefined && formValues.questions.map((question) => {
        const { textQuestion, answerA, answerB, answerC, answerD, correctAnswer } = question;
        return {textQuestion, answerA, answerB, answerC, answerD, correctAnswer};
      });

      const imageArray =  formValues.images !== null && formValues?.images?.fileList.map((image) => {
       return image.name
      });
  
      const formControl = {
        type: 'practice',
        objectTypeId: objectTypeId,
        level: formValues.level,
        audioQuestion:  formValues.audioQuestion !== null && formValues.audioQuestion[0]?.name ? formValues.audioQuestion[0]?.name : null,
        images: imageArray ? imageArray : null,
        questions: questionsArray,
      };
      setLoading(true)
      updateData(`questions?id=${id}`, formControl).then((res) => {
        if (res.data) {
          message.success("UPDATE SUCCESS");
          setLoading(false)
        }
      })
      .catch(() => {
        message.error("Error");
      });

    }

  },[dataQuestion, form, id, objectTypeId])

  const btnEdit = useMemo(
    () => (
      <div style={{ position: "absolute", left: "190%", top: "-75px", zIndex: "99" }}>
        {/* <Button
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
            onClick={(values) => handleUpdate(values)}
          >
            Save
          </Button>
        )} */}
        <Button
            type="primary"
            key="submit"
            htmlType="submit"
            form="myForm"
            icon={<SaveOutlined />}
            onClick={(values) => handleUpdate(values)}
          >
            Save
          </Button>
      </div>
    ),
    [handleUpdate]
  );

  // const renderAddQuestions = useCallback(() => {
  //   const _dataQuestion = [...dataQuestion]
  //   _dataQuestion.map((item, index) => {
  //     return item.questions.push(arrQues) 
  //   })
  //   setDataQuestion(_dataQuestion)
  // },[dataQuestion]);

  // const removeQuestionByIndex = (index) => {
  //   const updatedQuestions = [...dataQuestion[0].questions];
  //   updatedQuestions.splice(index, 1); // Remove the question at the specified index
  //   setDataQuestion([ {...dataQuestion, questions: updatedQuestions} ]);
  // };

  // const btnAddQuestion = useMemo(() => (
  //     <div style={{ position: "absolute", right: "0", top: "-12px" }}>
  //       <Button
  //         type="dashed"
  //         icon={<PlusOutlined />}
  //         style={{ marginRight: "5px" }}
  //         size="small"
  //         onClick={() => renderAddQuestions()}
  //       > Add question </Button>
  //     </div>
  //   ),[renderAddQuestions]);

  //   const BtnRemove = (index) => {
  //     return <div style={{ position: "absolute", right: "0", top: "-12px" }}>
  //        <MinusCircleOutlined onClick={() => removeQuestionByIndex(index.index)} />
  //     </div>
  //   }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )


  const renderForm = useMemo(() => {
    return (
      <Form
        id="myForm"
        form={form}
        labelAlign={"left"}
        wrapperCol={{ span: 18 }}
      >
        <Row style={{marginTop: "15px"}}>
          <Col span={12}>
            <Card className="cardGroup">
              <div className="wrapperText">Audio Question</div>
              {btnEdit}
              <Row gutter={24}>
                <Col span={10}>
                  <Form.Item
                    name="audioQuestion"
                    label="Audio Question"
                    valuePropName="audioQuestion"
                    getValueFromEvent={normFile}
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
          <Card className="cardGroup">
              <div className="wrapperText">Config Question</div>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="level"
                    label="Level of Question"
                    value={[form.getFieldValue('level') ? form.getFieldValue('level') : []]}
                  >
                    <Select
                      allowClear
                      options={arrLevel}
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card className="cardGroup">
              <div className="wrapperText">Image</div>
              <Row gutter={24}>
                <Col span={6}>
                <Form.Item
                    name="images"
                    label="Image"
                    valuePropName="images"
                  >
                    {/* <UploadImg lstFile={lstFile} name={"images"}  /> */}
                    <Upload name="images" action="/images.do" listType="picture-card">
                      {uploadButton}
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Form.List name="questions">
              {(fields, { add, remove }) => (
                            <>
                              {fields.map((key, name, index, ...restField) => (
                                 <Col span={12}>
                                <Card className="cardGroup">
                                  <div className="wrapperText">{`Question ${key.key + 1}`}</div>
                                  {key.key + 1 === 1 && <Form.Item>
                                    <FloatButton
                                        shape="circle"
                                        type="primary"
                                        tooltip="Add Sub-Question"
                                        onClick={() => add()}
                                        style={{
                                          right: 94,
                                        }}
                                        icon={<PlusOutlined />}/>
                                  </Form.Item>}
                                  {/* {key.key + 1 === 1 && <Form.Item style={{ position: "absolute", right: "30px", top: "-12px" }}>
                                    <Button type="dashed" onClick={() => add()} style={{ marginRight: "5px" }} icon={<PlusOutlined />}>
                                      Add Sub-Question
                                    </Button>
                                  </Form.Item>} */}
                                  {<MinusCircleOutlined style={{ position: "absolute", right: "0", top: "-5px" }} onClick={() => remove(name)} />}
                                  

                                  <div style={{marginTop: "15px"}}>
                                  <Form.Item
                                  // key={key.key}
                                  label={`Question`}
                                  name={[name, 'textQuestion']}
                                >
                                  <Input />
                                  {/* {isUpdate ? <Input /> : <Text strong>{itemQuestion.textQuestion}</Text>} */}
                                </Form.Item>

                                <Row gutter={24}>
                                  <Col span={12}>
                                    <Form.Item
                                    // key={key.key}
                                    label={`Answer A`}
                                    name={[name, 'answerA']}
                                    >
                                      <Input />
                                    {/* {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.answerA === "" ? '-' : itemQuestion?.answerA}</Text>} */}
                                  </Form.Item>

                                  <Form.Item
                                    // key={key.key}
                                    label={`Answer B`}
                                    name={[name, 'answerB']}
                                    >
                                      <Input />
                                    {/* {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.answerB === "" ? '-' : itemQuestion?.answerB}</Text>} */}
                                  </Form.Item>

                                  <Form.Item
                                    // key={key.key}
                                    label={`Correct Answer`}
                                    name={[name, 'correctAnswer']}
                                    >
                                      <Input />
                                    {/* {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.correctAnswer === "" ? '-' : itemQuestion?.correctAnswer}</Text>} */}
                                  </Form.Item>
                                  </Col>

                                  <Col span={12}>
                                    <Form.Item
                                    // key={key.key}
                                    label={`Answer C`}
                                    name={[name, 'answerC']}
                                    >
                                      <Input />
                                    {/* {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.answerC === "" ? '-' : itemQuestion?.answerC}</Text>} */}
                                  </Form.Item>

                                  <Form.Item
                                    // key={key.key}
                                    label={`Answer D`}
                                    name={[name, 'answerD']}
                                    >
                                      <Input />
                                    {/* {isUpdate ? <Input /> : <Text className="textField" strong>{itemQuestion?.answerD === "" ? '-' : itemQuestion?.answerD}</Text>} */}
                                  </Form.Item>
                                  </Col>
                                </Row>
                                </div>
                                </Card>
                                </Col>
                              ))}
                            </>
                          )}
          </Form.List>

        </Row>
      </Form>
    );
  }, [form, btnEdit, uploadButton]);

  return (
    <div>
      {handleBack}
      {loading ? <Loading /> : renderForm}
    </div>
  );
};

DetailQuestion.propTypes = {};

export default DetailQuestion;
