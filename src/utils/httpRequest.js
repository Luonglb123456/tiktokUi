import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
console.log(process.env);

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
    //mục đích là custom lại axios, ko phải dùng response.data.data 2 lần
    //return response.data để ngắn gọn hơn
};
export default httpRequest;

//async trả về 1 promise

//Môi trường
//1. Local / Developments
//2. Test / Staging => Kiểm tra
//3. UAT => môi trường dùng thử như production
//Production
