import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  message
} from "antd";
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { createData } from "../../../api/service/api";
import { handleUpload } from "../../../utils/utils";
import Loading from "../../shared/Loading/Loading";
import { LoadingOutlined } from '@ant-design/icons';
export const arrLevel = [
  { value: "easy", label: "easy" },
  { value: "medium", label: "medium" },
  { value: "hard", label: "hard" }
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
  const [messageApi, contextHolder] = message.useMessage();
  const audioPlayerRef = useRef(null);
  const [images, setImages] = useState([])
  const [loadingSpin, setLoadingSpin] = useState(false)
  const [loadingSpinImg, setLoadingSpinImg] = useState(false)
  const [audio, setAudio] = useState("")
  const location = useLocation();
  const currentUri = location.search;
  const parts = currentUri.split("?code=");
  const [code, setCode] = useState(parts[1] === undefined ? "" : parts[1]);
  const URIPath = `http://localhost:3000${location.pathname}`;
  const objectTypeId = useSelector(state => state.practiceReducer.objectTypeId);
  const [form] = Form.useForm();

  const handleCancel = useCallback(() => {
    onClose();
    setAudio("")
    setImages([])
    form.resetFields();
  }, [form, onClose]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );


  const handleCreate = (values) => {
    const formValues = form.getFieldsValue();
    const questionsArray = formValues.questions !== undefined && formValues.questions.map((question) => {
      const { textQuestion, answerA, answerB, answerC, answerD, correctAnswer } = question;
      return { textQuestion, answerA, answerB, answerC, answerD, correctAnswer };
    });

    const formControl = {
      type: 'practice',
      objectTypeId: objectTypeId,
      level: values.level,
      audioQuestion: audio,
      imageUrls: images,
      questions: questionsArray,
    };
    setIsLoading(true)
    createData(`questions/create`, formControl).then((res) => {
      if (res.data) {
        message.success("CREATE SUCCESSFULLY");
        setIsLoading(false)
        reloadData()
        handleCancel()
        setCode("")
      }
    })
      .catch(() => {
        message.error("Error");
      });

  }

  const onFinish = (values) => {
    handleCreate(values);
  }


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
      setCode("")
      setLoadingSpinImg(false)
    } else if (type === "audio") {
      setAudio(image[0])
      setCode("")
      setLoadingSpin(false)
    }

  };



  const renderForm = useMemo(() => {
    return (
      <>
        {contextHolder}
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
                      <div style={{ display: "block", marginBottom: "15px" }}>
                        <input type="file" onChange={(e) => handleFileChange(e, "audio")} />
                        {loadingSpin ?
                          <Spin indicator={antIcon} />
                          :
                          <div style={{ display: "block", marginTop: "15px" }}>
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
                <div className="wrapperText">Level Test</div>
                <Row gutter={24}>
                  <Col span={18}>
                    <Form.Item
                      name="level"
                      label="Level of Question"
                      valuePropName="level"
                      rules={[
                        {
                          required: true,
                          message: 'Please input this field!',
                        },
                      ]}
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
                    <Form.Item
                      name="images"
                      label="Image"
                      valuePropName="images"
                    >
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


                          <div style={{ marginTop: "15px" }}>
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
      </>
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