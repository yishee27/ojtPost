import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken : null,
        UserName : null,
        UserId : null,
        UserObjectId : null,
        Company : null

    },
    getter : {

    },
    mutations : {
        LOGIN(state,accessToken){
            state.accessToken = accessToken
            localStorage.accessToken = accessToken
            
            const enhanceAccessToeken = () => {
                const {accessToken} = localStorage
                if (!accessToken) return
                Axios.defaults.headers.common['Authorization'] = `${accessToken}`;
              }
            enhanceAccessToeken()
        },

        LOGOUT(state) {
            state.accessToken = null
            delete localStorage.accessToken
        },

        UserName(state, UserName) {
            state.UserName = UserName;
        },

        UserId(state, UserId) {
            state.UserId = UserId;
        },

        UserObjectId(state, UserObjectId) {
            state.UserObjectId = UserObjectId;
        },

        Company(state, Company) {
            state.Company = Company;
        }

    },

    actions: {
        LOGIN ({commit},token) {
            commit('LOGIN',token);
            Axios.defaults.headers.common['Authorization'] = `${token}`;
        },
        LOGOUT ({commit}){
            Axios.defaults.headers.common['Authorization'] = undefined
            commit('LOGOUT');
        },
        UserName ({commit},UserName) {
            commit('UserName', UserName);
        },
        UserId ({commit},UserId) {
            commit('UserId', UserId);
        },
        UserObjectId ({commit},UserObjectId) {
            commit('UserObjectId', UserObjectId);
        },
        Company ({commit},Company) {
            commit('Company', Company);
        }

    }

    
});