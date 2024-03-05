import { Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
const Test = () => {
  const [image, setImage] = useState([])
  const upload = (e) => {
    const files = e.target.files
    let newImages = []
    for (let i = 0; i < files.length; i++) {
      const fromData = new FormData()
      fromData.append("file", files[i])
      fromData.append("upload_preset", "kozqobqt")
      axios.post(`https://api.cloudinary.com/v1_1/dax8xvyhi/upload`, fromData)
        .then((res) => {
          newImages.push(res.data.url);
          if (i === files.length - 1) {
            setImage(newImages);
          }
        }).catch((error) => {
          console.log(error);
        })
    }
  }
  return (
    <div>
      <Input type="file" style={{ display: "block" }} onChange={(e) => upload(e)} multiple />
    </div>
  );
};

Test.propTypes = {};

export default Test;
