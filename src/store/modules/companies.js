export default {
    namespaced: true,

    state: {
        status: '',
        companies: {},
        all_companies: '',
        error: ''
    },

    getters: {
        getCompanies: state => state.companies,

        all_companies: state => state.all_companies,

        company_status: state => state.status,

        company_error: state => state.error
    },

    mutations: {
        loading: state => state.status = 'loading',

        success: (state, data) => {
            state.status = 'success';
            state.companies = data;
        },

        setAllCompanies: (state, data) => {
            state.all_companies = data;
        },

        failed: state => {
            state.status = 'failed';
            state.companies = [];
        },


    },

    actions: {
        getCompanies(state, page) {
            state.commit('loading');
            this._vm.$http.get(api.companies_URL + "?page=" + page)
                .then(response => {
                    state.commit('success', response.data);
                })
                .catch(error => {
                    state.commit('failed');
                });
        },

        getAllCompanies(state) {
            state.commit('loading');
            this._vm.$http.get(api.all_companies_URL)
                .then(response => {
                    state.commit('setAllCompanies', response.data);
                })
                .catch(error => {
                    state.commit('failed');
                })
        },

        addCompany(state, data) {
            state.commit('loading');
            this._vm.$http.post(api.companies_URL, data)
                .then(response => {
                    state.dispatch('getCompanies');
                })
                .catch(error => {
                    state.commit('failed');
                });
        },

        updateCompany(state, data) {
            state.commit('loading');
            this._vm.$http.put(api.companies_URL + data.id, data)
                .then(response => {
                    state.dispatch('getCompanies');
                })
                .catch(error => {
                    state.commit('failed');
                });
        },

        deleteCompany(state, data) {
            state.commit('loading');
            this._vm.$http.delete(api.companies_URL + data.id, data)
                .then(response => {
                    state.dispatch('getCompanies');
                })
                .catch(error => {
                    state.commit('failed');
                });
        }
    }
}