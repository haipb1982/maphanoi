import axios from "axios";
// let BaseUrl = "http://localhost:3002/";
let BaseUrl = "http://45.76.188.82/api/";
axios.defaults.withCredentials = true;
let headers = {
  "Content-Type": "application/jsom",
};

const getData = async (url, params) => {
  try {
    let res = await axios.get(`${BaseUrl}${url}`, {
      params,
      headers,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (url, params) => {
  try {
    let res = await axios.post(`${BaseUrl}${url}`, params);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (url, params) => {
  try {
    let res = await axios.put(`${BaseUrl}${url}`, params);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (url) => {
  try {
    let res = await axios.delete(`${BaseUrl}${url}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getData, postData, updateData, deleteData };
