import { postData, getData, updateData,deleteData } from "../../apiservice/Service";

const PostCustomer = async (context, payload) => {
  return await postData("ds_nhanvien", payload);
};

const UpdateCustomer = async (context, payload) => {
  return await updateData("ds_nhanvien", payload);
};

const getDataCustomer = async () => {
  return await getData("ds_nhanvien");
};

const deleteCustomerById = async (context, payload) => {
  return await deleteData(payload);
};


const getDaTaQH = async(context, payload) => {
  return await getData(payload);
};


export default {
  PostCustomer,
  getDataCustomer,
  UpdateCustomer,
  deleteCustomerById,
  getDaTaQH
};
