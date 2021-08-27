const getdata = () => {
  return "ádassd";
};

const SET_SHOW_MENU_BAR = (state) => {
  if (state.showMenuBar) state.showMenuBar = false;
  else state.showMenuBar = true;
};

const SET_LOGIN = (state) => {
    state.infor= 'TOKEN';
  };

export default {
  getdata,
  SET_SHOW_MENU_BAR,
  SET_LOGIN
};
