import { GetterTree, MutationTree, ActionTree } from "vuex";
import { login } from "@/api/login";
import { LoginParam } from "@/types/views/login";
import { AppState } from "../../types/store/app";
import { COOKIE } from "@/utils/constant";
import cookie from "cookie_js";

const state: AppState = {
    asideCollapse: eval(sessionStorage.getItem("asideCollapse") || "false"),
    token: cookie.get(COOKIE.token),
    username: cookie.get(COOKIE.username)
  },
  getters: GetterTree<AppState, unknown> = {
    asideCollapse: state => state.asideCollapse
  },
  mutations: MutationTree<AppState> = {
    TOGGLE_ASIDE: state => {
      state.asideCollapse = !state.asideCollapse;
      sessionStorage.setItem("asideCollapse", state.asideCollapse.toString());
    },
    SET_TOKEN: (state, value) => {
      state.token = value;
      cookie.set(COOKIE.token, value);
    },
    SET_USER: (state, value) => {
      state.username = value;
      cookie.set(COOKIE.username, value);
    },
    LOGIN_OFF: state => {
      state.token = "";
      state.username = "";
      cookie.remove(COOKIE.username, COOKIE.token);
    }
  },
  actions: ActionTree<AppState, unknown> = {
    login({ commit }, { email, password, authCode }: LoginParam) {
      return new Promise((resolve, reject) => {
        login(email, password, authCode)
          .then(response => {
            commit("SET_TOKEN", response.data.data.token);
            commit("SET_USER", response.data.data.username);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  };

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
