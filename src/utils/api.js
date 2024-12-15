import axios from "axios";
// require('dotenv/config');

export const fetchDataFromApi=async(url)=>{
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}`+url)
        return data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const postDataUser = async (url, formData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}`+url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            const errorData = await response.json();
            return errorData; 
        }

        const data = await response.json();
        return data;
    } catch (error){
        console.log(error);
        return error;
    }
}
export const postData = async (url, formData) => {
    const {res} = await axios.post(`${process.env.REACT_APP_BASE_URL}`+url, formData)
    return res;
}

export const postDataImg = async (url, formData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}` + url, formData);
        
        return response.data; 
    } catch (error) {
        console.error("Error posting data", error);
        throw error; 
    }
}

export const editData = async (url, updatedData) => {
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`, updatedData);
    return response.data; 
};

export const deleteData = async (url) => {
    const {res} = await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`)
    return res;
}