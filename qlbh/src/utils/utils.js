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


export const handleUpload = async (selectedFiles, code, URIPath) => {
    if (selectedFiles.length > 0) {
        let data
        const formData = new FormData();
        Object.keys(selectedFiles).forEach((key) => {
            formData.append('files', selectedFiles[key]); // Đổi tên thành 'image1'
        });

        await upload(`upload/uploadFile?code=${code}&uriPath=${URIPath}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            data = response.data.data
        }).catch((error) => {
            data = error.response.data.message
        })
        return data
    }
};