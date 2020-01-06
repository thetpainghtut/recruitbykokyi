export default {
    namespaced: true,

    state: {
        status: '',
        jobs: [],
        company_jobs: []
    },

    getters: {
        getJobs: state => state.jobs,

        getCompanyJobs: state => state.company_jobs,

        job_status: state => state.status
    },

    mutations: {
        job_request: state => state.status = 'loading',

        success_request: (state, data) => {
            state.status = 'success';
            state.jobs = data;
        },

        company_jobs: (state, data) => {
            state.status = 'success';
            state.company_jobs = data;
        },

        failed_request: state => state.status = 'Failed to load data. Something is wrong!',
    },

    actions: {
        getJobs(state, page = 1){
            return new Promise((resolve, reject) => {
                state.commit('job_request');
                this._vm.$http.get(api.jobs_URL + '?page=' + page)
                .then(response => {
                    state.commit('success_request', response.data);
                    resolve();
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                });
            });
        },

        getAllJobs(state){
            return new Promise((resolve, reject) => {
                state.commit('job_request');
                this._vm.$http.get(api.all_jobs_URL)
                .then(response => {
                    state.commit('success_request', response.data);
                    resolve();
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                });
            });
        },

        getJobsByCompany(state, company_id){
            if (!company_id) {
                return;
            }
            return new Promise((resolve, reject) => {
                this._vm.$http.get(api.company_jobs_URL + '/' + company_id)
                .then(response => {
                    state.commit('company_jobs', response.data);
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                });
            });
        },

        addJob(state, data){
            return new Promise((resolve, reject) =>{
                state.commit('job_request');
                this._vm.$http.post(api.jobs_URL, data)
                .then(response => {
                    state.dispatch('getJobs');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                })
            })
        },

        updateJob(state, data){
            return new Promise((resolve, reject) => {
                state.commit('job_request');
                this._vm.$http.put(api.jobs_URL + data.id, data)
                .then(response => {
                    state.dispatch('getJobs');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                });
            });
        },

        deleteJob(state, data){
            return new Promise((resolve, reject) => {
                state.commit('job_request');
                this._vm.$http.delete(api.jobs_URL + data.id, data)
                .then(response => {
                    state.dispatch('getJobs');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                });
            });
        }
    }
}