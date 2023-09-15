import {
  Button,
  Card,
  Col,
  FloatButton,
  Form,
  Input,
  Row,
  Select,
  Spin,
  message,
} from "antd";
import React, {
  useEffect,
  useMemo,
  useState,
  useRef
} from "react";
import { useParams, useLocation } from "react-router-dom";
import "./styleQuestion.css";
import Loading from "../../shared/Loading/Loading";
import { UploadOutlined, PlusOutlined, SaveOutlined, MinusCircleOutlined } from "@ant-design/icons";
import HeaderPage from "../category/HeaderPage";
import { getAllData, updateData } from "../../../api/service/api";
import './style.css'
import { useCallback } from "react";
import { arrLevel } from "./ModalCreateQuestionByTopic";
import { handleUpload } from "../../../utils/utils";
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

const DetailQuestion = (props) => {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSpin, setLoadingSpin] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingSpinImg, setLoadingSpinImg] = useState(false)
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState();
  const location = useLocation();
  const audioPlayerRef = useRef(null);
  const [images, setImages] = useState([])
  const [audio, setAudio] = useState("")
  const currentUri = location.search;
  const parts = currentUri.split("?code=");
  const [code, setCode] = useState(parts[1] === undefined ? "" : parts[1]);
  const URIPath = `http://localhost:3000${location.pathname}`;
  const objectTypeId = useSelector(state => state.practiceReducer.objectTypeId);
  const questionId = useSelector(state => state.practiceReducer.questionId);


  const getDataQuestion = () => {
    setLoading(true);
    getAllData(`questions?objectTypeId=${objectTypeId}`).then((res) => {
      const arrQuestionById = res.data.data.filter((f) => f.id === questionId);
      setDataQuestion(arrQuestionById);
      const formControl = {
        id: arrQuestionById[0].id,
        audioQuestion: arrQuestionById[0].audioQuestion,
        images: arrQuestionById[0].imageUrls,
        level: arrQuestionById[0].level,
        objectTypeId: arrQuestionById[0].objectTypeId,
        type: arrQuestionById[0].type,
        questions: arrQuestionById[0].questions,
      };
      setImageUrl(arrQuestionById[0].imageUrls)
      form.setFieldsValue(formControl)
      setLoading(false);
      setAudio(arrQuestionById[0].audioQuestion)
      setImages(arrQuestionById[0].imageUrls)
    });
  };


  useEffect(() => {
    if (questionId) {
      getDataQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  const handleBack = useMemo(() => {
    return <HeaderPage onBack={true} />;
  }, []);

  const handleUpdate = () => {
    if (dataQuestion) {
      const formValues = form.getFieldsValue();
      const questionsArray = formValues.questions !== undefined && formValues.questions.map((question) => {
        const { textQuestion, answerA, answerB, answerC, answerD, correctAnswer } = question;
        return { textQuestion, answerA, answerB, answerC, answerD, correctAnswer };
      });

      const imageArray = formValues.images !== null && formValues?.images?.fileList?.map((image) => {
        return image.name;
        // return image.name.replace('.png', '.webp');
      });

      const formControl = {
        type: 'practice',
        objectTypeId: objectTypeId,
        level: formValues.level,
        audioQuestion: audio,
        imageUrls: images,
        questions: questionsArray,
      };
      setLoading(true)
      updateData(`questions?id=${questionId}`, formControl).then((res) => {
        if (res.data) {
          message.success("UPDATE SUCCESS");
          setLoading(false)
        }
      })
        .catch(() => {
          message.error("Error");
        });

    }
  }

  const btnEdit = useMemo(
    () => (
      <div style={{ position: "absolute", left: "190%", top: "-75px", zIndex: "99" }}>
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
    <div style={{ position: "absolute", left: "240%", top: "-35px" }}>
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        style={{ marginRight: "5px" }}
        size="small"
      > Upload </Button>
    </div>
  )

  const handleFileChange = async (event, type) => {
    const checkType = event.target?.files[0]?.type.indexOf("image") !== -1
    if (type === "audio" && !checkType) {
      setLoadingSpin(true)
    } else if (type === "image" && checkType) {
      setLoadingSpinImg(true)
    } else {
      messageApi.open({
        type: 'warning',
        content: "Please choose the correct format file",
      });
      return
    }
    const selectedFile = event.target.files
    const image = await handleUpload(selectedFile, code, URIPath)
    if (image === "Invalid Access Token") {
      window.location.href = `https://www.dropbox.com/oauth2/authorize?response_type=code&client_id=lntimln3hpjnwx4&redirect_uri=${encodeURIComponent(URIPath)}&response_type=code`
    } else if (image === "Image already exists") {
      messageApi.open({
        type: 'warning',
        content: image,
      });
      setLoadingSpin(false)
      setLoadingSpinImg(false)
    } else if (type === "image") {
      setImages(image)
      setLoadingSpinImg(false)
    } else if (type === "audio") {
      setAudio(image[0])
      setLoadingSpin(false)
    }
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  const renderForm = useMemo(() => {
    return (
      <>
        {contextHolder}
        <Form
          id="myForm"
          form={form}
          labelAlign={"left"}
          wrapperCol={{ span: 18 }}
        >
          <Row style={{ marginTop: "15px" }}>
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
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                        <input type="file" onChange={(e) => handleFileChange(e, "audio")} />
                        {loadingSpin ?
                          <Spin indicator={antIcon} />
                          :
                          <div style={{ display: "flex", justifyContent: "left", marginBottom: "15px" }}>
                            <audio controls ref={audioPlayerRef}>
                              <source src={audio} type="audio/mpeg"></source>
                            </audio>
                          </div>
                        }
                      </div>
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
                  <Col span={12}>
                    <Form.Item >
                      <input type="file" multiple onChange={(e) => handleFileChange(e, "image")} />
                      {loadingSpinImg ?
                        <Spin indicator={antIcon} />
                        :
                        <>
                          {images?.map((item) =>
                            <img className='Description_item_img' src={item} alt="" />
                          )}
                        </>
                      }
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
                            icon={<PlusOutlined />} />
                        </Form.Item>}
                        {/* {key.key + 1 === 1 && <Form.Item style={{ position: "absolute", right: "30px", top: "-12px" }}>
                                    <Button type="dashed" onClick={() => add()} style={{ marginRight: "5px" }} icon={<PlusOutlined />}>
                                      Add Sub-Question
                                    </Button>
                                  </Form.Item>} */}
                        {<MinusCircleOutlined style={{ position: "absolute", right: "0", top: "-5px" }} onClick={() => remove(name)} />}


                        <div style={{ marginTop: "15px" }}>
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
      </>
    );
  }, [form, btnEdit, imageUrl, uploadButton]);

  return (
    <div>
      {handleBack}
      {loading ? <Loading /> : renderForm}
    </div>
  );
};

DetailQuestion.propTypes = {};

export default DetailQuestion;
