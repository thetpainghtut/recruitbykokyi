export default {
    namespaced: true,

    state: {
        status: '',
        companies: {},
        all_companies: '',
        company_jobs: [],
        error: ''
    },

    getters: {
        getCompanies: state => state.companies,

        all_companies: state => state.all_companies,

        company_jobs: state => state.company_jobs,

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

        setCompanyJobs: (state, data) => {
            state.company_jobs = data;
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

        getJobsByCompany(state, company_id){
            this._vm.$http.get(api.company_jobs_URL(company_id))
            .then(response => {
                state.commit('setCompanyJobs', response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },

        addJobByCompany(state, data) {
            let company_id = data.company_id;
            this._vm.$http.post(api.company_jobs_URL(company_id), data)
                .then(response => {
                    dispatch('jobs/getAllJobs', {root: true});
                })
                .catch(error => {
                    state.commit('failed');
                })
        },


        updateJobByCompany(state, data){
            let company_id = data.company_id;
            let job_id = data.job_id;
            return this._vm.$http.put(api.company_jobs_URL(company_id) + '/' + job_id, data)
            .then(response => {
                return true;
            })
            .catch(error => {
                return false;
            })
        },

        removeJobByCompany(state, data){
            let company_id = data.company_id;
            let job_id = data.job_id;

            return this._vm.$http.delete(api.company_jobs_URL(company_id) + '/' + job_id, data)
            .then(response => {
                return true;
            })
            .catch(error => {
                return false;
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