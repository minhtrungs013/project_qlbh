import { upload } from '../api/service/upload'

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