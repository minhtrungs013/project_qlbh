import axios from 'axios';
import { upload } from '../api/service/uploadService'


/**
 * Get the current date as a timestamp.
 *
 * @returns {number} The current date as a timestamp.
 */
export const CURRENT_DATE = () => {
    const today = new Date()
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return new Date(`${year}-${month}-${day}`).getTime();
}


export const handleUpload = async (files) => {
    if (files.length > 0) {
        let newImages = []
        for (let i = 0; i < files.length; i++) {
          const fromData = new FormData()
          fromData.append("file", files[i])
          fromData.append("upload_preset", "kozqobqt")
         await axios.post(`https://api.cloudinary.com/v1_1/dax8xvyhi/upload`, fromData)
            .then((res) => {
              newImages.push(res.data.url);
            }).catch((error) => {
              console.log(error);
            })
        }
        return newImages
    }
};