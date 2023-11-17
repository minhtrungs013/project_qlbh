import { Card, Col, FloatButton, Form, Input, Modal, Row, Select, Spin, Upload, message, } from "antd";
import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./styleQuestion.css";
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import HeaderPage from "../category/HeaderPage";
import { getAllData, updateData } from "../../../api/service/api";
import './style.css'
import { arrLevel } from "./ModalCreateQuestionByTopic";
import { handleUpload } from "../../../utils/utils";
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import TabCustomize from "../../shared/Tabs";
import TextArea from "antd/es/input/TextArea";

 export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const DetailQuestion = (props) => {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [loadingSpin, setLoadingSpin] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  // eslint-disable-next-line no-unused-vars
  const [loadingSpinImg, setLoadingSpinImg] = useState(false)
  const [form] = Form.useForm();
  const location = useLocation();
  const audioPlayerRef = useRef(null);
  const [images, setImages] = useState([])
  const [audio, setAudio] = useState("")

  /** Custom Image File */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [tabPosition, setTabPosition] = useState('top');
  
  /** Custom Image File */

  const currentUri = location.search;
  const parts = currentUri.split("?code=");
  // eslint-disable-next-line no-unused-vars
  const [code, setCode] = useState(parts[1] === undefined ? "" : parts[1]); 
  const URIPath = `http://localhost:3000${location.pathname}`;
  const objectTypeId = useSelector(state => state.practiceReducer.objectTypeId);
  const questionId = useSelector(state => state.practiceReducer.questionId);


  // eslint-disable-next-line no-unused-vars
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  const getDataQuestion = () => {
    getAllData(`questions?id=${questionId}`).then((res) => {
      let configFormData = {
          id: res.data.data?.id,
          type: res.data.data?.type,
          objectTypeId: res.data.data?.objectTypeId,
          level: res.data.data?.level,
          imageURLs: res.data.data?.imageURLs,
          audioURL: res.data.data?.audioURL,
          transcript: res.data.data?.transcript,
          questionDetails: res.data.data.questionDetails.map((child, index) => (
            {
              id: child.id,
              questionId: child.questionId,
              contentQuestion: child.contentQuestion,
              answers: [{
                A: child?.answers?.A,
                B: child?.answers?.B,
                C: child?.answers?.C,
                D: child?.answers?.D,
              }],
              correctAnswer: child.correctAnswer,
            }
          ))
          }
      setDataQuestion(configFormData);
      form.setFieldsValue(configFormData)
    });
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setImages(newFileList);



  useEffect(() => {
    if (questionId) {
      getDataQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

 

  const handleUpdate = useCallback(() => {
    if (dataQuestion) {
      const formValues = form.getFieldsValue();
      const questionsArray = formValues.questionDetails !== undefined && formValues.questionDetails.map((question) => {
        const { contentQuestion, correctAnswer, questionId, id } = question;
        let answers = question.answers[0];
        return { contentQuestion, answers, correctAnswer, questionId, id };
      });

      // eslint-disable-next-line no-unused-vars
      const imageArray = formValues.images !== null && formValues?.images?.fileList?.map((image) => {
        return image.name;
        // return image.name.replace('.png', '.webp');
      });

      const formControl = {
        id: questionId,
        type: 'practice',
        objectTypeId: objectTypeId,
        level: formValues.level,
        audioQuestion: audio,
        imageURLs: images,
        transcript: formValues.transcript,
        questionDetails: questionsArray,
      };
      updateData(`questions?id=${questionId}`, formControl).then((res) => {
        if (res.data) {
          message.success("UPDATE SUCCESS");
        }
      })
        .catch(() => {
          message.error("Error");
        });

    }
  },[audio, dataQuestion, form, images, objectTypeId, questionId])


  const handleBack = useMemo(() => {
    return <HeaderPage onBack={true} onSave={true} handleUpdate={handleUpdate} />;
  }, [handleUpdate]);


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


  const uploadButton = useMemo(() => {
    return <>
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
    </>
  },[])
  // const uploadButton = useMemo(() => {
  //   return <>
  //     <div style={{ position: "absolute", left: "240%", top: "-35px" }}>
  //     <Button
  //       type="dashed"
  //       icon={<PlusOutlined />}
  //       style={{ marginRight: "5px" }}
  //       size="small"
  //     > Upload </Button>
  //   </div>
  //   </>
  // },[])

  const handleFileChange = useCallback(async(event, type) => {
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
  },[URIPath, code, messageApi]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const CustomButtonFile = useMemo(() => {
    return <>
       <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={images}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {images.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  },[images, previewImage, previewOpen, previewTitle, uploadButton])

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
                <Row gutter={24}>
                  <Col span={10}>
                    <Form.Item
                      name="audioURL"
                      label="Audio Question"
                      valuePropName="audioURL"
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                        <div className="file-input-container">
                          <input type="file" id="fileInput" onChange={(e) => handleFileChange(e, "audio")} className="file-input" />
                          <label htmlFor="fileInput" className="custom-file-input">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <UploadOutlined style={{paddingRight: "5px"}} />Upload
                            </div>
                          </label>
                        </div>

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
            <Col span={12}>
              <Card className="cardGroup">
                <div className="wrapperText">Image</div>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item >
                      {CustomButtonFile}
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={12}>
              <Card className="cardGroup">
                <div className="wrapperText">Transcript</div>
                  <Form.Item name="transcript" value={[form.getFieldValue('transcript') ? form.getFieldValue('transcript') : []]}>
                    <TextArea rows={5} />
                  </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </>
    );
  }, [contextHolder, form, loadingSpin, antIcon, audio, CustomButtonFile, handleFileChange]);

  const renderQuestion = useMemo(() => {
    return (
      <>
        {contextHolder}
        <Form
          id="myForm"
          form={form}
          labelAlign={"left"}
          wrapperCol={{ span: 18 }}
        >
          <Row gutter={24}>
            <Form.List name="questionDetails">
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
                            label={`Question`}
                            name={[name, 'contentQuestion']}
                          >
                            <Input />
                          </Form.Item>

                          <Row gutter={24} style={{marginLeft: 0}}>
                            <Form.List name={[key.name, 'answers']}>
                              {(subFields, subOpt) => (
                                <>
                                {subFields.map((subField) => (
                                  <Row gutter={24} key={subField.key} style={{marginLeft: 0}}>
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
                </>
              )}
            </Form.List>

          </Row>
        </Form>
      </>
    );
  }, [contextHolder, form]);

  const items = [
    { label: <>Information</>, key: '1', children: renderForm },
    { label: <>Question</>, key: '2', children: renderQuestion }
  ];



  return (
    <div>
      {handleBack}
      {/* <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group> */}
      <TabCustomize 
        items={items}
        tabPosition={tabPosition}
      />
      {/* {loading ? <Loading /> : renderForm} */}
    </div>
  );
};

DetailQuestion.propTypes = {};

export default DetailQuestion;
