import { getData } from "../../apiservice/Service";

const getInforUser = async (context) => {
  let data = await getData("infor/user");
  context.commit("SET_USER_INFOR", data);
};

export default {
  getInforUser,
};
