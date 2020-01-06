
export default {
    namespaced: true,

    state: {
        status: '',
        companies: [],
    },

    getters: {
        getCompanies: state => state.companies,

        company_status: state =>state.status
    },

    mutations: {
        loading: state => state.status = 'loading',
        success: (state, data) => {
            state.status = 'success';
            state.companies = data;
        },
        failed: state => {
            state.status = 'failed';
            state.companies = [];
        }
    },

    actions: {
        getCompanies(state, page){
            return new Promise((resolve, reject) => {
                state.commit('loading');
                this._vm.$http.get(api.companies_URL + "?page=" + page)
                .then(response => {
                    state.commit('success', response.data);
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed');
                    reject(error);
                });
            });
        },

        getAllCompanies(state){
            return new Promise((resolve, reject) => {
                state.commit('loading');
                this._vm.$http.get(api.all_companies_URL)
                .then(response => {
                    state.commit('success', response.data);
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed');
                    reject(error);
                })
            });
        },

        addCompany(state, data){
            return new Promise((resolve, reject) => {
                state.commit('loading');
                this._vm.$http.post(api.companies_URL, data)
                .then(response => {
                    state.dispatch('getCompanies');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed');
                    reject(error);
                });
            });
        },

        updateCompany(state, data){
            return new Promise((resolve, reject) => {
                state.commit('loading');
                this._vm.$http.put(api.companies_URL + data.id, data)
                .then(response => {
                    state.dispatch('getCompanies');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed');
                    reject(error);
                });
            });
        },

        deleteCompany(state, data){
            return new Promise((resolve, reject) => {
                state.commit('loading');
                this._vm.$http.delete(api.companies_URL + data.id, data)
                .then(response => {
                    state.dispatch('getCompanies');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed');
                    reject(error);
                });
            });
        }
    }
}