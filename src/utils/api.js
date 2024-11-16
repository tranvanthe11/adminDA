import axios from "axios";
// require('dotenv/config');

export const fetchDataFromApi=async(url)=>{
    try{
        const {data} = await axios.get("http://localhost:4000"+url)
        return data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const postDataUser = async (url, formData) => {
    try {
        const response = await fetch("http://localhost:4000"+url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            const errorData = await response.json();
            return errorData; // Trả về dữ liệu lỗi từ server
        }

        // Trả về dữ liệu nếu thành công
        const data = await response.json();
        return data;
    } catch (error){
        console.log(error);
        return error;
    }
}
export const postData = async (url, formData) => {
    const {res} = await axios.post("http://localhost:4000"+url, formData)
    return res;
}

export const editData = async (url, updatedData) => {
    const {res} = await axios.put(`http://localhost:4000${url}`, updatedData)
    return res;
}

export const deleteData = async (url) => {
    const {res} = await axios.delete(`http://localhost:4000${url}`)
    return res;
}