import {login, auth, logout} from '@/api/user'
import Storage from "@/utils/localStorage"

const state = {
    info: Storage.get("info") || {}
};
const mutations = {
    SET_INFO(state, value) {
        state["info"] = value;
    }
};
const actions = {
    reset({commit}) {
        Storage.clear()
        commit("SET_INFO", {})
    },
    async login({commit}, data) {
        try {
            const res = await login(data)
            if (res.data) {
                commit("SET_INFO", res.data)
                Storage.set("info", res.data)
            }
            return res
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async auth({commit, dispatch}) {
        try {
            const res = await auth()
            if (res.data) {
                commit("SET_INFO", res.data)
                Storage.set("info", res.data)
            } else throw  res
            return Promise.resolve(res)
        } catch (e) {
            dispatch("reset")
            return Promise.reject(e)
        }
    },
    async logout({dispatch}) {
        try {
            await logout()
            dispatch("reset")
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e)
        }
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
