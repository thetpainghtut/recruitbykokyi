import axios from 'axios'

export default {
    namespaced: true,

    state: {
        status: '',
        token: localStorage.getItem('access_token') || '',
        user: {}
    },

    mutations: {
        auth_request(state) {
            state.status = 'loading';
        },

        auth_success(state, token) {
            state.status = 'success';
            state.token = token;
        },

        auth_error(state, error) {
            state.status = error;
        },

        setUserInfo(state, user) {
            state.user = user;
        },

        logout(state) {
            state.status = '';
            state.token = '';
        }
    },

    actions: {
        login({ commit, dispatch }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                let data = {
                    client_id: 2,
                    client_secret: process.env.VUE_APP_SECRET,
                    grant_type: 'password',
                    email: user.username,
                    password: user.password
                };
                axios.post('/admin/login', data)
                    .then(response => {
                        if (response.data.token_type == 'error') {
                            commit('auth_error', response.data.message);
                        } else {
                            const token = response.data.access_token;
                            localStorage.setItem('access_token', token);

                            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                            commit('auth_success', token);
                            dispatch('getUser');
                            resolve(response);
                        }
                    })
                    .catch(err => {
                        commit('auth_error');
                        localStorage.removeItem('access_token');
                        reject(err);
                    });
            });
        },

        getUser(state){
            return new Promise((resolve, reject) => {
                axios.get('/user')
                .then(response => {
                    state.commit('setUserInfo', response.data.data);
                    resolve(response);
                })
                .catch(response => {
                    reject(response);
                })
            });
        },

        logout({ commit }) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('access_token');
                delete axios.defaults.headers.common['Authorization'];
                resolve();
            });
        }

    },

    getters: {
        isLoggedIn: state => !!state.token,

        authStatus: state => state.status,

        getUser: state => state.user
    }
}