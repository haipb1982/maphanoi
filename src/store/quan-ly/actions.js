import { getData, postData } from "../../apiservice/Service";

const testMutations = (context, payload) => {
  context.commit("getdata", payload);
};

const ShowMenuBar = (context) => {
  context.commit("SET_SHOW_MENU_BAR");
};

const LoginActions = async (context, payload) => {
  try {
    let data = await postData("infor/login", payload);
    if (data) {
      context.commit("SET_LOGIN");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDaTaTP = async () => {
  return await getData("province");
};

export default {
  testMutations,
  ShowMenuBar,
  LoginActions,
  getDaTaTP,
};
