import router from "../../router";
import request from "../../utils/request";

// store的state部分
const state = {
  step: {
    payAccount: 1234567,
    receiverAccount: {
      type: "alipay",
      number: ""
    }
  }
};

const actions = {
  async submitStepFrom({ commit }, { payLoad }) {
    await request({
      url: "/api/form",
      method: "POST",
      data: payLoad
    }).then(response => {
      const data = response.data;
      console.log(111123, data.message);
      commit("saveStepFormData", { payLoad: { message: data.message } });
    });
    commit("saveStepFormData", { payLoad });
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStepFormData(state, { payLoad }) {
    console.log("commit--", payLoad);
    state.step = {
      ...state.step,
      ...payLoad
    };
  },
  log(state, { payLoad }) {
    console.log(state, payLoad);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
